package Sql;

import Util.Key;

import java.sql.*;

/**
 * Use for connect to local Postgre server.
 *
 * @author liz
 */
public class PostgreSQLJDBC {
    private Connection conn = null;

    public PostgreSQLJDBC(String database) {
        connect(database);
    }

    private void connect(String database) {
        Statement statement = null;
        try {
            Class.forName("org.postgresql.Driver");
            conn = DriverManager.getConnection(
                    "jdbc:postgresql://localhost:5432/" + database,
                    "postgres", Key.getPassword());
        } catch (ClassNotFoundException | SQLException ce) {
            ce.printStackTrace();
            System.exit(0);
        }
        System.out.println("Open database successfully");
    }

    //TODO it doesn't close the statement but cannot be closed when resultSet is still in use,
    // certainly not a good way to make a query...
    public ResultSet query(String sql) {
        PreparedStatement pStatement = null;
        ResultSet resultSet = null;
        try {
            pStatement = conn.prepareStatement(sql);
            resultSet = pStatement.executeQuery();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return resultSet;
    }

    public boolean update(String sql) {
        PreparedStatement pStatement = null;
        int rs = 0;
        try {
            pStatement = conn.prepareStatement(sql);
            rs = pStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return rs > 0;
    }
}

