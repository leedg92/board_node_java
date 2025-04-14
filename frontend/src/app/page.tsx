'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import BoardTable from '@/components/board/BoardTable';
import { boardAPI } from '@/lib/api/board';
import { Board } from '@/types/board';

export default function Home() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth');
      return;
    }

    const fetchBoards = async () => {
      try {
        const response = await boardAPI.getBoards();
        setBoards(response.content);
      } catch (error) {
        console.error('게시글 목록을 불러오는데 실패했습니다:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBoards();
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">게시판</h1>
          <button
            onClick={() => router.push('/boards/create')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            작성하기
          </button>
        </div>
        {loading ? (
          <div className="text-center">로딩 중...</div>
        ) : (
          <BoardTable boards={boards} />
        )}
      </main>
    </div>
  );
}
