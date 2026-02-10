// src/app/adm/page.tsx
import { createClient } from '@/utils/supabase/server'; // Ajuste o caminho conforme seu projeto
import { Users, Hash, Calendar, IdCard } from 'lucide-react';

export default async function AdminPage() {
  const supabase = await createClient();

  // Busca todos os inscritos ordenados pelo número de inscrição
  const { data: inscritos, error } = await supabase
    .from('inscricoes')
    .select('*')
    .order('numero_inscricao', { ascending: true });

  if (error) {
    return <div className="p-10 text-red-500">Erro ao carregar candidatos: {error.message}</div>;
  }

  return (
    <main className="max-w-7xl mx-auto py-10 px-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-zinc-900 uppercase">Painel Administrativo</h1>
          <p className="text-zinc-500">Lista oficial de candidatos inscritos - PVS 2026</p>
        </div>
        <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-bold flex items-center gap-2">
          <Users size={20} />
          {inscritos?.length} Total de Inscritos
        </div>
      </div>

      <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-zinc-50 border-b border-zinc-200">
            <tr>
              <th className="p-4 text-xs font-bold text-zinc-400 uppercase"><div className="flex items-center gap-1"><Hash size={14}/> Nº</div></th>
              <th className="p-4 text-xs font-bold text-zinc-400 uppercase">Nome Completo</th>
              <th className="p-4 text-xs font-bold text-zinc-400 uppercase"><div className="flex items-center gap-1"><IdCard size={14}/> CPF</div></th>
              <th className="p-4 text-xs font-bold text-zinc-400 uppercase">E-mail</th>
              <th className="p-4 text-xs font-bold text-zinc-400 uppercase">Cidade</th>
              <th className="p-4 text-xs font-bold text-zinc-400 uppercase text-center">Escola Pública</th>
              <th className="p-4 text-xs font-bold text-zinc-400 uppercase text-center">Sorteado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {inscritos?.map((candidato) => (
              <tr key={candidato.id} className="hover:bg-blue-50/50 transition-colors">
                <td className="p-4 font-mono text-blue-600 font-bold">#{candidato.numero_inscricao}</td>
                <td className="p-4 font-semibold text-zinc-800">{candidato.nome_completo}</td>
                <td className="p-4 text-zinc-600">{candidato.cpf}</td>
                <td className="p-4 text-zinc-600">{candidato.email}</td>
                <td className="p-4 text-zinc-600">{candidato.municipio}</td>
                <td className="p-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    candidato.escola_publica ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {candidato.escola_publica ? 'Sim' : 'Não'}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    candidato.sorteado ? 'bg-blue-100 text-blue-700' : 'bg-zinc-100 text-zinc-500'
                  }`}>
                    {candidato.sorteado ? 'Sim' : 'Não'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}