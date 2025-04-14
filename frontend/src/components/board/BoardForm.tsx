'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreateBoardRequest, UpdateBoardRequest } from '@/types/board';
import { boardAPI } from '@/lib/api/board';

interface BoardFormProps {
  mode: 'create' | 'edit';
  initialData?: {
    id?: number;
    title: string;
    content: string;
  };
}

const BoardForm = ({ mode, initialData }: BoardFormProps) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    content: initialData?.content || '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');
    const email = localStorage.getItem('email');
    if (!token || !userId || !email) {
      setError('로그인이 필요합니다.');
      return;
    }

    try {
      if (mode === 'create') {
        await boardAPI.createBoard({ ...formData, uuid: userId, userId: email }, token);
      } else if (mode === 'edit' && initialData?.id) {
        await boardAPI.updateBoard(initialData.id, { ...formData, uuid: userId, userId: email }, token);
      }
      router.push('/');
    } catch (err) {
      setError(mode === 'create' ? '게시글 작성에 실패했습니다.' : '게시글 수정에 실패했습니다.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">
        {mode === 'create' ? '게시글 작성' : '게시글 수정'}
      </h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            제목
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            내용
          </label>
          <textarea
            id="content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={10}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            취소
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            {mode === 'create' ? '작성하기' : '수정하기'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BoardForm; 