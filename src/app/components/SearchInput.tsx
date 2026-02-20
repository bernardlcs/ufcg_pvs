'use client';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { useTransition } from 'react';

export default function SearchInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    
    // startTransition evita que a UI trave enquanto a URL atualiza
    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <input
        className="peer block w-full rounded-xl border border-zinc-200 py-3 pl-10 text-sm outline-none focus:border-blue-500 transition-all text-black"
        placeholder="Pesquisar por nome ou CPF..."
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <Search className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-400 peer-focus:text-blue-500" />
      {isPending && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400">
          Carregando...
        </div>
      )}
    </div>
  );
}