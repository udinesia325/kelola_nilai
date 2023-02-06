import Layout from '@/Layouts/Layout'
import React from 'react'

function Index(props) {
    const { data } = props
    function formatMonth(date) {
        const bulan = new Date(date).toLocaleString('id', { month: "long" })
        const tahun = new Date(date).getFullYear()
        return `${bulan} / ${tahun}`
    }
    return (
        <Layout>
            <div className="overflow-x-auto min-w-full max-w-md md:max-w-full ">
                <h1 className='text-2xl mb-5'>Rekapan bulanan penilaian siswa</h1>
                <table className="table table-compact min-w-max w-full">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Kelas</th>
                            <th>Mapel</th>
                            <th>Bulan</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((d, _i) => (

                            <tr key={_i}>
                                <th>{_i + 1}</th>
                                <td>{d.nama_kelas}</td>
                                <td>{d.mapel}</td>
                                <td>{formatMonth(d.created_at)}</td>
                                <td>
                                    <a href={route("rekapan.show", {
                                        nama_kelas: d.nama_kelas,
                                        created_at: d.created_at,
                                        mapel: d.mapel
                                    })} className='btn btn-sm '><i className="fa-solid fa-eye mr-3"></i>Lihat</a>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </Layout>
    )
}

export default Index