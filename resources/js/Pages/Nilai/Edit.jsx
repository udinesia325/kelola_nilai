import Alert from '@/Components/Alert';
import Layout from '@/Layouts/Layout';
import { Link, useForm } from '@inertiajs/react';
import React from 'react'

function Show(props) {
    // console.log(props);
    const { auth, siswa, flash } = props
    const showUrl = new URL(window.location).href.replace("nilai/edit", "nilai/show")
    console.log(props);
    const { data, setData, put } = useForm({
        "data_nilai": [...siswa.map(s => {
            return {
                id: s.id,
                nilai: s.nilai,
                siswa_id: s.id,
                nama: s.nama_siswa
            }
        })],
        "back_url": showUrl
    })
    function handleSetData(id, event) {
        // setiap input di change maka update nilai berdasarkan id siswa 
        setData("data_nilai", [
            ...data.data_nilai.map((d) => {
                if (d.siswa_id !== id) return d
                return { ...d, nilai: event.target.value }
            })
        ])
    }
    function submit(e) {
        e.preventDefault()
        put("/nilai/update")
    }
    return (
        <Layout>
            <div className="overflow-x-auto">
                <form onSubmit={submit}>
                    <div className="flex flex-row justify-between w-full max-w-4xl">
                        <div className="left">
                            <h1 className='font-semibold'>Mapel : {siswa[0].mapel}</h1>
                            <h1 className='text-slate-700'>Kelas : {siswa[0].kelas}</h1>
                            <h1 className='text-slate-700'>Jenis : {siswa[0].jenis}</h1>

                        </div>
                        <div className="right">
                            <Link className='btn btn-sm btn-warning font-semibold text-white mr-3' href={showUrl}> Kembali</Link>
                            <button className='btn btn-sm btn-info font-semibold text-white'> Simpan</button>
                        </div>
                    </div>
                    <table className="table table-zebra w-full max-w-4xl mt-3">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama</th>
                                <th>Nilai</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.data_nilai.map((d, _i) => (
                                <tr className='hover' key={_i}>
                                    <td>{_i + 1}</td>
                                    <td>{d.nama}</td>
                                    <td>
                                        <input type="number" placeholder="Ketik Disini" className="input input-sm input-bordered w-full max-w-xs" value={d.nilai} onChange={handleSetData.bind(this, d.siswa_id)} min="0" max="100" required />

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </form>
            </div>
        </Layout>
    )
}

export default Show