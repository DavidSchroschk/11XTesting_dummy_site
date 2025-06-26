import { NextRequest, NextResponse } from 'next/server';
import { findUser } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  const user = await findUser(username);
  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  return NextResponse.json({ success: true });
}
