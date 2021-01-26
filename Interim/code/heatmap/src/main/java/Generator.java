import PointHeater.Data;
import RoadHeater.GeoJsonParser;
import RoadHeater.WriteWaysToJSX;

public class Generator {

    public static void main(String[] args) {
        generateMap();
    }

    public static void assignCrime() {
        Data data = new Data();
        data.generateDataSet();
    }

    public static void generateMap() {
        GeoJsonParser g = new GeoJsonParser();
        g.loadWays();
        g.assignColor();
        g.writeWays(new WriteWaysToJSX());
    }

}



