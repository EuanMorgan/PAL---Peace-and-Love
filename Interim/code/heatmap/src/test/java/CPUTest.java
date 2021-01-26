import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * A test aiming at how to utilise the CPU entirely.
 */
public class CPUTest {

    public static void main(String[] args) {
        ExecutorService executorService = Executors.newFixedThreadPool(24);

        for (int i = 0; i < 24; i++) {
            executorService.submit(() -> {
                while (true) {

                }
            });
        }
    }
}
