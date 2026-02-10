import Link from 'next/link'
import { ClipboardCheck, Info } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl font-black text-zinc-900 mb-4 uppercase tracking-tight">
        Sua vaga na <span className="text-blue-700">UFCG</span> começa aqui.
      </h1>
      <p className="text-zinc-600 text-lg max-w-2xl mb-10">
        O Pré-Vestibular Solidário (PVS) é um projeto de extensão que auxilia alunos da rede pública a ingressarem no ensino superior.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/inscricao" className="flex items-center gap-2 bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all shadow-lg">
          <ClipboardCheck /> Fazer Inscrição
        </Link>
        <Link href="/quem-somos" className="flex items-center gap-2 bg-white border-2 border-zinc-200 text-zinc-700 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-zinc-50 transition-all">
          <Info /> Quem Somos
        </Link>
      </div>
    </main>
  )
}