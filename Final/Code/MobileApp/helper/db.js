import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('commonDB.db');

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY NOT NULL , name TEXT)')
      },
        [],
        () => {
          resolve()
        },
        (_, err) => {
          reject(err);
        }
    );
  });
    return promise;
};
