import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from './utils/supabase/middleware'; 

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Verifica se a rota ATUAL deve ser protegida
  if (pathname.startsWith('/adm') || pathname.startsWith('/sorteio')) {
    const authHeader = request.headers.get('authorization');

    if (!authHeader) {
      return new NextResponse('Autenticação necessária', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Acesso PVS"' },
      });
    }

    const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    
    if (auth[0] !== process.env.ADMIN_USER || auth[1] !== process.env.ADMIN_PASSWORD) {
      return new NextResponse('Senha incorreta', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Acesso PVS"' },
      });
    }
    
    // Se for ADM/Sorteio e a senha estiver correta, atualiza a sessão e segue
    return await updateSession(request);
  }

  // 2. PARA TODAS AS OUTRAS ROTAS (Inscrição, Home, etc)
  // Retorna direto sem passar pela verificação de senha ou processamento extra
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/adm/:path*',
    '/sorteio/:path*',
  ],
};