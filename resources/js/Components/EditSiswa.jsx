import { router, useForm, usePage } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'

function EditSiswa() {
    const { flash } = usePage().props
    const [show, setShow] = useState(false)
    const [kelas, setKelas] = useState([])
    const { data, setData, post } = useForm({
        "kelas_id": 0
    })
    const handleClose = () => setShow(false)
    const handleOpen = () => setShow(true)
    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal
        fetch(route("api.kelas"), { signal })
            .then(response => response.json())
            .then(data => setKelas(data))
    }, [])
    useEffect(() => {
        if (flash.message) {
            handleClose()
        }
    }, [flash])
    useEffect(() => {
        if (kelas.length != 0) {
            setData("kelas_id", kelas[0].id)
        }
    }, [kelas, show])
    if (kelas.length == 0) return ""
    return (
        <>
            {/* The button to open modal */}
            <button className="btn font-semibold text-white text-lg btn-accent" onClick={handleOpen}><i className="fa-solid fa-pen-to-square mr-3"></i>Edit siswa</button>

            {/* Put this part before </body> tag */}
            <div className={`modal ${show ? "modal-open" : ""}`}>
                <div className="modal-box relative">
                    <label className="btn btn-sm btn-circle absolute right-2 top-2" onClick={handleClose}>✕</label>
                    <h3 className="text-lg font-bold mb-4">Masukkan nama kelas</h3>
                    <form className='flex flex-col items-start gap-y-4' action={route("siswa.edit")}>
                        <select className="select select-bordered w-full max-w-xs" value={data.kelas_id} onChange={(e) => setData("kelas_id", e.target.value)} name="kelas_id">
                            {kelas.map((k, _i) => (
                                <option key={_i} value={k.id}>{k.nama_kelas}</option>
                            ))}
                        </select>
                        <button className='btn btn-sm btn-success text-white'>Kirim</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditSiswa