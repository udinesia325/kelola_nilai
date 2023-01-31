import Layout from '@/Layouts/Layout'
import React from 'react'

function Index(props) {
    const { data } = props
    function formatMonth(date) {
        return new Date(date).toLocaleString('id', { month:"long" })
    }
    return (
        <Layout>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full ">
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
                                    <button className='btn btn-sm btn-success mr-3'>Unduh</button>
                                    <button className='btn btn-sm btn-secondary'>Lihat</button>
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