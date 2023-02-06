import TableHeaderExport from '@/Components/TableHeaderExport';
import formatTanggal from '@/helpers/formatTanggal';
import Layout from '@/Layouts/Layout'
import React, { useRef } from 'react'
import { useDownloadExcel } from 'react-export-table-to-excel';

function Show({ data, auth }) {
    const result = [];

    for (let i = 0; i < data.length; i++) {
        const nama = data[i]["nama_siswa"];
        const nilai = data[i]["nilai"];
        const created_at = data[i]["created_at"];
        const nama_nilai = data[i]["nama_nilai"];
        if (!result[nama]) {
            result[nama] = {
                "nama": nama
            }
        }

        result[nama][`${nama_nilai} | ${created_at}`] = nilai

    }
    const finalResult = [];
    for (const key in result) {
        finalResult.push(result[key])
    }
    // console.log(data);
    // console.log(finalResult);
    // untuk melakukan colspan secara dinamis tegantung banyak nya nilai yang di berikan
    const totalCol = {}
    // ambil sampel data pertama
    const sampel = finalResult[0];
    Object.keys(sampel).forEach(s => {
        if (s == "nama") return
        const keysWithoutDate = s.split("|")[0]
        // console.log(keysWithoutDate);
        if (totalCol.hasOwnProperty(keysWithoutDate) == false) {
            totalCol[keysWithoutDate] = 1
        } else {
            totalCol[keysWithoutDate] += 1

        }
    })
    const url = new URLSearchParams(window.location.search)
    // console.log(url.get("mapel"));
    const uniqueCol = new Array(...new Set(Object.keys(totalCol)));
    console.log(Object.keys(sampel));


    // untuk export ke excel

    // ambil tabel
    const tableRef = useRef(null)

    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: `Rekapan Nilai ${formatTanggal(url.get("created_at"))}`,
        sheet: "Rekapan Bulanan",
    })
    return (
        <Layout>
            <div className="overflow-x-auto  min-w-full max-w-md md:max-w-full ">
                <div className="description mt-3">
                        <h1>Mapel : {url.get("mapel")}</h1>
                        <h1>Bulan : {new Date(url.get("created_at")).toLocaleDateString("id-ID", { month: "long" })}</h1>
                        <h1>Kelas : {url.get("nama_kelas")}</h1>
                    
                        <button className='btn btn-sm btn-success mr-3 my-4 text-white font-semibold' onClick={onDownload}><i className="fa-solid fa-download mr-3"></i>Unduh</button>
                </div>

                <table className="table table-compact w-full" ref={tableRef}>
                    <TableHeaderExport url={url} />
                    <thead>
                        <tr className='text-center'>
                            <th>No</th>
                            <th>Nama</th>
                            {uniqueCol.map((col, _i) => (
                                <th key={_i} colSpan={totalCol[col]}>{col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr >
                            <td colSpan={2} className="text-center">Tanggal</td>
                            {Object.keys(sampel).filter(k => k != "nama").map((key, _i) => (
                                <td key={_i} className="border-l-2">{formatTanggal(key.split("|")[1])}</td>
                            ))}
                        </tr>
                        {
                            finalResult.map((r, _i) => (
                                <tr key={_i} >
                                    <td>{_i + 1}</td>
                                    {Object.keys(r).map((k, _i) => (
                                        <td key={_i} className="border-l-2">{r[k]}</td>
                                    ))}
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}

export default Show