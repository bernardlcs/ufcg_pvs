import type { Metadata } from "next";
import Link from 'next/link'; // Adicionado para corrigir o erro
import "./globals.css";

export const metadata: Metadata = {
  title: "PVS 2026 - Pré-Vestibular Solidário",
  description: "Portal de Inscrições UFCG",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className="flex flex-col min-h-screen antialiased bg-zinc-50">
        {/* Navbar Global */}
        <nav className="bg-white border-b border-zinc-200 py-4 px-6 flex justify-between items-center sticky top-0 z-50 shadow-sm">
          <Link href="/" className="text-blue-700 font-black text-xl tracking-tighter hover:opacity-80 transition-opacity">
            PVS 2026
          </Link>
          <div className="flex gap-6 items-center">
            <Link href="/quem_somos" className="text-zinc-600 hover:text-blue-700 font-medium transition-colors">
              Quem Somos
            </Link>
            <Link href="/adm" className="text-zinc-600 hover:text-blue-700 font-medium transition-colors">
              Administração
            </Link>
            <Link href="/sorteio" className="text-zinc-600 hover:text-blue-700 font-medium transition-colors">
              Sorteio
            </Link>
            <Link href="/inscricao" className="bg-blue-700 text-white px-5 py-2 rounded-full font-bold hover:bg-blue-800 transition-all shadow-md active:scale-95">
              Fazer Inscrição
            </Link>
          </div>
        </nav>

        {/* Conteúdo da Página */}
        <div className="flex-grow">
          {children}
        </div>

        {/* Rodapé Institucional (Footer) */}
        <footer className="bg-zinc-900 text-white py-12 px-6 border-t border-zinc-800">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Coluna 1: Logo/Nome */}
            <div className="space-y-4">
              <h3 className="text-xl font-black tracking-tighter text-blue-400">PVS 2026</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Pré-Vestibular Solidário da UFCG.<br />
                Preparando jovens da rede pública para o futuro acadêmico desde 2002.
              </p>
            </div>

            {/* Coluna 2: Links Rápidos */}
            <div className="space-y-4">
              <h4 className="font-bold text-zinc-100 uppercase text-xs tracking-widest">Acesso Rápido</h4>
              <ul className="flex flex-col gap-2 text-sm text-zinc-400">
                <li><Link href="/" className="hover:text-blue-400 transition-colors">Página Inicial</Link></li>
                <li><Link href="/inscricao" className="hover:text-blue-400 transition-colors">Formulário de Inscrição</Link></li>
                <li><Link href="/quem-somos" className="hover:text-blue-400 transition-colors">Sobre o Projeto</Link></li>
              </ul>
            </div>

            {/* Coluna 3: Contato/UFCG */}
            <div className="space-y-4">
              <h4 className="font-bold text-zinc-100 uppercase text-xs tracking-widest">Realização</h4>
              <p className="text-sm text-zinc-400">
                UFCG - Universidade Federal de Campina Grande<br />
                PROPEX - Pró-Reitoria de Pesquisa e Extensão
              </p>
              <p className="text-xs text-zinc-500 mt-4">
                © 2026 PVS UFCG. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}