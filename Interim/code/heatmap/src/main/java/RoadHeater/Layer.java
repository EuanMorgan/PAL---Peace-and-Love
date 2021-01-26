package RoadHeater;

import java.util.Vector;

@Deprecated
public class Layer {
    private String id;
    private String type = "line";
    private Source source;

    class Source {
        private String type = "geojson";
    }

    class data {
        private String type = "Feature";
        private Properties properties;
        private Geometry geometry;
    }

    class Geometry {
        private String type = "LineString";
        private Vector<String> coordinates;

    }

    class Properties {
        private String colour;
    }
}
