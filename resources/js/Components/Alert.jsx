import React, { useEffect, useRef } from 'react'

function Alert({ children, type = 'success' }) {
    const alertRef = useRef(null)
    useEffect(() => {
        setTimeout(() => {
            alertRef.current.remove()
        }, 2000)
    }, [])
    return (
        <div className={`alert alert-${type} shadow-lg my-4`} ref={alertRef}>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{children}</span>
            </div>
        </div>
    )
}

export default Alert