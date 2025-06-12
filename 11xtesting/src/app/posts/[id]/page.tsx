// app/posts/[id]/page.tsx
type Params = { params: { id: string } };

const postContent: Record<string, { title: string; body: string }> = {
  '1': { title: 'How to Use Next.js 13', body: 'Full article content here...' },
  '2': { title: 'Understanding Server Components', body: 'In-depth content goes here...' },
  '3': { title: 'Deploying with Vercel', body: 'Deployment guide content here...' },
};

export default function PostPage({ params }: Params) {
  const post = postContent[params.id];

  if (!post) return <h1>Post Not Found</h1>;

  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </main>
  );
}
