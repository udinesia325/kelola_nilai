import { Link } from '@inertiajs/react';

export default function NavLink({ href, active, children,method='',as='' }) {
    return (
        method && as ?
        <Link
            href={href}
            method={method}
            as={as}
            className={
                active
                    ? 'inline-flex items-center px-1 pt-1 border-b-2 border-sky-600 font-semibold  pb-3  text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out'
                    : 'inline-flex items-center px-1 pt-1 border-b-2 border-transparent font-semibold pb-3 text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out'
            }
     
        >
            {children}
        </Link>
        :
        <Link
        href={href}
        
        className={
            active
                ? 'inline-flex items-center px-1 pt-1 border-b-2 border-sky-600 font-semibold  pb-3  text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out'
                : 'inline-flex items-center px-1 pt-1 border-b-2 border-transparent font-semibold pb-3 text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out'
        }
 
    >
        {children}
    </Link>
    );
}
