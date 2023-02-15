import { useForm, usePage } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'

function KosongkanKelas() {
    const [show, setShow] = useState(false)
    const [kelas, setKelas] = useState([])
    const { flash } = usePage().props
    const { data, setData, post } = useForm({
        "kelas_id": ""
    })
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    useEffect(() => {
        if (flash.message) {
            handleClose()
        }
    }, [flash])
    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal
        fetch(route("api.kelas"), { signal })
            .then(response => response.json())
            .then(data => setKelas(data))
    }, [])
    useEffect(() => {
        if (kelas.length != 0) {
            setData({ kelas_id: kelas[0].id })
        }
    }, [show, kelas])
    function onSubmit(e) {
        e.preventDefault()
        if (confirm("semua data siswa dan nilai yang tersimpan akan dihapus, harap berhati - hati")) {
            // console.log("yes",data.kelas_id);
            post(route("kelas.kosongkan"))
        }
        handleClose()
    }
    if (kelas.length == 0) {
        return ""
    }
    return (
        <>
            {/* The button to open modal */}
            <button className='btn btn-sm btn-warning font-semibold text-white' onClick={handleShow}><i className="fa-solid fa-trash-can-arrow-up mr-3"></i>Kosongkan</button>
            {/* Put this part before </body> tag */}
            <div className={`modal ${show ? "modal-open" : ""}`}>
                <div className="modal-box relative">
                    <label className="btn btn-sm btn-circle absolute right-2 top-2" onClick={handleClose}>✕</label>
                    <h3 className="text-lg font-bold">Kosongkan kelas</h3>
                    <p className='text-sm text-slate-700'>Sangat disarankan untuk kelas yang telah lulus atau kelas tak terpakai</p>
                    <form onSubmit={onSubmit}>
                        <div className="form-control w-full max-w-xs mt-5">
                            <label className="label">
                                <span className="label-text">Pilih Kelas</span>
                            </label>
                            <select className="select select-bordered" value={data.kelas_id} onChange={(e) => setData("kelas_id", e.target.value)}>
                                {kelas.map((k, _i) => (
                                    <option key={_i} value={k.id}>{k.nama_kelas}</option>
                                ))}
                            </select>
                        </div>
                        <button className='btn btn-sm btn-error font-semibold text-white mt-4' >Kirim</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default KosongkanKelas