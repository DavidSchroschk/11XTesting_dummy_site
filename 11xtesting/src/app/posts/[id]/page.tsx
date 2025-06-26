'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useBlog } from '../../context/BlogContext';
import { useAuth } from '../../context/AuthContext';

export default function PostPage() {
  const { posts, deletePost } = useBlog();
  const { isAuthenticated, logout } = useAuth();
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const post = posts.find((p) => String(p.id) === id);

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this post?')) {
      deletePost(id as string);
      router.push('/');
    }
  };

  const handleEdit = () => {
    router.push(`/create-post?id=${id}`);
  };

  return (
    <div style={styles.layout}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarContainer}>
          <div style={styles.sidebarTop}>
            <Link href="/" style={styles.logo}>Web3 Dev Blog</Link>
            <div style={styles.section}>
              {isAuthenticated ? (
                <button onClick={logout} style={{ ...styles.sidebarItem, ...styles.logoutButton }}>
                  Logout
                </button>
              ) : (
                <Link href="/login" style={{ ...styles.sidebarItem, ...styles.loginButton }}>
                  Login
                </Link>
              )}
            </div>
            {isAuthenticated && (
              <div style={styles.section}>
                <button onClick={() => router.push('/create-post')} style={{ ...styles.sidebarItem, ...styles.createButton }}>
                  Create Post
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main style={styles.main}>
        {!post ? (
          <h1 style={styles.notFound}>Post Not Found</h1>
        ) : (
          <article style={styles.postContainer}>
            <h1 style={styles.postTitle}>{post.title}</h1>
            <p style={styles.postBody}>{post.body}</p>

            {isAuthenticated && (
              <div style={styles.buttonGroup}>
                <button onClick={handleEdit} style={styles.editButton}>Edit</button>
                <button onClick={handleDelete} style={styles.deleteButton}>Delete</button>
              </div>
            )}
          </article>
        )}
      </main>
    </div>
  );
}

const styles = {
  layout: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: 'var(--bg)',
    color: 'var(--text)',
    fontFamily: 'system-ui, sans-serif',
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#111827',
    color: '#fff',
    padding: '2rem 1.5rem',
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    zIndex: 1000,
  },
  sidebarContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  sidebarTop: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  logo: {
    fontSize: '1.75rem',
    textDecoration: 'none',
    color: '#fff',
    fontWeight: 'bold',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  sidebarItem: {
    padding: '0.6rem 1rem',
    borderRadius: '8px',
    border: 'none',
    fontSize: '1rem',
    cursor: 'pointer',
    backgroundColor: '#1f2937',
    color: '#cbd5e1',
    textAlign: 'left',
    textDecoration: 'none',
    display: 'block',
  },
  loginButton: {
    backgroundColor: '#10b981',
    color: '#fff',
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    color: '#fff',
  },
  createButton: {
    backgroundColor: '#4f46e5',
    color: '#fff',
  },
  main: {
    flex: 1,
    padding: '2rem',
    marginLeft: '250px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  postContainer: {
    maxWidth: '800px',
    width: '100%',
    backgroundColor: 'var(--card-bg, #f9f9f9)',
    padding: '2rem',
    borderRadius: '12px',
    border: '1px solid #ccc',
  },
  postTitle: {
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  postBody: {
    fontSize: '1.125rem',
    lineHeight: '1.6',
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    marginTop: '2rem',
  },
  editButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#4f46e5',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  deleteButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#ef4444',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  notFound: {
    fontSize: '1.5rem',
    color: 'red',
    textAlign: 'center',
  },
} as const;
