'use client'

import { useState } from 'react'
import { registerCandidate } from '../actions/subscribe'
import { User, Home as HomeIcon, GraduationCap, Wallet, ShieldCheck, AlertCircle } from 'lucide-react'

// O nome do componente deve ser único e exportado corretamente
export default function PVSForm2026() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setMessage({ type: '', text: '' })

    const rawData = Object.fromEntries(formData.entries())
    
    // Converte os dados para o formato esperado pela sua tabela SQL
    const dataToSave = {
      ...rawData,
      escola_publica: rawData.escola_publica === 'Sim',
      bolsista_integral: rawData.bolsista_integral === 'Sim',
      pcd: rawData.pcd === 'Sim',
      numero_moradores: parseInt(rawData.numero_moradores as string) || 1,
    }

    const result = await registerCandidate(dataToSave)

    if (result.success) {
      setMessage({ type: 'success', text: 'Inscrição realizada com sucesso!' })
      ;(document.getElementById('pvs-form') as HTMLFormElement).reset()
      window.scrollTo({ top: 0, behavior: 'smooth' })
      alert(`Inscrição realizada com sucesso! Guarde seu protocolo: #${result.protocolo}`);
    } else {
      setMessage({ type: 'error', text: result.message })
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-zinc-50 py-10 px-4">
      <main className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden border border-zinc-200">
        
        {/* Cabeçalho Institucional conforme PDF */}
        <div className="bg-blue-700 p-8 text-white text-center">
          <p className="text-xs font-bold uppercase tracking-widest opacity-70">UFCG - PROPEX</p>
          <h1 className="text-2xl font-black mt-1 uppercase">Pré-Vestibular Solidário 2026</h1>
          <p className="text-sm mt-2 font-medium italic">Formulário de Inscrição Oficial</p>
        </div>

        {/* Mensagens de Erro ou Sucesso */}
        {message.text && (
          <div className={`m-6 p-4 rounded-xl flex items-center gap-3 border ${
            message.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'
          }`}>
            {message.type === 'success' ? <ShieldCheck size={20} /> : <AlertCircle size={20} />}
            <span className="font-semibold">{message.text}</span>
          </div>
        )}

        <form id="pvs-form" action={handleSubmit} className="p-8 space-y-10">
          
          {/* 1. Informações Pessoais */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-blue-700 font-bold uppercase text-sm border-b pb-2">
              <User size={18} /> Dados do Candidato
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-zinc-400 uppercase">Nome Completo</label>
                <input name="nome_completo" required className="p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-zinc-400 uppercase">Data de Nascimento</label>
                {/* Melhoria na entrada de data: Calendário nativo */}
                <input name="data_nascimento" type="date" required className="p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer" />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-zinc-400 uppercase">Gênero</label>
                <select name="genero" required className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                  <option value="">Selecione...</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                  <option value="Não Declarar">Não Declarar</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-zinc-400 uppercase">CPF</label>
                <input name="cpf" required maxLength={11} placeholder="Apenas números" className="p-3 border rounded-xl focus:ring-2 focus:ring-blue-500" />
              </div>

              <input name="rg" placeholder="RG" required className="p-3 border rounded-xl" />
              <input name="email" type="email" placeholder="E-mail" required className="p-3 border rounded-xl" />
              <input name="celular_whats" placeholder="Celular (WhatsApp)" required className="p-3 border rounded-xl" />
              <input name="disciplina_dificuldade" placeholder="Disciplina de Maior Dificuldade" className="p-3 border rounded-xl" />
            </div>
          </section>

          {/* 2. Endereço */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-blue-700 font-bold uppercase text-sm border-b pb-2">
              <HomeIcon size={18} /> Endereço
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input name="endereco" placeholder="Endereço Completo" className="p-3 border rounded-xl md:col-span-2" />
              <input name="bairro" placeholder="Bairro" className="p-3 border rounded-xl" />
              <input name="municipio" placeholder="Município" className="p-3 border rounded-xl" />
              <input name="estado" placeholder="Estado" className="p-3 border rounded-xl" />
              <select name="lingua_estrangeira" required className="p-3 border rounded-xl bg-white">
                <option value="">Língua Estrangeira</option>
                <option value="Inglês">Inglês</option>
                <option value="Espanhol">Espanhol</option>
              </select>
            </div>
          </section>

          {/* 3. Escolaridade e Socioeconômico */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-blue-700 font-bold uppercase text-sm border-b pb-2">
              <GraduationCap size={18} /> Escolaridade e Perfil
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-zinc-50 p-6 rounded-2xl">
              <div className="space-y-2">
                <p className="text-sm font-bold">Concluiu em Escola Pública?</p>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2"><input type="radio" name="escola_publica" value="Sim" required /> Sim</label>
                  <label className="flex items-center gap-2"><input type="radio" name="escola_publica" value="Não" /> Não</label>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-bold">É Bolsista Integral?</p>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2"><input type="radio" name="bolsista_integral" value="Sim" /> Sim</label>
                  <label className="flex items-center gap-2"><input type="radio" name="bolsista_integral" value="Não" defaultChecked /> Não</label>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-zinc-400">Moradores na casa</label>
                <select name="numero_moradores" className="p-3 border rounded-xl bg-white">
                  {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n === 5 ? '5 ou mais' : n}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-zinc-400">Renda Familiar</label>
                <select name="renda_familiar" required className="p-3 border rounded-xl bg-white">
                  <option value="">Selecione...</option>
                  <option value="Até 1 salário">Até 1 salário-mínimo</option>
                  <option value="Entre 1 e 2">Entre 1 e 2 salários-mínimos</option>
                  <option value="Acima de 2">Acima de 2 salários-mínimos</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-zinc-400">Renda Per Capita</label>
                <select name="renda_per_capita" required className="p-3 border rounded-xl bg-white">
                   <option value="Até 1 salário">Até 1 salário-mínimo</option>
                   <option value="Acima de 1 salário">Acima de 1 salário-mínimo</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-zinc-400">Como se autodeclara?</label>
                <select name="etnia" required className="p-3 border rounded-xl bg-white">
                  <option value="Negro">Negro (a) (Preto)</option>
                  <option value="Pardo">Pardo</option>
                  <option value="Indígena">Indígena</option>
                  <option value="Quilombola">Quilombola</option>
                  <option value="Branco">Branco (a)</option>
                </select>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-bold">É Pessoa com Deficiência (PCD)?</p>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2"><input type="radio" name="pcd" value="Sim" /> Sim</label>
                  <label className="flex items-center gap-2"><input type="radio" name="pcd" value="Não" defaultChecked /> Não</label>
                </div>
              </div>
              <input name="pcd_qual" placeholder="Se Sim, qual deficiência?" className="p-3 border rounded-xl" />
            </div>
          </section>

          {/* Declaração de Veracidade conforme PDF */}
          <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl">
            <label className="flex gap-3 cursor-pointer">
              <input type="checkbox" required className="mt-1 h-5 w-5 rounded" />
              <span className="text-sm text-zinc-700 leading-relaxed">
                Declaro que as informações prestadas são verdadeiras e estou ciente de que precisarei apresentar documentos comprobatórios. 
              </span>
            </label>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-black py-4 rounded-2xl shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 uppercase tracking-widest"
          >
            {loading ? 'Processando Inscrição...' : 'Finalizar Inscrição'}
          </button>
        </form>
      </main>
    </div>
  )
}