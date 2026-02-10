// src/app/actions/sorteio.ts
'use server' // OBRIGATÓRIO para o Next.js reconhecer a função

import { createClient } from '@/utils/supabase/server';

export async function marcarComoSorteado(id: string, ordem: number) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from('inscricoes')
    .update({ sorteado: true, ordem_sorteio: ordem })
    .eq('id', id);

  if (error) {
    console.error("Erro no banco:", error.message);
    throw new Error("Erro ao salvar sorteio");
  }
  
  return { success: true };
}