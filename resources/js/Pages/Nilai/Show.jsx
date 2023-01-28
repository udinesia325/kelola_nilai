import Alert from '@/Components/Alert';
import NilaiBadge from '@/Components/NilaiBadge';
import Layout from '@/Layouts/Layout';
import { Link } from '@inertiajs/react';
import React from 'react'

function Show(props) {
    // console.log(props);
    const { auth, data, flash } = props
    console.log(props);
    const editUrl = new URL(window.location).href.replace("nilai/show", "nilai/edit")
    return (
        <Layout>
            <div className="overflow-x-auto max-w-4xl">
                <div className="flex flex-row justify-between ">
                    <div className="left">
                        <h1 className='font-semibold'>Mapel : {data[0].mapel}</h1>
                        <h1 className='text-slate-700'>Kelas : {data[0].kelas}</h1>
                        <h1 className='text-slate-700'>Jenis : {data[0].jenis}</h1>

                    </div>
                    <div className="right">
                        <Link className='btn btn-sm btn-info' href={editUrl}> Edit</Link>
                    </div>
                </div>
                {flash.message ? <Alert>{flash.message}</Alert> : null}

                <table className="table table-zebra w-full mt-4">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Nilai</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((d, _i) => (
                            <tr className='hover' key={_i}>
                                <td>{_i + 1}</td>
                                <td>{d.nama_siswa}</td>
                                <td><NilaiBadge nilai={d.nilai} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}

export default Show