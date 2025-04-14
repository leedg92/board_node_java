import { NextRequest, NextResponse } from 'next/server';

const JAVA_BACKEND_URL = process.env.JAVA_BACKEND_URL || 'http://localhost:8088';
const NODE_BACKEND_URL = process.env.NODE_BACKEND_URL || 'http://localhost:8089';

export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const pathSegments = url.pathname.split('/').filter(Boolean);
        const backendType = pathSegments[1]; // /api/java/boards -> java
        const actualPath = pathSegments.slice(2).join('/'); // boards
        
        // 백엔드 URL 결정
        const backendUrl = backendType === 'java' ? JAVA_BACKEND_URL : NODE_BACKEND_URL;
        const searchParams = url.searchParams.toString();
        const apiUrl = `${backendUrl}/api/${actualPath}${searchParams ? `?${searchParams}` : ''}`;
        
        // Authorization 헤더 가져오기
        const authHeader = request.headers.get('Authorization');
        
        console.log('Request URL:', apiUrl);
        console.log('Request Headers:', {
            'Authorization': authHeader || '',
            'Content-Type': 'application/json',
        });

        const response = await fetch(apiUrl, {
            headers: {
                'Authorization': authHeader || '',
                'Content-Type': 'application/json',
            },
        });

        console.log('Response Status:', response.status);
        console.log('Response Headers:', Object.fromEntries(response.headers.entries()));

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error Response:', errorText);
            throw new Error(`Backend returned ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        console.log('Response Data:', data);

        return NextResponse.json(data, {
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Access-Control-Allow-Credentials': 'true',
            },
        });
    } catch (error) {
        console.error('Detailed Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error', details: error.message },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const pathSegments = url.pathname.split('/').filter(Boolean);
        const backendType = pathSegments[1]; // /api/java/auth/signin -> java
        const actualPath = pathSegments.slice(2).join('/'); // auth/signin
        
        // 요청 본문이 있을 때만 JSON 파싱 시도
        let body = {};
        const contentType = request.headers.get('content-type');
        if (contentType?.includes('application/json')) {
            try {
                body = await request.json();
            } catch {
                // JSON 파싱 실패 시 빈 객체 사용
            }
        }
        
        // 백엔드 URL 결정
        const backendUrl = backendType === 'java' ? JAVA_BACKEND_URL : NODE_BACKEND_URL;
        const apiUrl = `${backendUrl}/api/${actualPath}`;
        
        // Authorization 헤더 가져오기
        const authHeader = request.headers.get('Authorization');
        
        console.log('Request URL:', apiUrl);
        console.log('Request Headers:', {
            'Authorization': authHeader || '',
            'Content-Type': 'application/json',
        });
        console.log('Request Body:', body);

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': authHeader || '',
                'Content-Type': 'application/json',
            },
            body: Object.keys(body).length > 0 ? JSON.stringify(body) : undefined,
        });

        console.log('Response Status:', response.status);
        console.log('Response Headers:', Object.fromEntries(response.headers.entries()));

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error Response:', errorText);
            throw new Error(`Backend returned ${response.status}: ${errorText}`);
        }

        // 응답의 Content-Type 확인
        const responseContentType = response.headers.get('content-type');
        let data = {};
        
        if (responseContentType?.includes('application/json')) {
            try {
                data = await response.json();
            } catch {
                // JSON 파싱 실패 시 빈 객체 사용
            }
        }

        console.log('Response Data:', data);

        return NextResponse.json(data, {
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Access-Control-Allow-Credentials': 'true',
            },
        });
    } catch (error) {
        console.error('Detailed Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error', details: error.message },
            { status: 500 }
        );
    }
}

export async function OPTIONS() {
    return NextResponse.json({}, {
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Allow-Credentials': 'true',
        },
    });
} 