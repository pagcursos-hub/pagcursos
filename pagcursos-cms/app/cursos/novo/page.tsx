"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function NovoCurso() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [cargaHoraria, setCargaHoraria] = useState("");

  async function salvarCurso() {
    await supabase.from("cursos").insert({
      titulo,
      descricao,
      carga_horaria: Number(cargaHoraria),
      status: "publicado",
    });

    window.location.href = "/cursos";
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Novo Curso</h1>

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
          onClick={salvarCurso}
          className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-bold"
        >
          Salvar Curso
        </button>
      </div>
    </main>
  );
}