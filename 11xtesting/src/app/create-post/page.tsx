'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useBlog } from '../context/BlogContext';

export default function CreatePostPage() {
  const searchParams = useSearchParams();
  const editingId = searchParams.get('id');
  const { posts, addPost, updatePost } = useBlog();
  const router = useRouter();

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
        summary: body.slice(0, 100) + '...',
        body,
      });
    } else {
      addPost({
        title,
        summary: body.slice(0, 100) + '...',
        body,
      });
    }

    router.push('/');
  };

  const isValid = title.trim() && body.trim();

  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{editingId ? 'Edit Post' : 'Create a New Blog Post'}</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
        />
        <textarea
          placeholder="Post Content"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={10}
          style={{ ...inputStyle, fontFamily: 'inherit' }}
        />
        <button type="submit" disabled={!isValid} style={{ ...buttonStyle, opacity: isValid ? 1 : 0.5 }}>
          {editingId ? 'Update Post' : 'Publish Post'}
        </button>
      </form>
    </main>
  );
}

const inputStyle = {
  padding: '1rem',
  fontSize: '1rem',
  border: '1px solid #ccc',
  borderRadius: '8px',
};

const buttonStyle = {
  padding: '1rem',
  fontSize: '1rem',
  background: 'var(--accent)',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
};
