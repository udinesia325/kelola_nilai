import { usePage } from '@inertiajs/react'
import React from 'react'


// sembunyikan ketika di tampilan user tapi akan tetap tampil ketika di eksport
function TableHeaderExport({ url }) {
    const { auth } = usePage().props
    return (
        <>
            <thead className='hidden'>
                <tr></tr>
                <tr className='bg-white'>
                    <td>Nama Guru </td>
                    <td> : {auth.user.name}</td>
                </tr>
            </thead>
            <thead className='hidden'>
                <tr>
                    <td>Mapel </td>
                    <td> : {url.get("mapel")}</td>
                </tr>
            </thead>
            <thead className='hidden'>
                <tr>
                    <td>Kelas </td>
                    <td> : {url.get("nama_kelas")}</td>
                </tr>
            </thead>
            <thead className='hidden'>
                <tr>
                    <td>Bulan </td>
                    <td> : {new Date(url.get("created_at")).toLocaleDateString("id-ID", { month: "long" })}</td>
                </tr>
                <tr></tr>
            </thead>
        </>
    )
}

export default TableHeaderExport