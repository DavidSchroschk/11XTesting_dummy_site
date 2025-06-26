import { NextRequest, NextResponse } from 'next/server';
import { findUser } from '@/lib/db';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  const user = await findUser(username);
  if (!user || user.password !== password) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  return NextResponse.json({ success: true });
}
