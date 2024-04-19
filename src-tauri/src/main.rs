// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use tauri_plugin_sql::{Migration, MigrationKind};

fn main() {
  let migrations = vec![
    Migration {
        version: 1,
        description: "Table des clients",
        sql: "CREATE TABLE client (
          id_cli INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
          nom_cli INTEGER,
          resp_cli TEXT,
          email_cli TEXT,
          tel_cli TEXT,
          adr_cli TEXT,
          cp_cli INTEGER,
          ville_cli TEXT
        );",
        kind: MigrationKind::Up,
    }
  ];

  tauri::Builder::default()
      .plugin(
        tauri_plugin_sql::Builder::default()
          .add_migrations("sqlite:nay.db", migrations)
          .build())
      .run(tauri::generate_context!())
      .expect("error while running tauri application");
}
