package PointHeater;

import Entity.Crime;
import Entity.Node;
import RoadHeater.Feature;

import java.util.List;
import java.util.Vector;
import java.util.concurrent.CountDownLatch;
import java.util.stream.Collectors;

/**
 * A fork-join type of thread that calculate crime level.
 *
 * @author liz
 */
public class SpatialDensityCalculationThread extends Feature implements Runnable {
    private final Vector<Crime> crimes;
    private final int start;
    private final int end;
    private Vector<Node> nodes;
    private CountDownLatch latch;

    SpatialDensityCalculationThread(final Vector<Crime> crimes, Vector<Node> nodes, final int start, final int end, CountDownLatch latch) {
        this.crimes = crimes;
        this.nodes = nodes;
        this.start = start;
        this.end = end;
        this.latch = latch;
        System.out.println("Calculation starts:" + start + "-" + end);
    }

    @Override
    public void run() {
        //For all nodes that this thread is allocated
        for (int i = start; i < end; i++) {
            Node node = nodes.get(i);
            //Filter out nearby crime
            List<Crime> relatedCrimes = crimes.parallelStream()
                    .filter((crime) -> Math.abs(crime.getLongitude() - node.getLongitude()) < 0.04) //1.72 miles in coordinate representation
                    .filter((crime -> Math.abs(crime.getLatitude() - node.getLatitude()) < 0.04))
                    .collect(Collectors.toList());
            for (Crime crime : relatedCrimes) {
                GKDE.gaussianKDEAccumulate(crime, node);
            }
            GKDE.gaussianKDEResult(node, 10);
        }
        //release the latch
        latch.countDown();
    }
}
