import React from 'react'

function Footer() {
    return (
        <div className='w-full h-[200px] bg-gradient-to-br from-sky-500 to-sky-700 pt-4  text-white text-center'>
            <p className='text-center'>Build With</p>
            <div className='mx-auto flex gap-x-3 justify-center items-center mt-4 mb-10'>
                <i className="fa-brands fa-2x fa-laravel "></i>
                <i className="fa-brands fa-2x fa-react animate-spin-slow"></i>
                <img src="/tailwind-css.svg" alt="tailwind" width={50} />
            </div>
            <p>&copy; KabasaTeam {new Date().getFullYear()}</p>
            <p className='text-sm'>
                This project is open source, want to contribute ? <a href="https://github.com/udinesia325/kelola_nilai" target="_blank" className='font-bold underline'> Click here</a>
            </p>
        </div>
    )
}

export default Footer