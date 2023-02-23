import CreateSiswa from '@/Components/CreateSiswa';
import EditSiswa from '@/Components/EditSiswa';
import FilterKelasSiswa from '@/Components/FilterKelasSiswa';
import Layout from '@/Layouts/Layout'
import { Head, Link, useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'

function Siswa(props) {
    const { users, flash, siswa } = props
    const [show, setShow] = useState(false)
    const { data, setData, post, progress, processing, reset } = useForm({
        file: null
    })
    function submit(e) {
        e.preventDefault()
        post('/siswa/import')
    }
    useEffect(() => {
        if (flash.message) {
            reset();
            setShow(false)
        }

    }, [flash])

    return (
        <Layout>
            <Head title="Kelola Siswa" />
            {/* start modal */}
            {/* The button to open modal */}
            <div className="flex gap-x-4 items-center mb-4">
                <label onClick={() => setShow(true)} className="btn btn-success text-lg  font-bold text-white"><i className="fa-solid fa-arrow-up-from-bracket mr-4"></i> Siswa</label>
                <CreateSiswa />
                <EditSiswa />
                <FilterKelasSiswa />
            </div>

            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className={`modal ${show ? "modal-open" : ""}`}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Masukkan File Excel</h3>
                    <div className="py-4">
                        <form className='my-8 flex flex-col gap-2' onSubmit={submit}>
                            <div className="form-control w-full max-w-xs">
                                <input type="file" accept='xls, xlsx' onChange={e => setData('file', e.target.files[0])} className="file-input file-input-bordered file-input-success file-input-sm w-full max-w-xs" />
                                <label className="label">
                                    <span className="label-text">Tidak punya sample data ?</span>
                                    <span className="label-text-alt"><a href="/sampel/data_siswa.xlsx" download className='text-sky-800'>Unduh disini</a></span>
                                </label>
                            </div>
                            <button className="btn btn-sm btn-success w-[75px] text-white font-bold" disabled={processing} type='submit' htmlFor="my-modal">Import</button>
                        </form>
                    </div>
                    <div className="modal-action">
                        <label className="btn btn-sm" onClick={() => setShow(false)}>Tutup</label>
                    </div>
                </div>
            </div>
            {/* end modal */}
            {/* untuk filter berdasarkan kelas */}
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