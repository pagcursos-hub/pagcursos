"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Dashboard() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [cargaHoraria, setCargaHoraria] = useState("");
  const [imagem, setImagem] = useState<File | null>(null);
  const [totalCursos, setTotalCursos] = useState(0);
  useEffect(() => {
  async function buscarCursos() {
    const { data } = await supabase.from("cursos").select("*");

    if (data) {
      setTotalCursos(data.length);
    }
  }

  buscarCursos();
}, []);

  async function cadastrarCurso() {
    if (!imagem) {
      alert("Escolha uma imagem");
      return;
    }

    const nomeArquivo = `${Date.now()}-${imagem.name}`;

    const { error: uploadError } = await supabase.storage
      .from("capas-cursos")
      .upload(nomeArquivo, imagem);

    if (uploadError) {
      alert(uploadError.message);
      return;
    }

    const imagemUrl = `https://zyfkzjhnttjvemfmaodd.supabase.co/storage/v1/object/public/capas-cursos/${nomeArquivo}`;

    const { error: insertError } = await supabase.from("cursos").insert([
      {
        titulo,
        descricao,
        carga_horaria: Number(cargaHoraria),
        imagem_capa: imagemUrl,
        status: "publicado",
      },
    ]);

    if (insertError) {
      alert(insertError.message);
      return;
    }

    alert("Curso cadastrado com sucesso!");
    window.location.reload();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-5xl font-bold mb-10">Dashboard</h1>

      <div className="bg-slate-900 p-6 rounded-2xl mb-10 space-y-4">
        <input
          type="text"
          placeholder="Título do curso"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="w-full p-4 rounded-xl bg-slate-800"
        />

        <textarea
          placeholder="Descrição do curso"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="w-full p-4 rounded-xl bg-slate-800"
        ></textarea>

        <input
          type="number"
          placeholder="Carga horária"
          value={cargaHoraria}
          onChange={(e) => setCargaHoraria(e.target.value)}
          className="w-full p-4 rounded-xl bg-slate-800"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              setImagem(e.target.files[0]);
            }
          }}
          className="w-full p-4 rounded-xl bg-slate-800"
        />

        <button
          onClick={cadastrarCurso}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-bold"
        >
          Cadastrar Curso
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-900 p-6 rounded-2xl">
          <h2 className="text-2xl font-semibold">Cursos</h2>
          <p className="text-5xl font-bold mt-4">{totalCursos}</p>
          <p className="text-slate-300 mt-2">Total de cursos cadastrados.</p>
        </div>

        <div className="bg-green-900 p-6 rounded-2xl">
          <h2 className="text-2xl font-semibold">Alunos</h2>
          <p className="text-slate-300 mt-2">Total de alunos matriculados.</p>
        </div>

        <div className="bg-yellow-700 p-6 rounded-2xl">
          <h2 className="text-2xl font-semibold">Certificados</h2>
          <p className="text-slate-200 mt-2">Certificados emitidos.</p>
        </div>
      </div>
    </main>
  );
}