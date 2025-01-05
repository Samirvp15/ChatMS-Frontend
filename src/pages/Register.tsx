
import React from 'react'

export default function Register() {
  return (
    <div className=' mt-5'>
      <div className=' bg-white w-full max-w-sm mx-2 rounded overflow-hidden p-4'>
      <h3>Bienvenidos a Chat MS</h3>

    <form action="">
      <div>
        <label htmlFor='name'>Nombre:</label>
        <input type="text" 
        name="name"
         id="name"
          placeholder='Ingresa tu nombre'
          className=' bg-slate-200 px-2 py-1' />
      </div>
    </form>

      </div>
    </div>
  )
}
