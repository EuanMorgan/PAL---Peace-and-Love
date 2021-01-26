package PointHeater;

import Entity.Crime;
import Entity.Node;
import Entity.Road;
import Sql.ConnectionPoolContext;
import Util.Util;

import java.sql.Array;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;
import java.util.concurrent.*;

/**
 * It assigns every road a crime level and related I/O.
 *
 * @author liz
 */
public class Data {
    private Vector<Crime> crimes = new Vector<Crime>();
    private Vector<Road> roads = new Vector<Road>();
    private Map<Long, Node> nodes = new HashMap<Long, Node>();
    //private PostgreSQLJDBC crimeDB = new PostgreSQLJDBC();
    //private PostgreSQLJDBC mapDB = new PostgreSQLJDBC();
    private ConnectionPoolContext database = new ConnectionPoolContext();

    public void generateDataSet() {

        //Read from database
        ExecutorService executor = Executors.newFixedThreadPool(2);
        Future<Integer> crimeR = executor.submit(() -> {
            readCrimes();
            return 1;
        });
        Future<Integer> nodeR = executor.submit(() -> {
            readNodes();
            return 1;
        });
        try {
            crimeR.get();
            nodeR.get();
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
        executor.shutdown();

        // Calculate nodes' crime level
        int threadNum = Runtime.getRuntime().availableProcessors() - 1;
        CountDownLatch latch = new CountDownLatch(threadNum);
        ExecutorService calculation = Executors.newFixedThreadPool(threadNum);
        crimes.sort(Comparator.comparing(Crime::getLongitude));
        Vector<Node> nodeList = new Vector<>(nodes.values());
        for (int i = 0; i < threadNum; i++) {
            int start = i * nodes.size() / threadNum;
            int end = (i + 1) * nodes.size() / threadNum;
            calculation.submit(new SpatialDensityCalculationThread(crimes, nodeList, start, end, latch));
        }

        try {
            latch.await();
            System.out.println("Finished");
        } catch (InterruptedException E) {
            // handle
        }

        Util.writeCSV(nodes);

        //Calculate road's crime level
        readRoads();
        for (Road road : roads) {
            roadSumUp(road);
        }
        roadNormalised();
        Util.writeRoadCSV(roads);
    }

    /**
     * Summing up the density of nodes on a road.
     *
     * @param road The road to calculate
     */
    //TODO it should belong to math class
    public void roadSumUp(Road road) {
        for (Long nodeID : road.nodesID) {
            Node node = nodes.get(nodeID);
            if (node != null) road.addCrimeDensity(node.getCrimeDensity());
        }
    }

    /**
     * Get the number of nodes in the database
     *
     * @return number of nodes
     */
    //TODO lazy-initialised
    public final int getRoadCount() {
        ResultSet count = null;
        try (Connection conn = database.getConnection()) {
            count = conn.prepareStatement("select count(*) as c from \"planet_osm_nodes\" ")
                    .executeQuery();
            count.next();
            return count.getInt("c");
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    /**
     * Normalised the road risk.
     */
    public void roadNormalised() {
        double totalRisk = 0;
        for (Road road : roads) {
            totalRisk += road.getCrimeDensity();
        }
        System.out.println("Total risk : " + totalRisk);
        for (Road road : roads) {
            road.setCrimeDensity(road.getCrimeDensity() / totalRisk);
        }
    }

    /**
     * Read roads from the database.
     */
    public void readRoads() {
        ResultSet roadData = null;
        try (Connection conn = database.getConnection()) {
            roadData = conn.prepareStatement("SELECT osm_id as iden, nodes\n" +
                    "FROM public.planet_osm_line as lines ,public.planet_osm_ways as ways\n" +
                    "where highway is not null\n" +
                    "\tand lines.osm_id = ways.id\n").executeQuery();

            while (roadData.next()) {
                int id = roadData.getInt("iden");
                Array nodes = roadData.getArray("nodes");
                Long[] ID = (Long[]) nodes.getArray();
                Vector<Long> vector = new Vector<Long>(Arrays.asList(ID));
                roads.add(new Road(id, vector));

            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

    }

    //TODO long-term - cope with large database, read a certain number of roads based on the memory left
    /**
     * Read all node data into array
     */
    public void readNodes() {
        Node node = null;
        ResultSet nodesData = null;
        try (Connection conn = database.getConnection()) {
            nodesData = conn.prepareStatement("select * from \"planet_osm_nodes\" ")
                    .executeQuery();

            while (nodesData.next()) {
                node = new Node(nodesData.getLong("id"),
                        Util.intToDouble(nodesData.getInt("lat")),
                        Util.intToDouble(nodesData.getInt("lon")));
                nodes.put(node.getID(), node);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    /**
     * Read all Crime data from database
     */
    public void readCrimes() {
        Crime crime = null;
        //Read all crime data into vector
        ResultSet crimeData = null;
        try (Connection conn = database.getConnection()) {

            crimeData = conn.prepareStatement("select *\n" +
                    "from \"crime\" as cr\n").executeQuery();

            while (crimeData.next()) {
                crime = new Crime(crimeData.getString("ID"),
                        crimeData.getDouble("Latitude"),
                        crimeData.getDouble("Longitude"));
                crimes.add(crime);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
