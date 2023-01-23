import NavLink from '@/Components/NavLink'
import { usePage } from '@inertiajs/react'
import React from 'react'

function Layout({ children }) {
    const { auth } = usePage().props
    return (
        <div className="flex flex-row min-h-screen bg-slate-100">
            <div className="flex-initial w-56 bg-white flex flex-col gap-y-2">
                <div className="w-full flex flex-row h-8 justify-center gap-x-4 items-center mt-3 ">
                    <div className="w-9 h-9 rounded-full bg-slate-200 flex">
                        <i className="fa-solid fa-user-tie m-auto text-2xl"></i>
                    </div>
                    <span className="font-semibold font-sans text-gray-600">{auth.user.name}</span>
                </div>
                <div className='flex flex-col gap-y-3 mx-auto mt-16 '>
                    <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                        <span><i className="fa-solid fa-chart-column mr-5"></i>Dashboard</span>
                    </NavLink>
                    <NavLink href={route('users')} active={route().current('users')}>
                        <span><i className="fa-solid fa-users mr-5"></i>Kelola User</span>
                    </NavLink>
                    <NavLink href={route('siswa')} active={route().current('siswa')}>
                        <span><i className="fa-solid fa-users-gear mr-5"></i>Kelola Siswa</span>
                    </NavLink>
                    <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                        <span><i className="fa-solid fa-book-open mr-5"></i>Kelola Nilai</span>
                    </NavLink>
                    <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                        <span><i className="fa-solid fa-book mr-5"></i>Rekapan Nilai</span>
                    </NavLink>

                    <NavLink href={route('logout')} method='post' as='button' active={route().current('dashboard')}>
                        <span><i className="fa-solid fa-arrow-right-from-bracket mr-5"></i>Logout</span>
                    </NavLink>
                </div>
            </div>
            <div className="flex-auto pt-3 pl-4" >
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout