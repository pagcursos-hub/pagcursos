"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function criarConta() {
    const { error } = await supabase.auth.signUp({
      email,
      password: senha,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Conta criada com sucesso!");
  }

  async function entrar() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) {
      alert(error.message);
      return;
    }

    window.location.href = "/aluno";
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-8">
      <div className="bg-slate-900 p-8 rounded-2xl w-full max-w-md space-y-4">
        <h1 className="text-3xl font-bold text-yellow-400">
          Login PagCursos
        </h1>

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 rounded-xl bg-slate-800"
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full p-4 rounded-xl bg-slate-800"
        />

        <button
          onClick={entrar}
          className="w-full bg-yellow-500 text-black font-bold p-4 rounded-xl"
        >
          Entrar
        </button>

        <button
          onClick={criarConta}
          className="w-full bg-blue-600 font-bold p-4 rounded-xl"
        >
          Criar conta
        </button>
      </div>
    </main>
  );
}