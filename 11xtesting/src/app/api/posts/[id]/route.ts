import { NextRequest, NextResponse } from 'next/server';
import { getPost, updatePost, deletePost } from '@/lib/db';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const post = await getPost(params.id);
  if (!post) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(post);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await req.json();
  const updated = await updatePost(params.id, {
    title: data.title,
    summary: data.summary,
    body: data.body,
  });
  return NextResponse.json(updated);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await deletePost(params.id);
  return NextResponse.json({ success: true });
}
