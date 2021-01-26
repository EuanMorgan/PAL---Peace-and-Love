package PointHeater;

import Entity.Crime;
import Entity.Node;
import Util.MathUtil;

/**
 * The Gaussian Kernel Density Estimation.
 *
 * @author liz
 */
//TODO encapsulate the detail and provide only one entrance
public class GKDE {

    static final double BANDWIDTH = 0.08;//TODO should be calculated

    /**
     * Calculate the accumulation part of guassian's kernel density estimation
     *
     * @param crime crime event
     * @param node  node
     */
    public static void gaussianKDEAccumulate(Crime crime, Node node) {
        double euc = MathUtil.euclideanDistance(crime.getLatitude(), crime.getLongitude(), node.getLatitude(), node.getLongitude(), "K");
        double bracket = -Math.pow(euc, 2) / 2 / Math.pow(BANDWIDTH, 2);
        double sum = 1 / Math.sqrt(2 * Math.PI) * Math.exp(bracket);
        node.addCrimeDensity(sum);
    }

    public static void gaussianKDEResult(Node node, double count) {
        node.setCrimeDensity(1 / count / Math.pow(BANDWIDTH, 2) * node.getCrimeDensity());
    }
}
