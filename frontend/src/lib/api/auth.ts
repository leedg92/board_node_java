import { AuthRequest, AuthResponse } from '@/types/auth';

const BASE_URL = 'http://localhost:4000/api/java';

export const authAPI = {
  signup: async (data: AuthRequest): Promise<AuthResponse> => {
    const response = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('회원가입에 실패했습니다.');
    return response.json();
  },

  signin: async (data: AuthRequest): Promise<AuthResponse> => {
    const response = await fetch(`${BASE_URL}/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('로그인에 실패했습니다.');
    return response.json();
  },

  signout: async (token: string) => {
    try {
      const response = await fetch('/api/java/auth/signout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        // 에러가 발생해도 로그아웃은 계속 진행
        console.warn('Logout API call failed:', response.status);
      }
    } catch (error) {
      // API 호출 실패해도 로그아웃은 계속 진행
      console.warn('Logout API call failed:', error);
    }
  },

  refreshToken: async (token: string): Promise<AuthResponse> => {
    const response = await fetch(`${BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    if (!response.ok) throw new Error('토큰 갱신에 실패했습니다.');
    return response.json();
  }
}; 