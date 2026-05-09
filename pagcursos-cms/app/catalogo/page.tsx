import { supabase } from "@/lib/supabase";

export default async function Catalogo() {
  const { data: cursos } = await supabase
    .from("cursos")
    .select("*")
    .eq("status", "publicado");

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="bg-gradient-to-br from-blue-950 via-slate-950 to-black px-8 py-20 text-center">
        <h1 className="text-5xl font-bold text-yellow-400 mb-4">
          PagCursos
        </h1>

        <p className="text-2xl font-semibold mb-4">
          Cursos Livres Online com Certificação
        </p>

        <p className="max-w-3xl mx-auto text-slate-300">
          Aprimore seus conhecimentos com cursos livres online, materiais
          organizados e certificados válidos para horas complementares conforme
          critérios da sua instituição.
        </p>
      </section>

      <section className="p-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">
          Cursos disponíveis
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cursos?.map((curso) => (
            <div
              key={curso.id}
              className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800"
            >
              {curso.imagem_capa && (
                <img
                  src={curso.imagem_capa}
                  alt={curso.titulo}
                  className="w-full h-64 object-contain bg-black"
                />
              )}

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">
                  {curso.titulo}
                </h3>

                <p className="text-slate-400 mb-4">
                  {curso.descricao}
                </p>

                <p className="text-yellow-400 font-semibold mb-5">
                  {curso.carga_horaria} horas complementares
                </p>

                <a
  href={`/catalogo/${curso.id}`}
  className="block text-center w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 rounded-xl"
>
  Ver Curso
</a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}