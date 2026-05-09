"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";

type Modulo = {
  id: number;
  titulo: string;
  ordem: number;
};

export default function ModulosCurso() {
  const params = useParams();
  const cursoId = params.id as string;

  const [titulo, setTitulo] = useState("");
  const [ordem, setOrdem] = useState("");
  const [modulos, setModulos] = useState<Modulo[]>([]);

  async function carregarModulos() {
    const { data } = await supabase
      .from("modulos")
      .select("*")
      .eq("curso_id", cursoId)
      .order("ordem", { ascending: true });

    setModulos(data || []);
  }

  async function cadastrarModulo() {
    const { error } = await supabase.from("modulos").insert([
      {
        curso_id: Number(cursoId),
        titulo,
        ordem: Number(ordem),
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    setTitulo("");
    setOrdem("");
    carregarModulos();
  }

  async function excluirModulo(id: number) {
    const confirmar = confirm("Deseja excluir este módulo?");
    if (!confirmar) return;

    await supabase.from("modulos").delete().eq("id", id);
    carregarModulos();
  }

  useEffect(() => {
    carregarModulos();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <a href="/cursos" className="text-yellow-400">
        ← Voltar para cursos
      </a>

      <h1 className="text-4xl font-bold my-8">
        Módulos do Curso
      </h1>

      <div className="bg-slate-900 p-6 rounded-2xl mb-10 space-y-4">
        <input
          type="text"
          placeholder="Título do módulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="w-full p-4 rounded-xl bg-slate-800"
        />

        <input
          type="number"
          placeholder="Ordem do módulo"
          value={ordem}
          onChange={(e) => setOrdem(e.target.value)}
          className="w-full p-4 rounded-xl bg-slate-800"
        />

        <button
          onClick={cadastrarModulo}
          className="bg-blue-600 px-6 py-3 rounded-xl font-bold"
        >
          Cadastrar Módulo
        </button>
      </div>

      <div className="space-y-4">
        {modulos.map((modulo) => (
          <div
            key={modulo.id}
            className="bg-slate-900 p-6 rounded-2xl flex justify-between items-center"
          >
            <div>
              <h2 className="text-2xl font-bold">
                {modulo.ordem}. {modulo.titulo}
              </h2>
            </div>

            <div className="flex gap-3">
              <a
                href={`/cursos/aulas/${modulo.id}`}
                className="bg-yellow-500 text-black px-5 py-2 rounded-lg font-bold"
              >
                Aulas
              </a>

              <button
                onClick={() => excluirModulo(modulo.id)}
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