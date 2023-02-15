import CreateKelas from '@/Components/CreateKelas'
import KosongkanKelas from '@/Components/KosongkanKelas'
import TransferKelas from '@/Components/TransferKelas'
import Layout from '@/Layouts/Layout'
import React from 'react'

export default function Index(props) {
    const { kelas } = props.data
    return (
        <Layout>
            <div className="features mb-4 flex gap-x-4">
                <CreateKelas />
                <TransferKelas />
                <KosongkanKelas />
            </div>

            <table className="table table-compact w-[500px]">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama Kelas</th>
                        <th>Ubah</th>
                    </tr>
                </thead>
                <tbody>
                    {kelas.map((k, _i) => (
                        <tr key={_i}>
                            <td>{_i + 1}</td>
                            <td>{k.nama_kelas}</td>
                            <td>aksi</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </Layout>
    )
}
