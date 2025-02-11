// src/pages/404.tsx
import React from 'react';
import Link from 'next/link';
import { Home, Compass, CloudOff } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-blue-900 text-white overflow-hidden">

      {/* Main Content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <div className="backdrop-blur-xl bg-white/10 p-8 rounded-2xl border border-white/20 shadow-2xl">
          {/* 404 Icon */}
          <div className="mb-8 relative">
            <div className="absolute inset-0 animate-float">
              <CloudOff className="mx-auto h-24 w-24 text-blue-400/50" />
            </div>
            <CloudOff className="mx-auto h-24 w-24 text-blue-400" />
          </div>

          {/* Title & Subtitle */}
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-indigo-200">
            Página Não Encontrada
          </h1>
          <p className="text-xl text-blue-200/80 mb-8">
            Parece que você se perdeu no caminho. Não se preocupe, acontece com os melhores navegadores!
          </p>

          {/* Navigation Options */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="group flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-lg"
            >
              <Home className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              <span>Voltar ao Início</span>
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="group flex items-center justify-center gap-2 px-6 py-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              <Compass className="w-5 h-5 group-hover:-rotate-45 transition-transform duration-300" />
              <span>Voltar</span>
            </button>
          </div>
        </div>

        {/* Error Code */}
        <div className="mt-8 font-mono text-lg text-blue-200/60 animate-pulse">
          Erro 404
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;