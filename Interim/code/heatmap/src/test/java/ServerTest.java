import Sql.ConnectionPoolContext;
import org.junit.jupiter.api.Test;


public class ServerTest {

    private ConnectionPoolContext c;

    @Test
    void Connection() {
        c = new ConnectionPoolContext();
    }
}
