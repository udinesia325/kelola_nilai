import { Link } from '@inertiajs/react';

export default function NavLink({ href, active, icon, text, children }) {
    return (
        <Link
            href={href}

            className={
                active
                    ? 'inline-flex items-center  py-3 transition duration-150 ease-in-out font-semibold bg-sky-100 pl-4 text-sky-600 '
                    : 'inline-flex items-center  py-3 transition duration-150 ease-in-out hover:bg-gray-50 pl-4 '
            }

        >
            <i className={`fa-solid ${icon} mr-5`}></i><span>{text}</span>
            {children}
        </Link>
    );
}
