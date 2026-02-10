"use client"
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client'; // Use o client para interatividade
import { Trophy, UserCheck, RefreshCw } from 'lucide-react';
import { marcarComoSorteado } from '../actions/sorteio';

export default function SorteioPage() {
  const [candidatos, setCandidatos] = useState<any[]>([]);
  const [sorteados, setSorteados] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  // Carrega candidatos ao iniciar
  useEffect(() => {
    async function fetchCandidatos() {
      const { data } = await supabase.from('inscricoes').select('*');
      if (data) setCandidatos(data);
      setLoading(false);
    }
    fetchCandidatos();
  }, []);

  const realizarSorteio = async () => {
     // 1. Filtra apenas quem ainda não foi sorteado localmente
  const disponiveis = candidatos.filter(c => !c.sorteado);
  
  if (disponiveis.length === 0) return alert("Todos já foram sorteados!");

  const ganhador = disponiveis[Math.floor(Math.random() * disponiveis.length)];
  const novaOrdem = sorteados.length + 1;

  try {
    // 2. Salva no Supabase através da sua Action
    await marcarComoSorteado(ganhador.id, novaOrdem);

    // 3. ATUALIZAÇÃO CRUCIAL: Marcar como sorteado na lista local para o contador mudar
    const candidatosAtualizados = candidatos.map(c => 
      c.id === ganhador.id ? { ...c, sorteado: true, ordem_sorteio: novaOrdem } : c
    );
    
    setCandidatos(candidatosAtualizados);
    setSorteados([{ ...ganhador, ordem_sorteio: novaOrdem }, ...sorteados]);

  } catch (error) {
    alert("Erro ao salvar sorteio no banco.");
  }
};

  return (
    <main className="max-w-4xl mx-auto py-12 px-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-black text-zinc-900 uppercase">Sorteio PVS 2026</h1>
        <p className="text-zinc-500">Sorteio aleatório baseado no número de inscrição</p>
      </div>

      <div className="flex justify-center mb-12">
        <button 
          onClick={realizarSorteio}
          disabled={loading}
          className="bg-blue-700 text-white px-10 py-5 rounded-2xl font-black text-2xl hover:scale-105 transition-all shadow-2xl flex items-center gap-3 active:scale-95 disabled:opacity-50"
        >
          <Trophy /> SORTEAR PRÓXIMO
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Lista de Ganhadores */}
        <div className="bg-white border-2 border-blue-100 rounded-3xl p-6 shadow-sm">
          <h2 className="font-bold text-blue-800 mb-4 flex items-center gap-2">
            <UserCheck size={20}/> Lista de Sorteados
          </h2>
          <div className="space-y-3">
            {sorteados.map((s, index) => (
              <div key={s.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-xl border border-blue-200 animate-in fade-in slide-in-from-left">
                <div>
                  <span className="text-xs font-bold text-blue-400 block tracking-widest uppercase">Ordem: {sorteados.length - index}º</span>
                  <span className="font-bold text-zinc-800 uppercase">{s.nome_completo}</span>
                </div>
                <div className="text-right">
                  <span className="block text-2xl font-black text-blue-700">#{s.numero_inscricao}</span>
                </div>
              </div>
            ))}
            {sorteados.length === 0 && <p className="text-zinc-400 text-sm italic">Nenhum sorteio realizado ainda.</p>}
          </div>
        </div>

        {/* Informações Gerais */}
        <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-6">
          <h2 className="font-bold text-zinc-800 mb-4">Estatísticas</h2>
          <div className="space-y-4">
            <div className="flex justify-between border-b pb-2">
              <span className="text-zinc-500">Total de Candidatos:</span>
              <span className="font-bold">{candidatos.length}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-zinc-500">Já Sorteados:</span>
              <span className="font-bold text-blue-600">{sorteados.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Restantes:</span>
              <span className="font-bold">{candidatos.length - sorteados.length}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}