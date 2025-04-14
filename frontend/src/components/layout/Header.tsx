import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-xl font-bold">Jackuri_dev</div>
        <div className="text-xl font-bold">게시판</div>
        <div className="flex items-center gap-4">          
          {isAuthenticated ? (
            <>
              <span className="text-gray-600">{user?.email}</span>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                로그아웃
              </button>
            </>
          ) : (
            <span className="text-gray-600">로그인이 필요합니다</span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 