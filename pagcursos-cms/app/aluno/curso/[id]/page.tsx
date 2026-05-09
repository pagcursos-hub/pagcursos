"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";

type Aula = {
  id: number;
  titulo: string;
  conteudo: string;
  pdf_url: string;
  ordem: number;
};

type Modulo = {
  id: number;
  titulo: string;
  ordem: number;
  aulas?: Aula[];
};

type Curso = {
  id: number;
  titulo: string;
  descricao: string;
};

export default function CursoAluno() {
  const params = useParams();
  const cursoId = params.id as string;

  const [curso, setCurso] = useState<Curso | null>(null);
  const [modulos, setModulos] = useState<Modulo[]>([]);

  async function carregarCurso() {
    const { data: cursoData } = await supabase
      .from("cursos")
      .select("*")
      .eq("id", cursoId)
      .single();

    setCurso(cursoData);

    const { data: modulosData } = await supabase
      .from("modulos")
      .select("*")
      .eq("curso_id", cursoId)
      .order("ordem", { ascending: true });

    if (!modulosData) return;

    const modulosComAulas = await Promise.all(
      modulosData.map(async (modulo) => {
        const { data: aulasData } = await supabase
          .from("aulas")
          .select("*")
          .eq("modulo_id", modulo.id)
          .order("ordem", { ascending: true });

        return {
          ...modulo,
          aulas: aulasData || [],
        };
      })
    );

    setModulos(modulosComAulas);
  }

  useEffect(() => {
    carregarCurso();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <a href="/aluno" className="text-yellow-400">
        ← Voltar para Área do Aluno
      </a>

      <h1 className="text-4xl font-bold mt-8 mb-3">
        {curso?.titulo}
      </h1>

      <p className="text-slate-300 mb-10">
        {curso?.descricao}
      </p>

      <div className="space-y-6">
        {modulos.map((modulo) => (
          <div key={modulo.id} className="bg-slate-900 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">
              Módulo {modulo.ordem}: {modulo.titulo}
            </h2>

<a
  href={`/certificado/${cursoId}`}
  className="inline-block mt-10 bg-green-500 text-black px-8 py-4 rounded-xl font-bold"
>
  Gerar Certificado
</a>

            <div className="space-y-4">
              {modulo.aulas?.map((aula) => (
                <div key={aula.id} className="bg-slate-800 p-5 rounded-xl">
                  <h3 className="text-xl font-bold">
                    Aula {aula.ordem}: {aula.titulo}
                  </h3>

                  <p className="text-slate-300 mt-3 whitespace-pre-line">
                    {aula.conteudo}
                  </p>

                  {aula.pdf_url && (
                    <a
                      href={aula.pdf_url}
                      target="_blank"
                      className="inline-block mt-4 bg-yellow-500 text-black px-5 py-2 rounded-lg font-bold"
                    >
                      Baixar PDF
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}