import Layout from '@/Layouts/Layout';


function Index(props) {
    const { kelas, jenis, nilai } = props.data
    console.log(nilai);
    // new Date('2023-01-25 04:07:52').toLocaleString('id', {weekday:'long'})
    function formatDay(date) {
        return new Date(date).toLocaleString('id', { weekday: 'long' })
    }
    return (
        <Layout>
            {/* The button to open modal */}
            <label htmlFor="my-modal" className="btn btn-primary btn-sm">Buat Nilai</label>


            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Masukkan Kriteria Penilaian</h3>
                    <form action={route("nilai.create")}>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Nama Mapel</span>
                            </label>
                            <input type="text" required name='mapel' className="input input-bordered w-full max-w-xs" />
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Kelas</span>
                                </label>
                                <select className="select select-bordered" name='kelas' defaultValue={kelas[0].id}>
                                    {kelas.map((k, i) => (
                                        <option key={i} value={k.id}>{k.nama_kelas}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Jenis Nilai</span>
                                </label>
                                <select className="select select-bordered" name='jenis' defaultValue={jenis[0].id}>
                                    {jenis.map((j, i) => (
                                        <option key={i} value={j.id}>{j.nama_nilai}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <button className="btn-primary px-8 py-2 my-3 rounded-md">Buat</button>
                    </form>
                    <div className="modal-action">
                        <label htmlFor="my-modal" className="btn btn-outline btn-error">Batal</label>
                    </div>
                </div>
            </div>
            <div className="flex flex-row flex-wrap gap-x-2 gap-y-5">
                {nilai.map((n, _i) => (
                    <div key={_i} className="card w-64 bg-base-100 shadow-xl flex-auto">
                        <div className="card-body">
                            <h2 className="card-title">{n.mapel}</h2>
                            <p>Nilai : {n.nama_nilai}</p>
                            <p className='text-slate-700'>Tanggal : {formatDay(n.created_at)} {n.created_at}</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-sm btn-primary">Lihat</button>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </Layout>
    )
}

export default Index