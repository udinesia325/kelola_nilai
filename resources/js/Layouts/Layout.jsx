import NavLink from '@/Components/NavLink'
import { Link, usePage } from '@inertiajs/react'
import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Layout({ children }) {
    const { auth, flash } = usePage().props
    useEffect(() => {
        if (flash.message) {
            toast(flash.message)
        }
    }, [flash])
    return (
        <div className="flex flex-row min-h-screen bg-slate-100">
            <ToastContainer position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light" />
            <div className="flex-none w-[250px] bg-white flex flex-col gap-y-2">
                <div className="w-full flex flex-row h-8 justify-center gap-x-4 items-center mt-3 ">
                    <h1 className='text-2xl font-bold '>E - Nilai</h1>
                </div>
                <div className='flex flex-col gap-y-5 mt-16 px-7'>
                    <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                        <span><i className="fa-solid fa-chart-column mr-5"></i>Dashboard</span>
                    </NavLink>

                    {/* jika admin maka tambahkan menu tambahan */}
                    {auth.isAdmin && <AdminMenu />}

                    <NavLink href={route('nilai')} active={route().current('nilai')}>
                        <span><i className="fa-solid fa-book-open mr-5"></i>Penilaian</span>
                    </NavLink>
                    <NavLink href={route('rekapan')} active={route().current('rekapan')}>
                        <span><i className="fa-solid fa-book mr-5"></i>Rekapan Nilai</span>
                    </NavLink>
                    <Link href={route('logout')} method='post' as='button' className='inline-flex items-center px-1 pt-1 border-b-2 border-transparent font-semibold pb-3 text-sm  leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out'>
                        <span><i className="fa-solid fa-arrow-right-from-bracket mr-5"></i>Logout</span>
                    </Link>
                </div>
            </div>
            <div className="flex-auto" >
                <div className="flex flex-col">
                    <div className="w-full bg-sky-500 py-2">
                        <h1 className="font-semibold font-sans text-white text-2xl uppercase ml-4">
                            <i className="fa-solid fa-user-tie m-auto text-2xl mr-3"></i>
                            {auth.user.name}</h1>
                    </div>
                    <div className="max-w-7xl sm:px-6 lg:px-8 mt-10">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg pb-36">
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

const AdminMenu = () => (
    <>
        <NavLink href={route('users')} active={route().current('users')}>
            <span><i className="fa-solid fa-users mr-5"></i>Kelola User</span>
        </NavLink>
        <NavLink href={route('siswa')} active={route().current('siswa')}>
            <span><i className="fa-solid fa-users-gear mr-5"></i>Kelola Siswa</span>
        </NavLink>
        <NavLink href={route('kelas')} active={route().current('kelas')}>
            <span><i className="fa-solid fa-school mr-5"></i>Koridor Kelas</span>
        </NavLink>
    </>
)