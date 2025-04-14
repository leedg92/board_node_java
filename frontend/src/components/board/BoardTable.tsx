import React from 'react';
import { Board } from '@/types/board';
import Link from 'next/link';

interface BoardTableProps {
  boards: Board[];
}

const BoardTable = ({ boards }: BoardTableProps) => {
  if (boards.length === 0) {
    return (
      <div className="text-center py-8">
        <span className="text-gray-500">게시글이 없습니다.</span>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">제목</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작성자</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작성일</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {boards.map((board) => (
            <tr key={board.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <Link href={`/board/${board.id}`} className="text-blue-600 hover:text-blue-800 hover:underline">
                  {board.title}
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{board.userId}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(board.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BoardTable; 