"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Curso = {
  id: number;
  titulo: string;
  descricao: string;
  carga_horaria: number;
  status: string;
  imagem_capa: string;
};

export default function Cursos() {
  const [cursos, setCursos] = useState<Curso[]>([]);

  async function carregarCursos() {
    const { data } = await supabase.from("cursos").select("*");
    setCursos(data || []);
  }

  async function excluirCurso(id: number) {
    const confirmar = confirm("Tem certeza que deseja excluir este curso?");

    if (!confirmar) return;

    await supabase.from("cursos").delete().eq("id", id);

    carregarCursos();
  }

  useEffect(() => {
    carregarCursos();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Cursos cadastrados</h1>

        <a
          href="/cursos/novo"
          className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-bold"
        >
          Novo Curso
        </a>
      </div>

      <div className="space-y-4">
  {cursos.map((curso) => (
    <div key={curso.id} className="bg-zinc-900 p-6 rounded-2xl">

      {curso.imagem_capa && (
        <img
          src={curso.imagem_capa}
          alt={curso.titulo}
          className="w-full max-h-[500px] object-contain rounded-xl mb-4 bg-black"
        />
      )}

      <h2 className="text-2xl font-bold">{curso.titulo}</h2>

            <p className="text-zinc-400 mt-2">{curso.descricao}</p>

            <p className="mt-4 text-yellow-400">
              {curso.carga_horaria} horas
            </p>

            <div className="flex gap-3 mt-5">
              <a
                href={`/cursos/editar/${curso.id}`}
                className="bg-blue-600 px-5 py-2 rounded-lg"
              >
                Editar
              </a>

<a
  href={`/cursos/modulos/${curso.id}`}
  className="bg-yellow-500 text-black px-5 py-2 rounded-lg font-bold"
>
  Módulos
</a>

              <button
                onClick={() => excluirCurso(curso.id)}
                className="bg-red-600 px-5 py-2 rounded-lg"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}