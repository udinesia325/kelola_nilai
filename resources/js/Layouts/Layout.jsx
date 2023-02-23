import Footer from '@/Components/Footer';
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
        <>
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
                    <h1 className='text-2xl font-bold text-center my-3'>E - Nilai</h1>

                    <div className='flex flex-col mt-16'>
                        <NavLink href={route('dashboard')} active={route().current('dashboard')} icon="fa-chart-column" text="Dashboard" />
                        {/* jika admin maka tambahkan menu tambahan */}
                        {auth.isAdmin && <AdminMenu />}

                        <NavLink href={route('nilai')} active={route().current('nilai')} icon=" fa-book-open" text="Penilaian" />
                        <NavLink href={route('rekapan')} active={route().current('rekapan')} icon=" fa-book" text="Rekapan" />
                        <Link href={route('logout')} method='post' as='button' className='inline-flex items-center  py-3 transition duration-150 ease-in-out hover:bg-gray-200 pl-4'>
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
                        <div className="max-w-7xl sm:px-6 lg:px-8 mt-10 mb-3">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg pb-36">
                                <div className="p-6 text-gray-900">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Layout

const AdminMenu = () => (
    <>
        <NavLink href={route('users')} active={route().current('users')} icon=" fa-users" text="Kelola User" />
        <NavLink href={route('siswa')} active={route().current('siswa')} icon=" fa-users-gear" text="Kelola Siswa" />
        <NavLink href={route('kelas')} active={route().current('kelas')} icon=" fa-school" text="Koridor Kelas" />
    </>
)