"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";

type Aula = {
  id: number;
  titulo: string;
  conteudo: string;
  pdf_url?: string;
  video_url?: string;
  ordem: number;
};

export default function AulasModulo() {
  const params = useParams();
  const moduloId = params.id as string;

  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [ordem, setOrdem] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [pdf, setPdf] = useState<File | null>(null);
  const [aulas, setAulas] = useState<Aula[]>([]);

  async function carregarAulas() {
    const { data } = await supabase
      .from("aulas")
      .select("*")
      .eq("modulo_id", moduloId)
      .order("ordem", { ascending: true });

    setAulas(data || []);
  }

  async function cadastrarAula() {
    let pdfUrl = "";

if (pdf) {
  const nomePdf = `${Date.now()}-${pdf.name}`;

  const { error: uploadPdfError } = await supabase.storage
    .from("pdfs-aulas")
    .upload(nomePdf, pdf);

  if (uploadPdfError) {
    alert(uploadPdfError.message);
    return;
  }

  pdfUrl =
    `https://zyfkzjhnttjvemfmaodd.supabase.co/storage/v1/object/public/pdfs-aulas/${nomePdf}`;
}
    const { error } = await supabase.from("aulas").insert([
      {
        modulo_id: Number(moduloId),
        titulo,
        conteudo,
        pdf_url: pdfUrl,
        ordem: Number(ordem),
        video_url: videoUrl,
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    setTitulo("");
    setConteudo("");
    setOrdem("");
    carregarAulas();
  }

  async function excluirAula(id: number) {
    const confirmar = confirm("Deseja excluir esta aula?");
    if (!confirmar) return;

    await supabase.from("aulas").delete().eq("id", id);
    carregarAulas();
  }

  useEffect(() => {
    carregarAulas();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <a href="/cursos" className="text-yellow-400">
        ← Voltar para cursos
      </a>

      <h1 className="text-4xl font-bold my-8">
        Aulas do Módulo
      </h1>

      <div className="bg-slate-900 p-6 rounded-2xl mb-10 space-y-4">
        <input
          type="text"
          placeholder="Título da aula"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="w-full p-4 rounded-xl bg-slate-800"
        />

        <textarea
          placeholder="Conteúdo da aula"
          value={conteudo}
          onChange={(e) => setConteudo(e.target.value)}
          className="w-full p-4 rounded-xl bg-slate-800"
        ></textarea>

        
<input
  type="text"
  placeholder="Link do vídeo"
  value={videoUrl}
  onChange={(e) => setVideoUrl(e.target.value)}
  className="w-full p-4 rounded-xl bg-slate-800"
/>
 <input
  type="number"
  placeholder="Ordem da aula"
  value={ordem}
  onChange={(e) => setOrdem(e.target.value)}
  className="w-full p-4 rounded-xl bg-slate-800"
/>

<input
  type="file"
  accept=".pdf"
  onChange={(e) => {
    if (e.target.files?.[0]) {
      setPdf(e.target.files[0]);
    }
  }}
  className="w-full p-4 rounded-xl bg-slate-800"
/>

        <button
          onClick={cadastrarAula}
          className="bg-blue-600 px-6 py-3 rounded-xl font-bold"
        >
          Cadastrar Aula
        </button>
      </div>

      <div className="space-y-4">
        {aulas.map((aula) => (
          <div
            key={aula.id}
            className="bg-slate-900 p-6 rounded-2xl"
          >
            <h2 className="text-2xl font-bold">
              {aula.ordem}. {aula.titulo}
            </h2>

            <p className="text-slate-300 mt-3">
              {aula.conteudo}
            </p>

{aula.video_url && (
  <iframe
    src={aula.video_url}
    className="w-full h-[400px] rounded-xl mt-5"
    allowFullScreen
  />
)}
            <button
              onClick={() => excluirAula(aula.id)}
              className="bg-red-600 px-5 py-2 rounded-lg mt-5"
            >
              Excluir Aula
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}