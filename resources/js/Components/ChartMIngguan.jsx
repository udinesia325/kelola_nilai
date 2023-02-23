import formatDay from '@/helpers/formatDay'
import formatTanggal from '@/helpers/formatTanggal'
import getDay from '@/helpers/getDay'
import hexaGenerator from '@/helpers/hexaGenerator'
import React, { useEffect, useState } from 'react'
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'

export default function Chartjs() {
    const [jenis, setJenis] = useState([])
    const [mingguan, setMingguan] = useState([])
    const [dataChart, setDataChart] = useState([])
    const namaHari = ["Senin", "Selasa", "Rabu", "Kamis", "Sabtu", "Minggu"]
    // untuk tanggal awal dan akhir minggu
    const [tanggal, setTanggal] = useState({})
    useEffect(() => {
        fetch(route("api.jenis"))
            .then(response => response.json())
            .then(data => {
                setJenis([...data.map(d => {
                    return {
                        ...d,
                        hexa: hexaGenerator()
                    }
                })])
            })
        fetch(route("api.rekapan.mingguan"))
            .then(response => response.json())
            .then(data => {
                setMingguan([...data.mingguan.map(min => {
                    return { ...min, hari: getDay(min.created_at) }
                })])
                setTanggal({ ...data.tanggal })
            })

    }, [])
    useEffect(() => {
        // untuk membuat data chart
        if (mingguan.length == 0) return
        const result = [];

        namaHari.forEach(hari => {
            result.push({ name: hari })
        })
        // tambahkan jenis nilai untuk tiap hari
        for (let i = 0; i < result.length; i++) {
            const element = result[i];
            jenis.forEach(jn => {
                result[i] = {
                    ...result[i],
                    [jn.nama_nilai]: 0,
                    amt: 0
                }
            })
        }
        // isi nilai berdasarkan database

        setDataChart([...result.map(res => {
            let temp = res
            //looping tiap mingguan dan isi nilainya berdasarkan data mingguan dari database
            for (let j = 0; j < mingguan.length; j++) {
                if (mingguan[j].hari == temp.name) {
                    temp[mingguan[j].nama_nilai] += mingguan[j].total
                    temp.amt = mingguan[j].total
                }
            }
            return temp
        })])
    }, [mingguan])

    // console.log("mingguan", mingguan);
    // console.log("data chart", dataChart);
    // acak hexa nya saja jika tidak sesuai
    function acakHexa() {
        setJenis([...jenis.map((jn) => {
            return {
                ...jn,
                hexa: hexaGenerator()
            }
        })])
    }
    return (
        <div className='flex-1'>
            <h1 className='text-3xl font-bold mb-3 block ml-16'>Penilaian seminggu terakhir</h1>
            <p className='ml-16 mb-4'>{formatTanggal(tanggal.awal)} - {formatTanggal(tanggal.akhir)}</p>
            <LineChart width={600} height={350} data={dataChart}
                margin={{  }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {jenis.length && jenis.map((j, _i) => (
                    <Line type="basis" dataKey={j.nama_nilai} stroke={j.hexa} key={_i} />

                ))}
            </LineChart>
            <button onClick={acakHexa} className="block btn btn-sm btn-secondary my-3 ml-10">Acak Warna</button>
        </div>
    )
}
