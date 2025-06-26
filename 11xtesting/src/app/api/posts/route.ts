import { NextRequest, NextResponse } from 'next/server';
import { getAllPosts, createPost } from '@/lib/db';

export async function GET() {
  const posts = await getAllPosts();
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const newPost = await createPost({
    title: data.title,
    summary: data.summary,
    body: data.body,
  });
  return NextResponse.json(newPost, { status: 201 });
}
