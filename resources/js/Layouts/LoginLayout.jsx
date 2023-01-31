import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="h-screen w-screen flex">
            <div className='bg-[#76ADFD] w-full h-full flex flex-col relative justify-center items-center'>
                <img src="/hero_logo.jpg" alt="hero image untuk login" className='w-[600px] h-[400px]' />
                <h1 className='text-4xl font-black text-white'>Kelola Nilai Dengan Mudah</h1>
                <span className='tracking-wide text-slate-200 mt-3'>Buat dan kelola laporan nilai siswa dengan cepat dan akurat !</span>
            </div>

            <div className="bg-white w-full h-full flex">
                {children}
            </div>
        </div>
    );
} 
