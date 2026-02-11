import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from './utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  // 1. Atualiza a sessão e recupera o objeto de resposta
  const response = await updateSession(request);
  const { pathname } = request.nextUrl;

  // 2. Proteção de rotas ADM e SORTEIO
  if (pathname.startsWith('/adm') || pathname.startsWith('/sorteio')) {
    // Verificamos se existe o cookie de sessão do Supabase
    // O Supabase Auth guarda o token em um cookie que começa com 'sb-'
    const hasSession = request.cookies.getAll().some(c => c.name.includes('auth-token'));

    if (!hasSession) {
      // Se não houver sessão, redireciona para a página de login
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/adm/:path*',
    '/sorteio/:path*',
  ],
};