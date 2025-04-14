'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Board } from '@/types/board';
import { boardAPI } from '@/lib/api/board';
import BoardDetail from '@/components/board/BoardDetail';

interface BoardDetailPageProps {
  params: {
    id: string;
  };
}

export default function BoardDetailPage({ params }: BoardDetailPageProps) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [board, setBoard] = useState<Board | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const boardId = Number(params.id);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth');
      return;
    }

    const fetchBoard = async () => {
      try {
        const data = await boardAPI.getBoard(boardId);
        setBoard(data);
      } catch (err) {
        setError('게시글을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchBoard();
  }, [isAuthenticated, boardId, router]);

  if (loading) {
    return <div className="text-center py-8">로딩 중...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (!board) {
    return <div className="text-center py-8">게시글을 찾을 수 없습니다.</div>;
  }

  return <BoardDetail id={boardId} />;
} 