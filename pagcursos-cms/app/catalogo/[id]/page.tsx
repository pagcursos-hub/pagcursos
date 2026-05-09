"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";

type Curso = {
  id: number;
  titulo: string;
  descricao: string;
  carga_horaria: number;
  imagem_capa: string;
};

export default function CursoDetalhe() {
  const params = useParams();
  const cursoId = params.id as string;

  const [curso, setCurso] = useState<Curso | null>(null);

  async function carregarCurso() {
    const { data } = await supabase
      .from("cursos")
      .select("*")
      .eq("id", cursoId)
      .single();

    setCurso(data);
  }

  async function matricular() {
    const { data: usuario } = await supabase.auth.getUser();

    if (!usuario.user) {
      alert("Faça login para se matricular.");
      window.location.href = "/login";
      return;
    }

    const { error } = await supabase.from("matriculas").insert([
      {
        aluno_id: usuario.user.id,
        curso_id: Number(cursoId),
        status: "ativo",
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Matrícula realizada com sucesso!");
    window.location.href = "/aluno";
  }

  useEffect(() => {
    carregarCurso();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <a href="/catalogo" className="text-yellow-400">
          ← Voltar ao catálogo
        </a>

        <div className="mt-8 bg-slate-900 rounded-2xl overflow-hidden border border-slate-800">
          {curso?.imagem_capa && (
            <img
              src={curso.imagem_capa}
              alt={curso.titulo}
              className="w-full max-h-[500px] object-contain bg-black"
            />
          )}

          <div className="p-8">
            <h1 className="text-4xl font-bold mb-4">
              {curso?.titulo}
            </h1>

            <p className="text-slate-300 mb-6">
              {curso?.descricao}
            </p>

            <p className="text-yellow-400 text-xl font-semibold mb-8">
              {curso?.carga_horaria} horas complementares
            </p>

            <button
              onClick={matricular}
              className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-xl font-bold"
            >
              Matricular-se
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}