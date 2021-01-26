package Entity;

import java.util.Vector;

/**
 * A road segment extract from ways in the OpenStreetMap database.
 *
 * @author robin
 */
public class Road {
    public Vector<Long> nodesID;
    private long ID;
    private double crimeDensity = 0;

    public Road(int ID, Vector<Long> nodes) {
        this.ID = ID;
        this.nodesID = nodes;
    }

    public long getID() {
        return ID;
    }

    public double getCrimeDensity() {
        return crimeDensity;
    }

    public void setCrimeDensity(double crimeDensity) {
        this.crimeDensity = crimeDensity;
    }

    public void addCrimeDensity(double crimeDensity) {
        this.crimeDensity += crimeDensity;
    }

}
