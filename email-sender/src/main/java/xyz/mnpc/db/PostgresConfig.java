package xyz.mnpc.db;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

import javax.sql.DataSource;

public class PostgresConfig {

    public static DataSource getDataSource() {
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl(System.getenv().getOrDefault("DB_URL","jdbc:postgresql://127.0.0.1:5432/amancay"));
        config.setUsername(System.getenv().getOrDefault("DB_USER","amancay"));
        config.setPassword(System.getenv().getOrDefault("DB_PASS","amancay"));
        config.setDriverClassName("org.postgresql.Driver");
        config.setMaximumPoolSize(3);
        config.setMinimumIdle(2);
        config.setIdleTimeout(30000);
        config.setConnectionTimeout(30000);
        return new HikariDataSource(config);
    }
}
