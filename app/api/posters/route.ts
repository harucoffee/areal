// app/api/posters/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { tag, title, content, boardId, author } = await req.json();

    if (!tag || !title || !content || !boardId || !author) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newPoster = await prisma.poster.create({
      data: {
        tag,
        title,
        content,
        boardId: parseInt(boardId, 10),
        author, 
      },
    });

    return NextResponse.json(newPoster, { status: 200 });
  } catch (error) {
    console.error('Error creating poster:', error);
    return NextResponse.json({ error: 'Failed to create poster' }, { status: 500 });
  }
}
