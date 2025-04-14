'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthState, AuthRequest } from '@/types/auth';
import { authAPI } from '@/lib/api/auth';
import { useRouter } from 'next/navigation';

interface AuthContextType extends AuthState {
  login: (data: AuthRequest) => Promise<void>;
  logout: () => Promise<void>;
  signup: (data: AuthRequest) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
  });

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const email = localStorage.getItem('email');
    console.log('AuthProvider useEffect - token:', token);
    console.log('AuthProvider useEffect - email:', email);
    
    if (token && email) {
      setAuthState({
        isAuthenticated: true,
        user: { email },
      });
    }
  }, []);

  const login = async (data: AuthRequest) => {
    try {
      console.log('login 시작 - 입력 데이터:', data);
      const response = await authAPI.signin(data);
      console.log('login response:', response);
      
      if (!response.email) {
        console.error('응답에 email이 없습니다:', response);
        throw new Error('로그인 응답에 email이 없습니다.');
      }
      
      console.log('localStorage에 저장 전:', {
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        email: response.email
      });
      
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      localStorage.setItem('email', response.email);
      localStorage.setItem('userId', response.userId);
      localStorage.setItem('userRole', response.userRole);
      
      console.log('localStorage에 저장 후:', {
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken'),
        email: localStorage.getItem('email'),
        userId: localStorage.getItem('userId'),
        userRole: localStorage.getItem('userRole')
      });
      
      setAuthState({
        isAuthenticated: true,
        user: { email: response.email },
      });
      
      console.log('setAuthState 후 authState:', authState);
      
      router.push('/');
    } catch (error) {
      console.error('login 에러:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (token) {
        await authAPI.signout(token);
      }
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('email');
      localStorage.removeItem('userId');
      localStorage.removeItem('userRole');
      setAuthState({
        isAuthenticated: false,
        user: null,
      });
      router.push('/auth');
    } catch (error) {
      // 로그아웃 실패 시에도 로컬 스토리지 정리
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('email');
      localStorage.removeItem('userId');
      localStorage.removeItem('userRole');
      setAuthState({
        isAuthenticated: false,
        user: null,
      });
      router.push('/auth');
    }
  };

  const signup = async (data: AuthRequest) => {
    await authAPI.signup(data);
    router.push('/auth');
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 