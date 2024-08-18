import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    // Boardとそれに関連するPostersをすべて取得
    const boards = await prisma.board.findMany({
      include: {
        contents: true, // Boardに関連するPosterを含める
      },
    });

    return NextResponse.json(boards, { status: 200 });
  } catch (error) {
    console.error('Error fetching boards:', error);
    return NextResponse.json({ error: 'Failed to fetch boards' }, { status: 500 });
  }
}
