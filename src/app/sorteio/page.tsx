"use client"
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client'; 
import { Trophy, UserCheck } from 'lucide-react';
import { marcarComoSorteado } from '../actions/sorteio';

export default function SorteioPage() {
  const [candidatos, setCandidatos] = useState<any[]>([]);
  const [sorteados, setSorteados] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  // 1. CARREGAMENTO INICIAL (PERSISTÊNCIA AO ATUALIZAR)
  useEffect(() => {
    async function fetchCandidatos() {
      const { data, error } = await supabase
        .from('inscricoes')
        .select('*')
        .order('ordem_sorteio', { ascending: false });

      if (data) {
        setCandidatos(data);
        
        // Filtra quem JÁ ESTÁ marcado como true no banco de dados
        const jaSorteados = data
          .filter(c => c.sorteado === true)
          .sort((a, b) => b.ordem_sorteio - a.ordem_sorteio); // Mais recentes no topo
        
        setSorteados(jaSorteados);
      }
      setLoading(false);
    }
    fetchCandidatos();
  }, []);

  // 2. LÓGICA DO SORTEIO COM PERSISTÊNCIA
  const realizarSorteio = async () => {
    // Filtra apenas quem é false (não sorteado)
    const disponiveis = candidatos.filter(c => c.sorteado === false || c.sorteado === null);
    
    if (disponiveis.length === 0) return alert("Todos já foram sorteados!");

    const ganhador = disponiveis[Math.floor(Math.random() * disponiveis.length)];
    
    // A nova ordem é o total de sorteados atuais + 1
    const novaOrdem = sorteados.length + 1;

    try {
      setLoading(true);

      // A. SALVA NO BANCO (Persistência Real)
      await marcarComoSorteado(ganhador.id, novaOrdem);

      // B. ATUALIZA ESTADO LOCAL (Interface)
      const ganhadorAtualizado = { ...ganhador, sorteado: true, ordem_sorteio: novaOrdem };

      // Atualiza a lista completa de candidatos para o contador de "Restantes" diminuir
      setCandidatos(prev => prev.map(c => 
        c.id === ganhador.id ? ganhadorAtualizado : c
      ));

      // Adiciona o novo ganhador ao topo da lista visual
      setSorteados(prev => [ganhadorAtualizado, ...prev]);

    } catch (error) {
      console.error("Erro no sorteio:", error);
      alert("Erro ao salvar sorteio no banco de dados.");
    } finally {
      setLoading(false);
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
          <Trophy /> {loading ? "SALVANDO..." : "SORTEAR PRÓXIMO"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Lista de Ganhadores */}
        <div className="bg-white border-2 border-blue-100 rounded-3xl p-6 shadow-sm">
          <h2 className="font-bold text-blue-800 mb-4 flex items-center gap-2">
            <UserCheck size={20}/> Lista de Sorteados ({sorteados.length})
          </h2>
          <div className="space-y-3">
            {sorteados.map((s) => (
              <div key={s.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-xl border border-blue-200 animate-in fade-in slide-in-from-left">
                <div>
                  <span className="text-xs font-bold text-blue-400 block tracking-widest uppercase">
                    Ordem: {s.ordem_sorteio}º
                  </span>
                  <span className="font-bold text-zinc-800 uppercase">{s.nome_completo}</span>
                </div>
                <div className="text-right">
                  <span className="block text-2xl font-black text-blue-700">#{s.numero_inscricao}</span>
                </div>
              </div>
            ))}
            {sorteados.length === 0 && !loading && (
              <p className="text-zinc-400 text-sm italic">Nenhum sorteio realizado ainda.</p>
            )}
          </div>
        </div>

        {/* Estatísticas */}
        <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-6 h-fit">
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
              <span className="font-bold text-orange-600">{candidatos.length - sorteados.length}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}