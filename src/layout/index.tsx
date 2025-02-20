import React from 'react'


export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-screen flex flex-col">
          {/* Header */}
          <header className="h-40 shadow-md bg-white flex justify-center items-center">
            <img src="/logo.jpg" alt="logo" width={200} height={120} />
          </header>
    
          {/* Contenido que llena el resto de la pantalla */}
          <main className="flex-1 bg-gradient-to-t from-secondary to-emerald-600 overflow-hidden">
            {children}
          </main>
        </div>
      )
}
