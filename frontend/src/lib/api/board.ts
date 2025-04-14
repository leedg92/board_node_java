import { Board, BoardPage, CreateBoardRequest, UpdateBoardRequest } from '@/types/board';

const BASE_URL = 'http://localhost:4000/api/java';

export const boardAPI = {
  getBoards: async (page: number = 0, size: number = 10): Promise<BoardPage> => {
    const response = await fetch(`${BASE_URL}/boards?page=${page}&size=${size}`, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('게시글 목록을 불러오는데 실패했습니다.');
    return response.json();
  },

  getBoard: async (id: number): Promise<Board> => {
    const response = await fetch(`${BASE_URL}/boards/${id}`, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('게시글을 불러오는데 실패했습니다.');
    return response.json();
  },

  searchBoards: async (keyword: string, page: number = 0, size: number = 10): Promise<BoardPage> => {
    const response = await fetch(`${BASE_URL}/boards/search?keyword=${keyword}&page=${page}&size=${size}`, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('검색 결과를 불러오는데 실패했습니다.');
    return response.json();
  },

  createBoard: async (data: CreateBoardRequest, token: string): Promise<Board> => {
    const response = await fetch(`${BASE_URL}/boards/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('게시글 작성에 실패했습니다.');
    return response.json();
  },

  updateBoard: async (id: number, data: UpdateBoardRequest, token: string): Promise<Board> => {
    const response = await fetch(`${BASE_URL}/boards/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('게시글 수정에 실패했습니다.');
    return response.json();
  },

  deleteBoard: async (id: number, token: string): Promise<void> => {
    const response = await fetch(`${BASE_URL}/boards/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('게시글 삭제에 실패했습니다.');
  },
}; 