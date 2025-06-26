'use client';
import { useParams, useRouter } from 'next/navigation';
import { useBlog } from '../../context/BlogContext';
import { useAuth } from '../../context/AuthContext';

export default function PostPage() {
  const { posts, deletePost } = useBlog();
  const { isAuthenticated } = useAuth();
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const post = posts.find((p) => String(p.id) === id);

  if (!post) return <h1>Post Not Found</h1>;

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
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{post.title}</h1>
      <p>{post.body}</p>

      {isAuthenticated && (
        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
          <button onClick={handleEdit} style={buttonStyle}>Edit</button>
          <button onClick={handleDelete} style={buttonStyle}>Delete</button>
        </div>
      )}
    </main>
  );
}

const buttonStyle = {
  padding: '0.5rem 1rem',
  background: 'var(--accent)',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
};
