import { router } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'

export default function FilterKelasSiswa() {
    const [kelas, setKelas] = useState([])
    useEffect(() => {
        const controller = new AbortController()
        const { signal } = controller
        fetch("/api/kelas", { signal })
            .then(response => response.json())
            .then(data => setKelas([...data]))
        return () => {
            controller.abort()
        }
    }, [])
    function handleChange(e) {
        console.log(e.target.value);
        router.get(route("siswa"), { kelas_id: e.target.value })
    }
    const query = new URLSearchParams(window.location.search).get("kelas_id") || ""
    
    if (kelas.length == 0) return ""
    return (
        <div className="form-control w-full max-w-xs">
            <select className="select select-bordered" value={query} onChange={handleChange}>
                <option value="">-- Semua Kelas --</option>
                {kelas.map((k, _i) => (
                    <option value={k.id} key={_i}>{k.nama_kelas}</option>
                ))}
            </select>

        </div>
    )
}
