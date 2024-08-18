import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/prisma';

export async function POST(req: NextRequest) {
  try {
    const { tag, title, content, boardId, boardName } = await req.json();

    if (!tag || !title || !content) {
      throw new Error('Missing required fields');
    }

    // boardIdが指定されていない場合、boardNameが必要
    if (!boardId && !boardName) {
      throw new Error('Either boardId or boardName is required');
    }

    let board;

    // boardIdが指定されている場合、そのIDが存在するか確認
    if (boardId) {
      board = await prisma.board.findUnique({
        where: {
          id: parseInt(boardId, 10),
        },
      });
    }

    // boardIdが存在しない場合、新しいBoardを作成
    if (!board && boardName) {
      board = await prisma.board.create({
        data: {
          name: boardName,
        },
      });
    }

    if (!board) {
      throw new Error('Board could not be created or found');
    }

    // Posterを作成
    const newPoster = await prisma.poster.create({
      data: {
        tag,
        title,
        content,
        boardId: board.id,  // 新しく作成したまたは既存のboardのIDを使用
      },
    });

    return NextResponse.json(newPoster, { status: 200 });
  } catch (error) {
    console.error('Error creating poster:', error);
    return NextResponse.json({ status: 500 });
  }
}
