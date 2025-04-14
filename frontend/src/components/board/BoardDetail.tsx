'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Board } from '@/types/board';
import { boardAPI } from '@/lib/api/board';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

interface BoardDetailProps {
  id: number;
}

const BoardDetail = ({ id }: BoardDetailProps) => {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const [board, setBoard] = useState<Board | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const currentUserId = localStorage.getItem('userId');

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth');
      return;
    }

    const fetchBoard = async () => {
      try {
        const response = await boardAPI.getBoard(id);
        setBoard(response);
      } catch (err) {
        setError('게시글을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchBoard();
    }
  }, [id, isAuthenticated, isLoading, router]);

  const handleDelete = async () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setError('로그인이 필요합니다.');
        return;
      }

      await boardAPI.deleteBoard(id, token);
      router.push('/');
    } catch (err) {
      setError('게시글 삭제에 실패했습니다.');
    }
  };

  if (isLoading) return <div>인증 상태 확인 중...</div>;
  if (loading) return <div>로딩중...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!board) return <div>게시글을 찾을 수 없습니다.</div>;

  const isAuthor = board.uuid === currentUserId;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">{board.title}</h1>
        <div className="flex justify-between items-center text-gray-600 mb-4">
          <span>작성자: {board.userId}</span>
          <span>조회수: {board.viewCount}</span>
        </div>
        <div className="text-gray-600 mb-4">
          <span>작성일: {new Date(board.createdAt).toLocaleString()}</span>
          {board.updatedAt !== board.createdAt && (
            <span className="ml-4">수정일: {new Date(board.updatedAt).toLocaleString()}</span>
          )}
        </div>
      </div>

      <div className="prose max-w-none mb-8">
        <p className="whitespace-pre-wrap">{board.content}</p>
      </div>

      {isAuthor && (
        <div className="flex justify-end space-x-4 mb-8">
          <Link
            href={`/board/edit/${board.id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            수정
          </Link>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            삭제
          </button>
        </div>
      )}

      <div className="border-t pt-8">
        <h2 className="text-2xl font-bold mb-4">댓글</h2>
        {board.comments?.map((comment) => (
          <div key={comment.id} className="border-b py-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">{comment.userId}</span>
              <span className="text-gray-600 text-sm">
                {new Date(comment.createdAt).toLocaleString()}
              </span>
            </div>
            <p className="text-gray-800">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardDetail; 