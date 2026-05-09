"use client";

import { jsPDF } from "jspdf";
import { useParams } from "next/navigation";

export default function Certificado() {
  const params = useParams();

  function gerarCertificado() {
    const doc = new jsPDF("landscape");

    doc.setFontSize(30);

    doc.text("CERTIFICADO", 105, 40, {
      align: "center",
    });

    doc.setFontSize(18);

    doc.text(
      "Certificamos que o aluno concluiu o curso com sucesso.",
      105,
      80,
      { align: "center" }
    );

    doc.text(
      `Curso ID: ${params.id}`,
      105,
      110,
      { align: "center" }
    );

    doc.text(
      "PagCursos",
      105,
      150,
      { align: "center" }
    );

    doc.save("certificado.pdf");
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <button
        onClick={gerarCertificado}
        className="bg-yellow-500 text-black px-8 py-4 rounded-xl font-bold"
      >
        Baixar Certificado
      </button>
    </main>
  );
}