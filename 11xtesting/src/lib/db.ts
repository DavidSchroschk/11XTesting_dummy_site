import { prisma } from './prisma';

export type DBPost = {
  id: number;
  title: string;
  summary: string;
  body: string;
};

export async function getAllPosts(): Promise<DBPost[]> {
  return prisma.post.findMany({ orderBy: { id: 'desc' } });
}

export async function getPost(id: string): Promise<DBPost | null> {
  return prisma.post.findUnique({ where: { id: Number(id) } });
}

export async function createPost(post: Omit<DBPost, 'id'>): Promise<DBPost> {
  return prisma.post.create({ data: post });
}

export async function updatePost(id: string, post: Omit<DBPost, 'id'>): Promise<DBPost> {
  return prisma.post.update({ where: { id: Number(id) }, data: post });
}

export async function deletePost(id: string): Promise<void> {
  await prisma.post.delete({ where: { id: Number(id) } });
}

export async function findUser(username: string) {
  return prisma.user.findUnique({ where: { username } });
}
