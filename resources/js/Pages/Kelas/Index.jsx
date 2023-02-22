import CreateKelas from '@/Components/CreateKelas'
import KosongkanKelas from '@/Components/KosongkanKelas'
import TransferKelas from '@/Components/TransferKelas'
import Layout from '@/Layouts/Layout'
import { Head, useForm } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'

export default function Index(props) {
    const { kelas } = props.data
    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleHide = () => setShow(false)
    const { data, setData, patch } = useForm({
        id: 0,
        nama_kelas: ""
    })
    const handleEdit = (data) => {
        handleShow()
        setData({ id: data.id, nama_kelas: data.nama_kelas })
    }
    const handlePatch = () => {
        patch(route("kelas.update"))
    }
    useEffect(() => {
        if (props.flash.message) {
            handleHide()
        }
    }, [props.flash])

    return (
        <Layout>
            <Head title='Koridor Kelas' />

            <div className="features mb-4 flex gap-x-4">
                <CreateKelas />
                <TransferKelas />
                <KosongkanKelas />
            </div>
            {/* modal */}
            {/* The button to open modal */}


            {/* Put this part before </body> tag */}
            <div className={`modal ${show ? "modal-open" : ""}`}>
                <div className="modal-box relative">
                    <label className="btn btn-sm btn-circle absolute right-2 top-2" onClick={handleHide}>✕</label>
                    <h3 className="text-lg font-bold">Masukkkan nama baru</h3>
                    <input type="text" placeholder="Nama Kelas" value={data.nama_kelas} onChange={e => setData("nama_kelas", e.target.value)} className="input input-bordered w-full max-w-xs mt-4" />
                    <br />
                    <button className='btn btn-sm btn-success mt-3 mb-4 text-white tracking-wider' onClick={handlePatch}>Kirim</button>
                </div>
            </div>
            {/* endmodal */}

            <table className="table table-compact w-[500px]">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama Kelas</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {kelas.map((k, _i) => (
                        <tr key={_i}>
                            <td>{_i + 1}</td>
                            <td>{k.nama_kelas}</td>
                            <td>
                                <button className='btn btn-sm btn-warning text-white' onClick={handleEdit.bind(this, k)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </Layout>
    )
}
