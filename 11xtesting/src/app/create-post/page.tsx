'use client';
import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useBlog } from '../context/BlogContext';

const CreatePostPage: React.FC = () => {
  const searchParams = useSearchParams();
  const editingId = searchParams?.get('id');
  const { posts, addPost, updatePost } = useBlog();
  const router = useRouter();
  const pathname = usePathname();

  const { isAuthenticated, logout } = useAuth();

  const editingPost = posts.find((p) => String(p.id) === editingId);

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setBody(editingPost.body);
    }
  }, [editingPost]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    if (editingId) {
      updatePost(editingId, {
        title,
        summary: body.length > 100 ? body.slice(0, 100) + '...' : body,
        body,
      });
    } else {
      addPost({
        title,
        summary: body.length > 100 ? body.slice(0, 100) + '...' : body,
        body,
      });
    }

    router.push('/');
  };

  const handleCreatePost = () => {
    router.push('/create-post');
  };

  const isValid = title.trim() && body.trim();

  return (
    <div style={styles.layout}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarContainer}>
          <div style={styles.sidebarTop}>
            <Link href="/" style={styles.logo}>
              Web3 Dev Blog
            </Link>

            <div style={styles.section}>
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    logout();
                    router.push('/');
                  }}
                  style={{ ...styles.sidebarItem, ...styles.logoutButton }}
                >
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
                <button
                  onClick={handleCreatePost}
                  style={{
                    ...styles.sidebarItem,
                    opacity: pathname === '/create-post' ? 0.6 : 1,
                    cursor: pathname === '/create-post' ? 'not-allowed' : 'pointer',
                  }}
                  disabled={pathname === '/create-post'}
                >
                  Create Post
                </button>
              </div>
            )}
          </div>

          {isAuthenticated && (
            <div style={styles.sidebarBottom}>
              <nav style={styles.navList}>
                <Link href="/my-posts" style={styles.navLink}>
                  My Posts
                </Link>
                <Link href="/drafts" style={styles.navLink}>
                  Drafts
                </Link>
                <Link href="/bookmarks" style={styles.navLink}>
                  Bookmarks
                </Link>
                <Link href="/account" style={styles.navLink}>
                  Account
                </Link>
                <Link href="/settings" style={styles.navLink}>
                  Settings
                </Link>
              </nav>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main style={styles.main}>
        <section style={styles.contentSection}>
          <h1 style={{ textAlign: 'center' }}>{editingId ? 'Edit Post' : 'Create a New Blog Post'}</h1>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <input
              type="text"
              placeholder="Post Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={styles.input}
            />
            <textarea
              placeholder="Post Content"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={10}
              style={{ ...styles.input, fontFamily: 'inherit', resize: 'vertical' }}
            />
            <button
              type="submit"
              disabled={!isValid}
              style={{
                ...styles.button,
                ...(isValid ? {} : styles.buttonDisabled),
              }}
            >
              {editingId ? 'Update Post' : 'Publish Post'}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

const PageWithSuspense: React.FC = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <CreatePostPage />
  </Suspense>
);

const styles = {
  layout: {
    display: 'flex' as const,
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
    position: 'fixed' as const,
    top: 0,
    left: 0,
    height: '100vh',
    display: 'flex' as const,
    flexDirection: 'column' as const,
    justifyContent: 'space-between' as const,
    zIndex: 1000,
  },
  sidebarContainer: {
    height: '100%',
    display: 'flex' as const,
    flexDirection: 'column' as const,
    justifyContent: 'space-between' as const,
  },
  sidebarTop: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: '2rem',
  },
  sidebarBottom: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
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
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: '1rem',
  },
  sidebarItem: {
    padding: '0.6rem 1rem',
    borderRadius: '8px',
    border: 'none',
    fontSize: '1rem',
    cursor: 'pointer',
    textAlign: 'left' as const,
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
  navList: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
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
    marginLeft: '250px',
    display: 'flex' as const,
    alignItems: 'center' as const,        // vertical center
    justifyContent: 'center' as const,    // horizontal center
    padding: '2rem',
    minHeight: '100vh',
    boxSizing: 'border-box' as const,
    backgroundColor: 'var(--bg)',
  },
  contentSection: {
    backgroundColor: 'var(--card-bg)',
    padding: '3rem 4rem',
    borderRadius: '16px',
    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.12)',
    maxWidth: '650px',
    width: '100%',
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: '1.5rem',
    color: 'var(--text)',
    transition: 'background 0.3s ease, color 0.3s ease',
  },
  input: {
    padding: '0.75rem',
    backgroundColor: 'var(--card-bg)',
    border: '1px solid var(--accent)',
    borderRadius: '6px',
    fontSize: '1rem',
    color: 'var(--text)',
    outline: 'none',
  },
  button: {
    padding: '0.75rem',
    fontSize: '1rem',
    backgroundColor: 'var(--accent)',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonDisabled: {
    backgroundColor: 'var(--accent)',
    opacity: 0.5,
    cursor: 'not-allowed',
  },
};

export default PageWithSuspense;
