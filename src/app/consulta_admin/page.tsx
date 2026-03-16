"use client"
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Search, Save, UserPen, Hash } from 'lucide-react';
import { atualizarCandidato } from '../actions/candidatos';

export default function ConsultaAdminPage() {
  const [busca, setBusca] = useState('');
  const [resultados, setResultados] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleBuscar = async () => {
    if (!busca) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('inscricoes')
      .select('*')
      .ilike('nome_completo', `%${busca}%`) // Busca parcial e case-insensitive
      .limit(10);

    if (data) setResultados(data);
    setLoading(false);
  };

  const handleSalvar = async (id: string, dados: any) => {
    try {
      await atualizarCandidato(id, dados);
      alert("Candidato atualizado com sucesso!");
    } catch (error) {
      alert("Erro ao atualizar.");
    }
  };

  return (
    <main className="max-w-5xl mx-auto py-12 px-6">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-black text-zinc-900 uppercase">Gerenciamento de Candidatos</h1>
        <p className="text-zinc-500">Busque por nome para editar informações cadastrais</p>
      </div>

      {/* Barra de Busca */}
      <div className="flex gap-2 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
          <input 
            type="text"
            placeholder="Digite o nome do candidato..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-blue-500 outline-none"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleBuscar()}
          />
        </div>
        <button 
          onClick={handleBuscar}
          className="bg-blue-700 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-800 transition-all"
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>

      {/* Lista de Resultados */}
      <div className="space-y-6">
        {resultados.map((c) => (
          <div key={c.id} className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-100">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-700">
                  <UserPen size={24} />
                </div>
                <div>
                  <h2 className="font-bold text-zinc-800 uppercase">{c.nome_completo}</h2>
                  <span className="text-xs font-mono text-zinc-500 flex items-center gap-1">
                    <Hash size={12}/> Inscrição: {c.numero_inscricao}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => handleSalvar(c.id, c)}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-700 transition-colors"
              >
                <Save size={18} /> Salvar Alterações
              </button>
            </div>

            {/* Grid de Edição */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">Nome Completo</label>
                <input 
                  className="w-full p-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm"
                  value={c.nome_completo}
                  onChange={(e) => {
                    const newResultados = resultados.map(item => item.id === c.id ? {...item, nome_completo: e.target.value} : item);
                    setResultados(newResultados);
                  }}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">CPF</label>
                <input 
                  className="w-full p-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm"
                  value={c.cpf}
                  onChange={(e) => {
                    const newResultados = resultados.map(item => item.id === c.id ? {...item, cpf: e.target.value} : item);
                    setResultados(newResultados);
                  }}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">RG</label>
                <input 
                  className="w-full p-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm"
                  value={c.rg}
                  onChange={(e) => {
                    const newResultados = resultados.map(item => item.id === c.id ? {...item, rg: e.target.value} : item);
                    setResultados(newResultados);
                  }}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">Sorteado</label>
                <input 
                  className="w-full p-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm"
                  value={c.sorteado}
                  onChange={(e) => {
                    const newResultados = resultados.map(item => item.id === c.id ? {...item, sorteado: e.target.value} : item);
                    setResultados(newResultados);
                  }}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">Situação</label>
                <select 
                  className="w-full p-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm"
                  value={c.situacao}
                  onChange={(e) => {
                    const newResultados = resultados.map(item => item.id === c.id ? {...item, situacao: e.target.value} : item);
                    setResultados(newResultados);
                  }}
                >
                  <option value="DEFERIDA">DEFERIDA</option>
                  <option value="INDEFERIDA">INDEFERIDA</option>
                  <option value="PENDENTE">PENDENTE</option>
                </select>
              </div>
            </div>
          </div>
        ))}

        {resultados.length === 0 && !loading && busca && (
          <p className="text-center text-zinc-400 py-10">Nenhum candidato encontrado com este nome.</p>
        )}
      </div>
    </main>
  );
}