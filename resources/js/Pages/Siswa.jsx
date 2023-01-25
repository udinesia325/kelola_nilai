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
            {flash.message ? <div className="alert alert-success shadow-lg mb-5">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{flash.message}</span>
                </div>
            </div> : <div className="modal">
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
            </div>}
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
            {/* jika data kosong maka jangan tampilkan paginasi */}
            {siswa.total != 0 &&
                <div className="flex flex-row mt-3 mb-5 justify-center font-bold text-white">
                    {siswa.prev_page_url && <Link href={siswa.prev_page_url} className="py-2 px-4 bg-indigo-500 hover:bg-indigo-400">Prev</Link>}
                    <button className="py-2 px-4 bg-indigo-500 hover:bg-indigo-400">Page {siswa.current_page}</button>
                    {siswa.next_page_url && <Link href={siswa.next_page_url} className="py-2 px-4 bg-indigo-500 hover:bg-indigo-400" >Next</Link>}

                </div>
            }
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