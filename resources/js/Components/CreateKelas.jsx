import { useForm, usePage } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'

function CreateKelas() {
    const { flash } = usePage().props
    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleHide = () => setShow(false)
    const { data, setData, post } = useForm({
        "nama_kelas": ""
    })
    function handleSubmit(e) {
        e.preventDefault()
        post(route("kelas.store"))

    }
    useEffect(() => {
        if (flash.message) {
            handleHide()
        }
    }, [flash])

    return (
        <>
            {/* Put this part before </body> tag */}
            <button className='btn btn-sm btn-primary  font-semibold' onClick={handleShow}> <i className="fa-solid fa-plus mr-3"></i> Tambah</button>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className={`modal ${show ? "modal-open" : ""}`}>
                <div className="modal-box relative">
                    <label htmlFor="my-modal-3" onClick={handleHide} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-lg">Masukkan nama kelas</h3>
                    <form onSubmit={handleSubmit} className='my-4'>
                        <input type="text" placeholder="Nama Kelas" className="input input-sm input-bordered w-full max-w-xs" value={data.nama_kelas} onChange={(e) => setData("nama_kelas", e.target.value)} />
                        <button className='btn btn-sm btn-success ml-3 font-bold text-white'>Kirim</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateKelas