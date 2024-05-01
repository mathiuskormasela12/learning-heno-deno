import { Client } from 'mysql/mod.ts';
import config from '@/config';

const db = await new Client().connect({
  hostname: config.DB_HOST,
  port: config.DB_PORT,
  password: config.DB_PASSWORD,
  username: config.DB_USER,
});

class DatabaseMigration {
  public static sql: string[] = [
    `CREATE DATABASE IF NOT EXISTS ${config.DB_NAME} CHARACTER SET utf8 COLLATE utf8_general_ci;`,
    `USE ${config.DB_NAME};`,
    `
          CREATE TABLE IF NOT EXISTS movies (
              id INT(11) NOT NULL AUTO_INCREMENT,
              title VARCHAR(255) NOT NULL,
              description VARCHAR(255),
              releaseDate DATE NOT NULL,
              writer VARCHAR(255) NOT NULL,
              createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
              updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

              PRIMARY KEY(id),
              INDEX title_idx (title)
          ) ENGINE=InnoDB;
      `,
  ];

  public static async migrate(): Promise<string> {
    try {
      await Promise.all(DatabaseMigration.sql.map((sql) => db.execute(sql)));
      return 'Database migration successfully';
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default DatabaseMigration;
