package RoadHeater;

import com.alibaba.fastjson.JSONWriter;

import java.io.FileWriter;
import java.io.IOException;
import java.util.Vector;

/**
 * Write the ways that has been assigned the colour to the json file.
 *
 * @author liz
 */
public class WriteWaysToJSON implements WriteWays {
    @Override
    public void write(Vector<Feature> features) {
        System.out.println("#Feature: " + features.size());
        JSONWriter writer = null;
        try {
            writer = new JSONWriter(new FileWriter("RoadsToDisplay.json"));
        } catch (IOException e) {
            e.printStackTrace();
        }
        writer.startArray();

        for (int i = 0; i < features.size(); ++i) {
            writer.writeValue(features.get(i));
        }
        writer.endArray();
        try {
            writer.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
