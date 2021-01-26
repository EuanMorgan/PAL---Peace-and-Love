package RoadHeater;

import java.util.Vector;


/**
 * A class for treating Geojson data which is generated with osmtogeojson.
 * The way that properties are stored in this class is to match Geojson format.
 * So the parser can directly generate geojson type of json file with one line of code.
 *
 * @author liz
 */
public class Feature {
    private Properties properties = new Properties();
    private Geometry geometry = new Geometry();
    private String type = "line";
    private String ID;

    public String getID() {
        return ID;
    }

    public void setID(String ID) {
        this.ID = ID;
    }

    public Properties getProperties() {
        return properties;
    }

    public void setProperties(Properties properties) {
        this.properties = properties;
    }

    public Geometry getGeoMetry() {
        return geometry;
    }

    public void setGeoMetry(Geometry geoMetry) {
        this.geometry = geoMetry;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    class Properties {
        private String color;

        public String getColor() {
            return color;
        }

        public void setColor(String color) {
            this.color = color;
        }
    }

    class Geometry {
        private String type;
        private Vector<String> coordinates;

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }

        public Vector<String> getCoordinates() {
            return coordinates;
        }

        public void setCoordinates(Vector<String> coordinates) {
            this.coordinates = coordinates;
        }

    }
}
