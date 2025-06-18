import Database from 'better-sqlite3';
import path from 'path';

export type DBPost = {
  id: string;
  title: string;
  summary: string;
  body: string;
};

const dbPath = path.join(process.cwd(), 'database.db');
const db = new Database(dbPath);

db.pragma('journal_mode = WAL');
db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    body TEXT NOT NULL
  );
`);

export function getAllPosts(): DBPost[] {
  return db.prepare('SELECT * FROM posts').all();
}

export function getPost(id: string): DBPost | undefined {
  return db.prepare('SELECT * FROM posts WHERE id = ?').get(id);
}

export function createPost(post: Omit<DBPost, "id">): DBPost {
  const id = crypto.randomUUID();
  db.prepare('INSERT INTO posts (id, title, summary, body) VALUES (?, ?, ?, ?)')
    .run(id, post.title, post.summary, post.body);
  return { id, ...post };
}

export function updatePost(id: string, post: Omit<DBPost, "id">): DBPost {
  db.prepare('UPDATE posts SET title = ?, summary = ?, body = ? WHERE id = ?')
    .run(post.title, post.summary, post.body, id);
  return { id, ...post };
}

export function deletePost(id: string): void {
  db.prepare('DELETE FROM posts WHERE id = ?').run(id);
}
