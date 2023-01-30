import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="h-screen w-screen flex">
            <div className='bg-[#afafaf] w-full h-full flex relative'>
                <img src="/hero_logo.jpg" alt="hero image untuk login" className='w-[500px] my-auto ml-auto' />
            </div>

            <div className="bg-white w-full h-full flex">
                {children}
            </div>
        </div>
    );
}
