import { useForm, usePage } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'

export default function CreateSiswa() {
    const {flash} = usePage().props
   
    const [show, setShow] = useState(false)
    const [kelas, setKelas] = useState([])
    const handleShow = () => setShow(true)
    const handleHide = () => setShow(false)
    useEffect(()=>{
        if(flash.message){
            handleHide()
        }
    },[flash])
    // tambahkan kelas saat onmount
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
    const { data, setData, post } = useForm({
        "nama_siswa": null,
        "kelas_id": null,
    })
    console.log(data);
    // post("/siswa/store")
    useEffect(() => {
        if (kelas.length) {
            setData("kelas_id", kelas[0].id)
        }
    }, [kelas])
    function handleSubmit(e) {
        e.preventDefault()
        // console.log("test");
        post("/siswa/store")
    }
    return (
        <>
            {/* The button to open modal */}
            <button className='btn btn-sm btn-info ml-3 text-white font-semibold' onClick={handleShow}><i className="fa-solid fa-user-plus mr-3"></i> Tambah</button>

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className={`modal ${show ? "modal-open" : ""}`}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Masukkan data siswa</h3>
                    <form className='my-3 flex flex-col gap-y-2' onSubmit={handleSubmit}>
                        <input type="text" placeholder="Nama siswa" className="input input-bordered w-full max-w-xs" onChange={() => setData("nama_siswa", event.target.value)} required />
                        {kelas.length != 0 ?
                            <select className="select select-bordered w-full max-w-xs" defaultValue={data["kelas_id"]} onChange={() => setData("kelas_id", event.target.value)}>
                                {kelas.map((k, _i) => (
                                    <option value={k.id} key={_i}>{k.nama_kelas}</option>
                                ))}

                            </select>
                            : null}
                        <button className="btn btn-sm btn-success text-white font-semibold w-min px-4">Kirim</button>
                    </form>

                    <div className="modal-action">
                        <button className="btn btn-sm btn-error text-white font-semibold " onClick={handleHide} type="button"> Tutup</button>
                    </div>
                </div>
            </div>
        </>
    )
}
