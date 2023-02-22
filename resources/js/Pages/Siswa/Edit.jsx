import Layout from '@/Layouts/Layout';
import { Head, useForm } from '@inertiajs/react';
import React from 'react'

function Edit(props) {
    const { siswa, kelas } = props.data
    const { data, setData, post } = useForm({
        "siswa": siswa
    });
    const handleSelectKelas = (id, event) => {
        setData("siswa", [...data.siswa.map((s) => {
            if (s.id == id) {
                let old = { ...s }
                old.kelas_id = event.target.value
                return old
            }
            return { ...s }
        })])
    }
    const handleSelectNama = (id, event) => {
        // console.log();
        setData("siswa", [...data.siswa.map((s) => {
            if (s.id == id) {
                let old = { ...s }
                old.nama_siswa = event.target.value
                return old
            }
            return { ...s }
        })])
    }
    console.log(data.siswa);
    const handleSubmit = () => {
        post(route("siswa.update"))
    }
    return (
        <Layout>
            <Head title='Edit  Siswa' />
            <div className="overflow-x-auto">
                <button className='btn btn-sm btn-success font-bold text-white mb-5' onClick={handleSubmit}>  <i className="fa-solid fa-floppy-disk mr-3"></i>Simpan</button>
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Kelas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.siswa.map((s, _i) => (
                            <tr key={_i}>
                                <td>{_i + 1}</td>
                                <td>
                                    <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={s.nama_siswa} onChange={handleSelectNama.bind(this, s.id)} />
                                </td>
                                <td>
                                    <select className="select select-bordered w-full max-w-xs" value={s.kelas_id} onChange={handleSelectKelas.bind(this, s.id)}>
                                        {kelas.map((k, _i) => (
                                            <option value={k.id} key={_i}>{k.nama_kelas}</option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}

export default Edit