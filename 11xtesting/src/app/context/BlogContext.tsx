'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

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
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: '1',
      title: 'How to Use Next.js 13',
      summary: 'Learn the basics of App Router in Next.js 13.',
      body: 'Full article content here...',
    },
    {
      id: '2',
      title: 'Understanding Server Components',
      summary: 'A deep dive into server and client components.',
      body: 'In-depth content goes here...',
    },
    {
      id: '3',
      title: 'Deploying with Vercel',
      summary: 'Steps to deploy your Next.js app easily.',
      body: 'Deployment guide content here...',
    },
  ]);

  const addPost = (post: Omit<BlogPost, 'id'>) => {
    const id = crypto.randomUUID();
    setPosts((prev) => [...prev, { id, ...post }]);
  };

  const updatePost = (id: string, updated: Omit<BlogPost, 'id'>) => {
    setPosts((prev) =>
        prev.map((post) => (post.id === id ? { id, ...updated } : post))
    );
  };

  const deletePost = (id: string) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
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
