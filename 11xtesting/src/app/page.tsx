'use client';

import Link from 'next/link';

const posts = [
  { id: '1', title: 'How to Use Next.js 13', summary: 'Learn the basics of App Router in Next.js 13.' },
  { id: '2', title: 'Understanding Server Components', summary: 'A deep dive into server and client components.' },
  { id: '3', title: 'Deploying with Vercel', summary: 'Steps to deploy your Next.js app easily.' },
];

export default function Home() {
  return (
    <main style={styles.main}>
      <header style={styles.header}>
        <h1 style={styles.title}>My Blog</h1>
        <Link href="/login" style={styles.loginButton}>Login</Link>
      </header>

      <section style={styles.blogList}>
        {posts.map((post) => (
          <Link key={post.id} href={`/posts/${post.id}`} style={styles.post}>
            <h2>{post.title}</h2>
            <p>{post.summary}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}

const styles = {
  main: {
    padding: '2rem',
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: 'var(--bg)',
    color: 'var(--text)',
    minHeight: '100vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2rem',
  },
  loginButton: {
    textDecoration: 'none',
    background: 'var(--accent)',
    color: '#fff',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
  },
  blogList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  post: {
    textDecoration: 'none',
    color: 'var(--text)',
    backgroundColor: 'var(--card-bg)',
    borderRadius: '8px',
    padding: '1rem',
    border: '1px solid #ccc',
    transition: 'transform 0.2s ease',
  },
} as const;
