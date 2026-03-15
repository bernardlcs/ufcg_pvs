// src/app/page.tsx
import Link from 'next/link'
import { ClipboardCheck, Info } from 'lucide-react'
import Image from 'next/image' // Certifique-se de importar Image do next/image

export default function Home() {
  return (
    <main className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      
      {/* 1. SEÇÃO DE IMAGEM DE FUNDO (ESTILO HERO) */}
      <div className="absolute inset-0 -z-10 w-full h-full">
        {/* Usando a imagem que já vejo no seu gerenciador de arquivos */}
        <Image 
          src="/Fachada_UFCG_nova.jpg" // Nome exato do arquivo na sua pasta public
          alt="Fachada da UFCG"
          fill // Faz a imagem ocupar todo o container pai (a main)
          quality={80}
          priority // Carrega a imagem com prioridade, bom para Hero sections
          className="object-cover opacity-40" // Opacidade baixa para manter a legibilidade do texto
        />
        {/* Gradiente para suavizar a transição com o resto da página */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-zinc-50" />
      </div>

      {/* 2. CONTEÚDO CENTRAL (SEU CÓDIGO ORIGINAL REESTRUTURADO) */}
      <div className="max-w-3xl space-y-10 py-16 md:py-24 z-10">
        
        {/* Span da edição (adicionei para contexto, opcional) */}
        <span className="text-blue-700 font-bold tracking-widest uppercase text-sm">
          Portal de Inscrições 2026
        </span>

        {/* Seu Título Principal */}
        <h1 className="text-5xl md:text-7xl font-black text-zinc-900 leading-tight uppercase tracking-tight">
          Sua vaga na <span className="text-blue-700 underline decoration-blue-100">UFCG</span><br />começa aqui.
        </h1>
        
        {/* Sua Descrição */}
        <p className="text-zinc-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          O Pré-Vestibular Solidário (PVS) é um projeto de extensão que auxilia alunos da rede pública a ingressarem no ensino superior.
        </p>

        {/* Seus Botões */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-6">
          <Link href="/encerradas" className="flex items-center gap-2 bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all shadow-2xl shadow-blue-100">
            <ClipboardCheck size={22}/> Fazer Inscrição
          </Link>
          <Link href="/quem_somos" className="flex items-center gap-2 bg-white text-zinc-700 border-2 border-zinc-200 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-zinc-50 transition-all">
            <Info size={22} /> Quem Somos
          </Link>
        </div>
      </div>

      {/* 3. NOVA SEÇÃO DE LOGOS (RODAPÉ DO HERO) */}
      <div className="mt-auto w-full max-w-5xl border-t border-zinc-200 pt-10 pb-12 z-10">
        <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-6">Realização e Apoio</p>
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all">
          {/* Adicione as logos reais aqui. Exemplo com 'logo.webp' que vejo no seu public */}
          { <img src="/logo.webp" alt="PVS Logo" className="h-16 w-auto" /> }
          <img src="/UFCG-Central.png" alt="UFCG Central" className="h-14 w-auto" />
          { /*<img src="/logo-propex.png" alt="PROPEX UFCG" className="h-10 w-auto" /> */}
          {/* <img src="/logo-ufcg.png" alt="Universidade Federal de Campina Grande" className="h-12 w-auto" /> */}
          
          {/* Usei placeholders baseados no que vejo no seu gerenciador de arquivos.
              Descomente as linhas acima e ajuste os caminhos para as logos corretas. */}
        </div>
      </div>
      
    </main>
  )
}