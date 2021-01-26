package Entity;

/**
 * A crime incident.
 *
 * @author liz
 */
public class Crime {
    private String id;
    private double longitude;
    private double latitude;

    public Crime(String id, double latitude, double longitude) {
        this.id = id;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public String getID() {
        return id;
    }

    public double getLongitude() {
        return longitude;
    }

    public double getLatitude() {
        return latitude;
    }

}
