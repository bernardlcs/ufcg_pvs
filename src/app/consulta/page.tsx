'use client';
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function ConsultaCandidato() {
  const [cpf, setCpf] = useState('');
  const [candidato, setCandidato] = useState<any>(null);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const supabase = createClient();

  const buscarCandidato = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    setErro('');
    setCandidato(null);

    // Remove tudo que não for número para padronizar a busca
    const cpfLimpo = cpf.replace(/\D/g, '');

    // Tentativa 1: Busca pelo CPF exatamente como digitado ou limpo
    // Usamos uma lista de filtros para garantir que ele encontre o dado
    const { data, error } = await supabase
      .from('inscricoes')
      .select('nome_completo, numero_inscricao')
      .or(`cpf.eq.${cpfLimpo},cpf.eq.${cpf.trim()}`)
      .maybeSingle();

    if (error) {
      console.error('Erro na query:', error);
      setErro('Erro técnico: Verifique se a coluna se chama "cpf" no banco.');
    } else if (!data) {
      setErro('Candidato não encontrado. Verifique se o CPF está correto.');
    } else {
      setCandidato(data);
    }
    setCarregando(false);
  };

  return (
    <main className="max-w-md mx-auto py-20 px-6 text-black">
      <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center uppercase">Consultar Inscrição</h1>
      
      <form onSubmit={buscarCandidato} className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Digite seu CPF:</label>
          <input
            type="text"
            placeholder="000.000.000-00"
            className="w-full p-3 border rounded-lg text-black focus:ring-2 focus:ring-blue-500 outline-none"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          disabled={carregando}
          className="w-full bg-blue-700 text-white p-3 rounded-lg font-bold hover:bg-blue-800 transition-colors disabled:bg-gray-400"
        >
          {carregando ? 'Buscando...' : 'Consultar'}
        </button>
      </form>

      {erro && <p className="text-red-600 bg-red-50 p-4 rounded-lg text-center font-medium">{erro}</p>}

      {candidato && (
        <div className="bg-green-50 border border-green-200 p-6 rounded-xl shadow-sm text-black">
          <h2 className="text-green-800 font-bold mb-2">Inscrição Localizada!</h2>
          <p><strong>Nome:</strong> {candidato.nome_completo}</p>
          <p><strong>Número de Inscrição:</strong> {candidato.numero_inscricao}</p>
        </div>
      )}
    </main>
  );
}