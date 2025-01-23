import React from 'react'


export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <header className=' flex justify-center items-center py-3 h-40 shadow-md bg-white'>
                <img src='/logo.jpg' alt="logo" width={200} height={120} />
            </header>

            {children}
        </>
    )
}
