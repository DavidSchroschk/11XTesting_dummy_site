'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from './context/AuthContext';
import { useBlog } from './context/BlogContext';

export default function Home() {
  const { isAuthenticated, logout } = useAuth();
  const { posts } = useBlog();
  const router = useRouter();

  const handleCreatePost = () => {
    router.push('/create-post');
  };

  return (
    <main style={styles.main}>
      <header style={styles.header}>
        <h1 style={styles.title}>Web3 Dev Blog</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {isAuthenticated ? (
            <>
              <button onClick={handleCreatePost} style={styles.button}>Create Post</button>
              <button onClick={logout} style={styles.button}>Logout</button>
            </>
          ) : (
            <Link href="/login" style={styles.button}>Login</Link>
          )}
        </div>
      </header>

      <section style={styles.blogList}>
        {!isAuthenticated && (
          <p style={{ marginBottom: '1rem', color: 'var(--accent)' }}>
            You are viewing as a guest. Posts remain visible after logout.
          </p>
        )}
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/posts/${post.id}`}
            style={styles.post}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.postHover)}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = '';
            }}
          >
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
  button: {
    textDecoration: 'none',
    background: 'var(--accent)',
    color: '#fff',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    cursor: 'pointer',
    border: 'none',
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
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  postHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
} as const;
