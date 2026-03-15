"use server"

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function atualizarCandidato(id: string, formData: any) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('inscricoes')
    .update({
      nome_completo: formData.nome_completo,
      cpf: formData.cpf,
      rg: formData.rg,
      situacao: formData.situacao
    })
    .eq('id', id);

  if (error) throw new Error(error.message);

  revalidatePath('/consulta_admin'); // Ajuste para o nome da sua página
  return { success: true };
}