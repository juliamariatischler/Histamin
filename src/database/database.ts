import * as SQLite from 'expo-sqlite';

export const database = SQLite.openDatabaseSync('histatrack.db');

export function initializeDatabase(): void {
  database.execSync(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS meals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_name TEXT NOT NULL,
      amount_grams REAL NOT NULL DEFAULT 0,
      calories REAL NOT NULL DEFAULT 0,
      protein REAL NOT NULL DEFAULT 0,
      carbohydrates REAL NOT NULL DEFAULT 0,
      fat REAL NOT NULL DEFAULT 0,
      histamine_rating TEXT NOT NULL DEFAULT 'unknown',
      dao_taken INTEGER NOT NULL DEFAULT 0,
      eaten_at TEXT NOT NULL,
      notes TEXT
    );

    CREATE TABLE IF NOT EXISTS checkins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      mood INTEGER NOT NULL,
      energy INTEGER NOT NULL,
      stress INTEGER NOT NULL,
      concentration INTEGER NOT NULL,
      checked_at TEXT NOT NULL,
      notes TEXT
    );

    CREATE TABLE IF NOT EXISTS symptoms (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      symptom_name TEXT NOT NULL,
      severity INTEGER NOT NULL,
      started_at TEXT NOT NULL,
      notes TEXT
    );
  `);
}

export type DashboardSummary = {
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  symptomCount: number;
  latestMood: number | null;
};

export function getDashboardSummary(): DashboardSummary {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);

  const nutrition = database.getFirstSync<{
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
  }>(
    `SELECT COALESCE(SUM(calories), 0) calories,
            COALESCE(SUM(protein), 0) protein,
            COALESCE(SUM(carbohydrates), 0) carbohydrates,
            COALESCE(SUM(fat), 0) fat
     FROM meals WHERE eaten_at BETWEEN ? AND ?`,
    [start.toISOString(), end.toISOString()]
  );

  const symptoms = database.getFirstSync<{ count: number }>(
    'SELECT COUNT(*) count FROM symptoms WHERE started_at BETWEEN ? AND ?',
    [start.toISOString(), end.toISOString()]
  );

  const mood = database.getFirstSync<{ mood: number }>(
    'SELECT mood FROM checkins ORDER BY checked_at DESC LIMIT 1'
  );

  return {
    calories: nutrition?.calories ?? 0,
    protein: nutrition?.protein ?? 0,
    carbohydrates: nutrition?.carbohydrates ?? 0,
    fat: nutrition?.fat ?? 0,
    symptomCount: symptoms?.count ?? 0,
    latestMood: mood?.mood ?? null,
  };
}
