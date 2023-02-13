import React, { useEffect, useState } from 'react'
import mapel from '@/constans/mapel'
import { usePage } from '@inertiajs/react'
export default function () {
    const { flash,auth } = usePage().props
    const [data, setData] = useState([])
    const [show, setShow] = useState(false)
    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal
        fetch(route("api.nilai.create"))
            .then(response => response.json())
            .then(data => setData(data))
    }, [])
    useEffect(() => {
        if (flash.message) {
            setShow(false)
        }
    }, [flash])
    if (data.length == 0) return ""
    return (
        <div>
            <button className='btn btn-sm btn-success text-white font-bold' onClick={() => setShow(true)}>Buat Penilaian</button>
            <div className={`modal ${show ? "modal-open" : ""}`}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Masukkan Kriteria Penilaian</h3>
                    <form action={route("nilai.create")}>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Nama Mapel</span>
                            </label>
                            <input type="text" list='mapel' required name='mapel' className="input input-bordered w-full max-w-xs" />
                            <datalist id="mapel">
                                {mapel.map((m, _i) => (
                                    <option key={_i} value={m} />
                                ))}
                            </datalist>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Kelas</span>
                                </label>
                                <select className="select select-bordered" name='kelas' defaultValue={data.kelas[0].id}>
                                    {data.kelas.map((k, i) => (
                                        <option key={i} value={k.id}>{k.nama_kelas}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Jenis Nilai</span>
                                </label>
                                <select className="select select-bordered" name='jenis' defaultValue={data.jenis[0].id}>
                                    {data.jenis.map((j, i) => (
                                        <option key={i} value={j.id}>{j.nama_nilai}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <button className="btn-primary btn-sm px-4 my-3 rounded-md">Kirim</button>
                    </form>
                    <div className="modal-action">
                        <label onClick={() => setShow(false)} className="btn btn-outline btn-error btn-sm">Tutup</label>
                    </div>
                </div>
            </div>
        </div>
    )
}
