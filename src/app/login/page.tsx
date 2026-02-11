'use client';
import { useState } from 'react';
// Mudamos de { supabase } para { createClient } para alinhar com seu arquivo de utilitários
import { createClient } from '@/utils/supabase/client'; 
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  // Criamos a instância do cliente dentro do componente
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // O restante da lógica permanece igual, usando a constante supabase definida acima
    const { error } = await supabase.auth.signInWithPassword({ 
      email, 
      password 
    });

    if (error) {
      alert('Erro ao entrar: ' + error.message);
    } else {
      router.push('/adm'); 
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleLogin} className="p-8 border rounded-lg shadow-md bg-white w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Acesso Restrito PVS</h1>
        <input
          type="email"
          placeholder="E-mail"
          className="w-full p-2 mb-4 border rounded text-black"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          className="w-full p-2 mb-6 border rounded text-black"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors">
          Entrar
        </button>
      </form>
    </div>
  );
}