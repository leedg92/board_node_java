export interface Board {
  id: number;
  title: string;
  content: string;
  userId: string;  // 이메일
  uuid: string;    // Supabase 사용자 ID
  viewCount: number;
  createdAt: string;
  updatedAt: string;
  comments?: Comment[];
  files?: File[];
}

export interface Comment {
  id: number;
  content: string;
  postId: number;
  userId: string;  // 이메일
  uuid: string;    // Supabase 사용자 ID
  createdAt: string;
  updatedAt: string;
}

export interface File {
  id: number;
  originalFilename: string;
  storedFilename: string;
  fileSize: number;
  fileType: string;
  postId: number;
  uploadDate: string;
}

export interface BoardPage {
  content: Board[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface CreateBoardRequest {
  title: string;
  content: string;
  uuid: string;
  userId: string;
}

export interface UpdateBoardRequest {
  title: string;
  content: string;
  uuid: string;
  userId: string;
} 