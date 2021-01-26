package Entity;

/**
 * A node extracted from OpenStreetMap, represents a turn/intersection.
 *
 * @author liz
 */
public class Node {
    private long id;
    private double longitude;
    private double latitude;
    private double crimeDensity = 0;

    public Node(long id, double latitude, double longitude) {
        this.id = id;
        this.latitude = latitude;
        this.longitude = longitude;
        this.crimeDensity = 0;
    }

    public long getID() {
        return id;
    }

    public double getLongitude() {
        return longitude;
    }

    public double getLatitude() {
        return latitude;
    }

    public void addCrimeDensity(double crimeDensity) {
        this.crimeDensity += crimeDensity;
    }

    public double getCrimeDensity() {
        return crimeDensity;
    }

    public void setCrimeDensity(double crimeDensity) {
        this.crimeDensity = crimeDensity;
    }
}
