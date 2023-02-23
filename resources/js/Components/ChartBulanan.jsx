import formatTanggal from '@/helpers/formatTanggal'
import hexaGenerator from '@/helpers/hexaGenerator'
import { usePage } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export default function ChartBulanan() {
    const { auth } = usePage().props
    const [jenis, setJenis] = useState([])
    const [dataChart, setDataChart] = useState([])
    const [tanggal, setTanggal] = useState({})
    useEffect(() => {
        fetch(route("api.jenis"))
            .then(response => response.json())
            .then(data => {
                setJenis([...data.map(d => {
                    return {
                        ...d,
                        hexa: hexaGenerator(),
                        total: 0
                    }
                })])
            })

    }, [])
    useEffect(() => {
        if (jenis.length == 0) return
        fetch(route("api.rekapan.bulanan") + "?email=" + auth.user.email)
            .then(response => response.json())
            .then(data => {
                // buat tanggal awal dan akhir bulan
                setTanggal(data.tanggal)
                // buat variabel tampungan
                let result = {};

                // buat key dari tiap jenis
                jenis.forEach(j => {
                    result[j.nama_nilai] = {
                        nama_nilai: j.nama_nilai,
                        total: 0,
                        fullMark: 0,
                        hexa: j.hexa
                    }
                })


                // naikkan tiap total dari data rekapan backend
                data.bulanan.forEach(d => {
                    if (result[d.nama_nilai]) {
                        result[d.nama_nilai].total++
                        result[d.nama_nilai].fullMark++
                    }
                });
                // jadikan array
                setDataChart(Object.values(result))
            })
    }, [jenis])

    if (dataChart.length == 0) return "..."

    return (
        <div className='flex-1 w-full max-w-[650px] h-[350px]'>
            <h1 className='text-3xl font-bold mb-3 block ml-16'>Penilaian Bulan ini</h1>
            <p className='ml-16 mb-4'>{formatTanggal(tanggal.awal)} - {formatTanggal(tanggal.akhir)}</p>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={50}
                    height={700}
                    data={dataChart}
                    barGap={5}
                    barSize={20}
                    margin={{
                        
                    }}
                >
                    <CartesianGrid strokeDasharray="4 1 2"  />
                    <XAxis dataKey="nama_nilai" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total" fill="#2596be" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
