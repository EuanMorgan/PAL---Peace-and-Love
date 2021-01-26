package RoadHeater;

import Sql.ConnectionPoolContext;
import Util.Util;
import com.alibaba.fastjson.JSONReader;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;
import java.util.Vector;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Transfer the road data in DB into front-end friendly structure.
 * And add visualised information such as color into the roads.
 *
 * @author liz
 */
public class GeoJsonParser {
    static ConnectionPoolContext pool;
    Vector<Feature> features = new Vector<Feature>();
    private static double maxWeight = -1;//TODO dangerous beh

    private static double getMaxWeight() {
        if (maxWeight > 0) return maxWeight;
        try (Connection conn = pool.getConnection()) {
            ResultSet ts = conn.prepareStatement("select max(dangerous_level) from planet_osm_ways")
                    .executeQuery();
            ts.next();
            maxWeight = ts.getDouble("max");
            System.out.println("This message should only appear once");
            return maxWeight;
        } catch (SQLException e) {
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * Load all ways in geojson data in a particular area into Feature objects
     */
    //TODO should load a certain amount of roads based on the free memory of server
    public void loadWays() {
        //read json file and claim the begin of the json object
        JSONReader reader = Util.readJson("D:\\CU\\CM Group Project\\Code\\NightSafe-Router\\resource\\map.geojson");
        reader.startObject();

        //filter all features and select all roads into features[]
        String tag = null;
        do {
            tag = reader.readString();
            System.out.println(tag);
        } while (!tag.equals("features"));

        reader.startArray();
        while (reader.hasNext()) {
            //TODO this is not a good filter to drop the railway, analyze DS and rewrite it
            Feature item = reader.readObject(Feature.class);
            System.out.println(item.getID());
            if (item.getID().contains("way") && item.getGeoMetry().getType().contains("String")) {
                features.add(item);
            }
        }
        reader.endArray();

        //close object
        reader.endObject();
        //reader.close(); //TODO Bug that come from nowhere: not close json text, token : }
    }

    /**
     * Assign colour to all roads based on the crime data generated earlier,
     * it calls the computeColor() method to calculate the color
     */
    //TODO decouple the road filter from this class
    public void assignColor() {
        double weight;
        //Use iterator rather than the syntactic sugar since unqualified road will be removed from the list
        Iterator<Feature> iterator = features.iterator();
        Set<Long> roads = new HashSet<Long>();

        //TODO redundancy caused by modification in the database now useless to check whether it is a road? but still there is false case e.g. railway
        //TO further eliminate non-road elements from the array, firstly load the whole road safety database
        pool = new ConnectionPoolContext();
        ResultSet r = null;
        try (Connection conn = pool.getConnection()) {
            r = conn.prepareStatement("select \"id\" from \"road_safety\" ")
                    .executeQuery();
            while (r.next()) {
                roads.add(r.getLong("ID"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return;
        }

        //Compare the road safety database we generated and all roads
        while (iterator.hasNext()) {
            Feature road = iterator.next();
            long id = extractNumberID(road.getID());
            ResultSet rs = null;
            try (Connection connection = pool.getConnection()) {
                rs = connection.prepareStatement("select \"dangerous_level\" \n" +
                        "from \"road_safety\"\n" +
                        "where \"id\"=" + id).executeQuery();

                rs.next();
                if (!roads.contains(id)) {
                    iterator.remove();
                    continue;
                }
                weight = rs.getDouble("dangerous_level");

                //If the road has a crime weight, pass it to a method to calculate the colour on the map
                road.getProperties().setColor(calculateColor(weight, getMaxWeight()));
                rs.close();
            } catch (SQLException e) {
                e.printStackTrace();
                return;
            }
        }
    }


    /**
     * the geojson's ID is in "way/numID" format.
     * use regex to extract the number, so it is in accordance with the type in current safety database.
     *
     * @param ID ID in the geojson data
     * @return ID in plain number
     */
    private long extractNumberID(final String ID) {
        String regEx = "[^0-9]";
        Pattern p = Pattern.compile(regEx);
        Matcher m = p.matcher(ID);
        String ex = m.replaceAll("").trim();
        return Long.parseLong(ex);
    }

    /**
     * Calculate the colour with linear projection.
     * In this method, The colour is changed in gradient way from green to red, based on how danger the road is.
     * see https://stackoverflow.com/questions/24498620/compute-colors-along-gradient
     * & https://stackoverflow.com/questions/3607858/convert-a-rgb-color-value-to-a-hexadecimal-string
     */
    //TODO this linear method to project colour is not suit with distribution
    private String calculateColor(double val, double max) {
        int[] start = {0, 255, 0};        //GREEN
        int[] end = {255, 0, 0};          //RED
        double i = val / max;             //the percent from start to end
        int red = (int) (i * end[0] + (1.0 - i) * start[0]);
        int green = (int) (i * end[1] + (1.0 - i) * start[1]);
        int blue = (int) (i * end[2] + (1.0 - i) * start[2]);
        return String.format("#%02x%02x%02x", red, green, blue);
    }

    public void writeWays(WriteWays writeMethod) {
        writeMethod.write(features);
    }

}
