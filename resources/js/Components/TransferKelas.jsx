import React, { useEffect, useState } from 'react'
import { useForm, usePage } from '@inertiajs/react'

function TransferKelas() {
    const { flash } = usePage().props
    const [show, setShow] = useState(false)
    const [kelas, setKelas] = useState([])
    const handleShow = () => setShow(true)
    const handleHide = () => setShow(false)
    const { data, setData, post } = useForm({
        "kelas_asal": 0,
        "kelas_tujuan": 0,

    })
    function handleSubmit(e) {
        e.preventDefault()
        post(route("kelas.transfer"))

    }
    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal
        fetch(route("api.kelas"), { signal })
            .then(response => response.json())
            .then(data => setKelas(data))
    }, [])
    useEffect(() => {
        if (flash.message) {
            handleHide()
        }
    }, [flash])
    useEffect(() => {
        if (kelas.length > 0) {
            if (kelas[0].id) {
                setData({ "kelas_asal": kelas[0].id, "kelas_tujuan": kelas[0].id })
            }
        }
    }, [kelas, show])

    if (kelas.length == 0) {
        return ""
    }

    // console.log(data);
    return (
        <>
            {/* Put this part before </body> tag */}
            <button className='btn btn-sm btn-info font-semibold text-white' onClick={handleShow}><i className="fa-solid fa-arrows-turn-to-dots mr-3"></i> Transfer</button>

            <div className={`modal ${show ? "modal-open" : ""}`}>
                <div className="modal-box relative">
                    <label onClick={handleHide} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-lg">Transfer Semua siswa ke kelas tujuan</h3>
                    <p className="text-sm text-slate-700">fitur ini sangat cocok untuk menaikkan siswa</p>
                    <form onSubmit={handleSubmit} className='my-4 '>
                        <div className="flex gap-x-2">
                            {/* kelas asal */}
                            <div className="form-control flex-1">
                                <label className="label">
                                    <span className="label-text">Kelas Asal</span>
                                </label>
                                <select className="select select-bordered" value={data.kelas_asal || ""} onChange={(e) => setData("kelas_asal", e.target.value)}>
                                    {kelas.map((k, _i) => (
                                        <option key={_i} value={k.id}>{k.nama_kelas}</option>
                                    ))}
                                </select>
                            </div>
                            {/* kelas tujuan */}
                            <div className="form-control flex-1">
                                <label className="label">
                                    <span className="label-text">Kelas Tujuan</span>
                                </label>
                                <select className="select select-bordered" value={data.kelas_tujuan || ""} onChange={(e) => setData("kelas_tujuan", e.target.value)}>
                                    {kelas.map((k, _i) => (
                                        <option key={_i} value={k.id}>{k.nama_kelas}</option>
                                    ))}
                                </select>
                            </div>

                        </div>
                        {data.kelas_asal == data.kelas_tujuan
                            && <p className='text-red-600 my-2 text-sm'>Kelas asal tidak boleh sama dengan  kelas tujuan !</p>}
                        <button className='btn btn-sm btn-success mt-4 font-bold text-white' disabled={data.kelas_asal == data.kelas_tujuan}>Kirim</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default TransferKelas