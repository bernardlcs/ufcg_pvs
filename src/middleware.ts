import { NextResponse, type NextRequest } from 'next/server';
// O import abaixo agora aponta para o outro arquivo de middleware que você tem
import { updateSession } from './utils/supabase/middleware'; 

export async function middleware(request: NextRequest) {
  // 1. Proteção de Senha para a rota /adm
  if (request.nextUrl.pathname.startsWith('/adm') || request.nextUrl.pathname.startsWith('/sorteio') ) {
    const authHeader = request.headers.get('authorization');

    if (!authHeader) {
      return new NextResponse('Autenticação necessária', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Acesso PVS"' },
      });
    }

    const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    
    // Verifica usuário e senha do seu .env.local
    if (auth[0] !== process.env.ADMIN_USER || auth[1] !== process.env.ADMIN_PASSWORD) {
      return new NextResponse('Senha incorreta', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Acesso PVS"' },
      });
    }
  }

  // 2. Chama a função de sessão do Supabase
  return await updateSession(request);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};