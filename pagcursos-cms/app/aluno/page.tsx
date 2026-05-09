"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Curso = {
  id: number;
  titulo: string;
  descricao: string;
  carga_horaria: number;
  imagem_capa: string;
};

export default function AreaAluno() {
  const [cursos, setCursos] = useState<Curso[]>([]);

  async function carregarCursos() {
    const { data: usuario } = await supabase.auth.getUser();

    if (!usuario.user) {
      window.location.href = "/login";
      return;
    }

    const { data: matriculas } = await supabase
      .from("matriculas")
      .select("curso_id")
      .eq("aluno_id", usuario.user.id);

    if (!matriculas || matriculas.length === 0) {
      setCursos([]);
      return;
    }

    const ids = matriculas.map((m) => m.curso_id);

    const { data: cursosData } = await supabase
      .from("cursos")
      .select("*")
      .in("id", ids);

    setCursos(cursosData || []);
  }

  async function sair() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  useEffect(() => {
    carregarCursos();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-5xl font-bold text-yellow-400">
          Área do Aluno
        </h1>

        <button
          onClick={sair}
          className="bg-red-600 px-5 py-3 rounded-xl font-bold"
        >
          Sair
        </button>
      </div>

      {cursos.length === 0 ? (
        <p className="text-slate-300">
          Você ainda não possui cursos matriculados.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cursos.map((curso) => (
            <div
              key={curso.id}
              className="bg-slate-900 rounded-2xl overflow-hidden"
            >
              {curso.imagem_capa && (
                <img
                  src={curso.imagem_capa}
                  alt={curso.titulo}
                  className="w-full h-60 object-cover"
                />
              )}

              <div className="p-6">
                <h2 className="text-2xl font-bold mb-3">
                  {curso.titulo}
                </h2>

                <p className="text-slate-300 mb-5">
                  {curso.descricao}
                </p>

                <p className="text-yellow-400 font-bold mb-5">
                  {curso.carga_horaria} horas
                </p>

                <a
                  href={`/aluno/curso/${curso.id}`}
                  className="block text-center bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 rounded-xl"
                >
                  Acessar Curso
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}