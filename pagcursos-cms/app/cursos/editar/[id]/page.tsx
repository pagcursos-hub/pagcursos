"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams, useRouter } from "next/navigation";

export default function EditarCurso() {
  const params = useParams();
  const router = useRouter();

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [cargaHoraria, setCargaHoraria] = useState("");

  async function carregarCurso() {
    const { data } = await supabase
      .from("cursos")
      .select("*")
      .eq("id", params.id)
      .single();

    if (data) {
      setTitulo(data.titulo);
      setDescricao(data.descricao);
      setCargaHoraria(String(data.carga_horaria));
    }
  }

  async function atualizarCurso() {
    await supabase
      .from("cursos")
      .update({
        titulo,
        descricao,
        carga_horaria: Number(cargaHoraria),
      })
      .eq("id", params.id);

    router.push("/cursos");
  }

  useEffect(() => {
    carregarCurso();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8">
        Editar Curso
      </h1>

      <div className="max-w-xl space-y-4">

        <input
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-700"
          placeholder="Título do curso"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <textarea
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-700"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

        <input
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-700"
          placeholder="Carga horária"
          value={cargaHoraria}
          onChange={(e) => setCargaHoraria(e.target.value)}
        />

        <button
          onClick={atualizarCurso}
          className="bg-blue-600 px-6 py-3 rounded-xl font-bold"
        >
          Atualizar Curso
        </button>

      </div>
    </main>
  );
}