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
    <div style={styles.layout}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarContainer}>
          {/* Top section */}
          <div style={styles.sidebarTop}>
            <Link href="/" style={styles.logo}>
              Web3 Dev Blog
            </Link>

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
                <button onClick={handleCreatePost} style={{ ...styles.sidebarItem, ...styles.createButton }}>
                  Create Post
                </button>
              </div>
            )}
          </div>

          {/* Bottom section: "Manage" links */}
          {isAuthenticated && (
            <div style={styles.sidebarBottom}>
              <nav style={styles.navList}>
                <Link href="/my-posts" style={styles.navLink}>My Posts</Link>
                <Link href="/drafts" style={styles.navLink}>Drafts</Link>
                <Link href="/bookmarks" style={styles.navLink}>Bookmarks</Link>
                <Link href="/account" style={styles.navLink}>Account</Link>
                <Link href="/settings" style={styles.navLink}>Settings</Link>
              </nav>
            </div>
          )}
        </div>
      </aside>

      {/* Main content */}
      <main style={styles.main}>
        <section style={styles.hero}>
          <div style={styles.heroContent}>
            <h2 style={styles.heroTitle}>Explore the decentralized future</h2>
            <p style={styles.heroSubtitle}>
              Insights and tutorials from developers in the Web3 space.
            </p>
          </div>
        </section>

        <section style={styles.blogListSection}>
          {!isAuthenticated && (
            <p style={styles.guestNote}>
              You are viewing as a guest. Posts remain visible after logout.
            </p>
          )}
          <div style={styles.postList}>
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/posts/${post.id}`}
                style={styles.postCard}
                onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.postHover)}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                <h3 style={styles.postTitle}>{post.title}</h3>
                <p style={styles.postSummary}>{post.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

const styles = {
  layout: {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: 'system-ui, sans-serif',
    backgroundColor: 'var(--bg)',
    color: 'var(--text)',
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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    zIndex: 1000,
  },
  sidebarContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  sidebarTop: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  sidebarBottom: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    paddingTop: '1rem',
    borderTop: '1px solid #374151',
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
    textAlign: 'left',
    textDecoration: 'none',
    backgroundColor: '#1f2937',
    color: '#cbd5e1',
    transition: 'background 0.2s ease',
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
  navList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  navLink: {
    color: '#cbd5e1',
    textDecoration: 'none',
    fontSize: '0.95rem',
    padding: '0.4rem 0.5rem',
    borderRadius: '6px',
    transition: 'background 0.2s ease',
  },
  main: {
    flex: 1,
    padding: '2rem',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '250px',
  },
  hero: {
    background: 'linear-gradient(to right, #1e3a8a, #6366f1)',
    color: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    marginBottom: '2rem',
    marginLeft: '50px',
  },
  heroContent: {
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center',
  },
  heroTitle: {
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  heroSubtitle: {
    fontSize: '1.125rem',
    opacity: 0.9,
  },
  blogListSection: {
    maxWidth: '1000px',
    margin: '0 auto',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    paddingRight: '0.5rem',
  },
  guestNote: {
    marginBottom: '1rem',
    color: 'var(--accent)',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  postList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    overflowY: 'auto',
    paddingBottom: '2rem',
  },
  postCard: {
    backgroundColor: 'var(--card-bg, #f9f9f9)',
    padding: '1.5rem',
    borderRadius: '12px',
    border: '1px solid #ccc',
    textDecoration: 'none',
    color: 'inherit',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  postHover: {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
  },
  postTitle: {
    fontSize: '1.25rem',
    marginBottom: '0.5rem',
  },
  postSummary: {
    fontSize: '1rem',
    color: 'var(--text-muted, #555)',
  },
} as const;
