import Layout from '@/Layouts/Layout'
import { Head, Link, useForm } from '@inertiajs/react';
import React from 'react'

function Siswa(props) {
    const { users, flash, siswa } = props

    const { data, setData, post, progress, processing, } = useForm({
        file: null
    })
    function submit(e) {
        e.preventDefault()
        post('/siswa/import')
    }
    return (
        <Layout>
            <Head title="Dashboard" />
            {/* start modal */}
            {/* The button to open modal */}
            <label htmlFor="my-modal" className="btn btn-sm btn-success mb-4 font-bold text-white">Import Siswa</label>

            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Masukkan File Excel</h3>
                    <div className="py-4">
                        <form className='my-8 flex flex-row justify-center items-center gap-2' onSubmit={submit}>
                            <input type="file" accept='xls, xlsx' onChange={e => setData('file', e.target.files[0])} className="file-input file-input-bordered file-input-success file-input-sm w-full max-w-xs" />
                            <button className="btn btn-sm btn-success w-[75px]" disabled={processing} type='submit' htmlFor="my-modal">Import</button>
                        </form>
                    </div>
                    <div className="modal-action">
                        <label htmlFor="my-modal" className="btn btn-sm">Tutup</label>
                    </div>
                </div>
            </div>
            {/* end modal */}
            <div className="overflow-x-auto w-full">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Nama </th>
                            <th>Kelas</th>

                        </tr>
                    </thead>
                    <tbody>
                        {siswa.data.map((s, _i) => (
                            <Row key={_i} nama={s.nama_siswa} kelas={s.kelas.nama_kelas} />
                        ))}
                    </tbody>

                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Nama</th>
                            <th>Kelas</th>
                        </tr>
                    </tfoot>

                </table>
            </div>
            <div className="btn-group block mx-auto my-4 font-bold">

                {siswa.prev_page_url && <Link href={siswa.prev_page_url} className="btn btn-info">Prev</Link>}
                <button className="btn btn-info">Page {siswa.current_page}</button>
                {siswa.next_page_url && <Link href={siswa.next_page_url} className="btn btn-info" >Next</Link>}

            </div>
        </Layout>
    )
}

export default Siswa

function Row({ nama, kelas }) {
    return (<tr>
        <th>
            <label>
                <input type="checkbox" className="checkbox" />
            </label>
        </th>

        <td>
            <div className="font-bold">{nama}</div>

        </td>
        <td>
            <div className="font-bold">{kelas}</div>

        </td>
    </tr>)
}