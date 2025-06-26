'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type BlogPost = {
  id: string;
  title: string;
  summary: string;
  body: string;
};

type BlogContextType = {
  posts: BlogPost[];
  addPost: (post: Omit<BlogPost, 'id'>) => void;
  updatePost: (id: string, updated: Omit<BlogPost, 'id'>) => void;
  deletePost: (id: string) => void;
};


const BlogContext = createContext<BlogContextType | null>(null);

export function BlogProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/posts');
      if (res.ok) {
        const data: BlogPost[] = await res.json();
        setPosts(data);
      }
    };
    fetchPosts();
  }, []);

  const addPost = async (post: Omit<BlogPost, 'id'>) => {
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    if (res.ok) {
      const created: BlogPost = await res.json();
      setPosts((prev) => [...prev, created]);
    }
  };

  const updatePost = async (id: string, updated: Omit<BlogPost, 'id'>) => {
    const res = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    });
    if (res.ok) {
      const saved: BlogPost = await res.json();
      setPosts((prev) =>
        prev.map((post) => (String(post.id) === id ? saved : post))
      );
    }
  };

  const deletePost = async (id: string) => {
    await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    setPosts((prev) => prev.filter((post) => String(post.id) !== id));
  };


  return (
    <BlogContext.Provider value={{ posts, addPost, updatePost, deletePost }}>
      {children}
    </BlogContext.Provider>
  );
}

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) throw new Error('useBlog must be used within BlogProvider');
  return context;
};
