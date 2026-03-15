// actions/sorteio.ts
"use server" // Não esqueça desta linha no topo!
import { createClient } from '@/utils/supabase/server'; // Use o client do SERVER

export async function marcarComoSorteado(id: string, novaOrdem: number) {
  const supabase = await createClient(); // Se for Next.js 14/15, precisa de await

  const { data, error } = await supabase
    .from('inscricoes')
    .update({ 
      sorteado: true, 
      ordem_sorteio: novaOrdem 
    })
    .eq('id', id)
    .select(); // O .select() ajuda a confirmar se algo mudou

  if (error) {
    console.error("Erro no Supabase:", error.message);
    throw new Error(error.message);
  }

  return data;
}