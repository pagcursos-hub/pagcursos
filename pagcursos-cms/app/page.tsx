export default function Dashboard() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-4xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-blue-900 p-6 rounded-2xl">
          <h2 className="text-2xl font-semibold">
            Cursos
          </h2>

          <p className="mt-2 text-gray-300">
            Total de cursos cadastrados.
          </p>
        </div>

        <div className="bg-green-900 p-6 rounded-2xl">
          <h2 className="text-2xl font-semibold">
            Alunos
          </h2>

          <p className="mt-2 text-gray-300">
            Total de alunos matriculados.
          </p>
        </div>

        <div className="bg-yellow-700 p-6 rounded-2xl">
          <h2 className="text-2xl font-semibold">
            Certificados
          </h2>

          <p className="mt-2 text-gray-200">
            Certificados emitidos.
          </p>
        </div>

      </div>
    </main>
  );
}