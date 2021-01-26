package Util;

import Entity.Node;
import Entity.Road;
import com.alibaba.fastjson.JSONReader;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Map;
import java.util.Vector;

public class Util {

    /**
     * Convey the double number stored in INT format in osm_road database
     *
     * @param integer integer to convent
     * @return actual value
     */
    public static double intToDouble(int integer) {
        return (double) integer / 10000000;
    }

    public static void writeCSV(Map<Long, Node> nodes) {
        BufferedWriter writer = null;
        try {
            writer = Files.newBufferedWriter(Paths.get("./heatmap2.csv"));
        } catch (IOException e) {
            e.printStackTrace();
        }
        CSVPrinter csvPrinter = null;
        try {
            csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT.withHeader("lat", "long", "weight"));
            for (Node node : nodes.values()) {
                csvPrinter.printRecord(node.getLatitude(), node.getLongitude(), node.getCrimeDensity());
            }
            csvPrinter.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void writeRoadCSV(Vector<Road> roads) {
        BufferedWriter writer = null;
        try {
            writer = Files.newBufferedWriter(Paths.get("./roadmap2.csv"));
        } catch (IOException e) {
            e.printStackTrace();
        }
        CSVPrinter csvPrinter = null;
        try {
            csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT.withHeader("id", "weight"));
            for (Road road : roads) {
                csvPrinter.printRecord(road.getID(), road.getCrimeDensity());
            }
            csvPrinter.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static JSONReader readJson(String filePath) {
        FileReader fr = null;
        File file = new File(filePath);
        try {
            fr = new FileReader(file);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            return null;
        }

        JSONReader reader = new JSONReader(fr);
        return reader;
    }
}
