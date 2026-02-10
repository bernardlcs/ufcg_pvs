'use server'
import { createClient } from "../../utils/supabase/server";

export async function registerCandidate(formData: any) {
  const supabase = await createClient();

  // O Supabase usará a regra "UNIQUE" que criamos no SQL para o CPF
  const { data, error } = await supabase
    .from('inscricoes')
    .insert([formData])
    .select('numero_inscricao') // Pede ao banco para devolver o número gerado
    .single();

  if (error) {
    // Erro 23505 = CPF duplicado no banco de dados
    if (error.code === '23505') {
      return { success: false, message: "Este CPF já possui uma inscrição realizada." };
    }
    return { success: false, message: "Erro ao salvar: " + error.message };
  }

  return { success: true, protocolo: data.numero_inscricao };
}

