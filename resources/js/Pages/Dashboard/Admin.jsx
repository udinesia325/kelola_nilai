import Chartjs from '@/Components/ChartMIngguan'
import Layout from '@/Layouts/Layout'
import React from 'react'

export default function Admin(props) {
    const { nilai_tersimpan, guru, kelas } = props
    // console.log(props);
    return (
        <Layout>
            <div className="flex gap-x-2 gap-y-4 flex-wrap ">
                <div className="flex-1 card w-full max-w-sm min-w-[200px] bg-base-100 shadow-xl">
                    <div className="card-body flex flex-row justify-between">
                        <div className="left"> <h2 className="card-title text-3xl font-black">{nilai_tersimpan}</h2>
                            <p className='text-slate-700'>Nilai tersimpan</p>
                        </div>
                        <div className="right my-auto bg-sky-500 p-4 aspect-square  rounded-md">
                            <i className="fa-solid fa-book fa-2x"></i>
                        </div>

                    </div>
                </div>
                <div className="flex-1 card w-full max-w-sm min-w-[200px] bg-base-100 shadow-xl">
                    <div className="card-body flex flex-row justify-between">
                        <div className="left"> <h2 className="card-title text-3xl font-black">{guru}</h2>
                            <p className='text-slate-700'>Guru</p>
                        </div>
                        <div className="right my-auto bg-indigo-500 p-4 aspect-square  rounded-md">
                            <i className="fa-solid fa-users fa-2x"></i>
                        </div>

                    </div>
                </div>
                <div className="flex-1 card w-full max-w-sm min-w-[200px] bg-base-100 shadow-xl">
                    <div className="card-body flex flex-row justify-between">
                        <div className="left"> <h2 className="card-title text-3xl font-black">{kelas}</h2>
                            <p className='text-slate-700'>Kelas</p>
                        </div>
                        <div className="right my-auto bg-yellow-400 p-4 aspect-square  rounded-md">
                            <i className="fa-solid fa-school fa-2x"></i>
                        </div>

                    </div>
                </div>
            </div>
            <Chartjs />
        </Layout>
    )
}
