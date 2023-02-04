import Alert from '@/Components/Alert';
import mapel from '@/constans/mapel';
import formatDay from '@/helpers/formatDay';
import formatTanggal from '@/helpers/formatTanggal';
import Layout from '@/Layouts/Layout';
import { router, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';


function Index(props) {
    const { kelas, jenis, nilai } = props.data
    const [show, setShow] = useState(false)
    const [modalDelete, setModalDelete] = useState(false)
    const [dataDelete, setDataDelete] = useState({})
    const { data, setData, post, get } = useForm({
        "mapel": null,
        "created_at": null,
        "user_id": props.auth.user.id,
        "kelas": null,
        "jenis": null
    })

    function submit(dataCard, event) {
        // atur body request berdasarkan bind data dari tombol
        setData({
            "mapel": dataCard.mapel,
            "kelas": dataCard.kelas,
            "jenis": dataCard.jenis,
            "created_at": dataCard.created_at,
            "user_id": props.auth.user.id
        });
        // set kondisi agar siap di update
        setShow(true)
    }
    useEffect(() => {
        // update jika sudah siap
        if (show) {
            get("/nilai/show")
        }
    }, [show])
    function deleteNilai(data, event) {
        setModalDelete(true)
        setDataDelete(data)
    }
    function confirmDelete() {
        router.delete(route("nilai.delete"), { data: dataDelete })
        setModalDelete(false)
    }
    console.log(nilai);
    return (
        <Layout>
            {props.flash.message ? <Alert>{props.flash.message}</Alert> : null}

            {/* The button to open modal */}
            <label htmlFor="my-modal" className="btn btn-primary btn-sm"><i className="fa-regular fa-pen-to-square mr-4"></i>Buat</label>
            {/* modal delete */}

            {/* Put this part before </body> tag */}
            <div className={`modal ${modalDelete ? "modal-open" : ""}`}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Konfirmasi !</h3>
                    <p className="py-4">Apakah anda yakin ingin menghapus ?</p>
                    <div className="modal-action">
                        <label className="btn btn-sm btn-success " onClick={() => setModalDelete(false)}>Batal</label>
                        <label className="btn btn-sm btn-error " onClick={confirmDelete}>Ya</label>
                    </div>
                </div>
            </div>

            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Masukkan Kriteria Penilaian</h3>
                    <form action={route("nilai.create")}>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Nama Mapel</span>
                            </label>
                            <input type="text" list='mapel' required name='mapel' className="input input-bordered w-full max-w-xs" />
                            <datalist id="mapel">
                                {mapel.map((m, _i) => (
                                    <option key={_i} value={m} />
                                ))}
                            </datalist>
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
                        <button className="btn-primary btn-sm px-4 my-3 rounded-md">Kirim</button>
                    </form>
                    <div className="modal-action">
                        <label htmlFor="my-modal" className="btn btn-outline btn-error btn-sm">Tutup</label>
                    </div>
                </div>
            </div>
            {/* tabel nilai */}
            {/* jika penilaian masih kosong */}
            {nilai.length == 0 && (<h1 className='text-center font-bold text-2xl'>Data penilaian masih kosong !</h1>)}
            <div className="overflow-x-auto mt-4 ">
                <table className="table table-zebra table-compact w-full">
                    <thead>
                        {nilai.length != 0 &&
                            <tr>
                                <th>No</th>
                                <th>Kelas</th>
                                <th>Mapel</th>
                                <th>Jenis Nilai</th>
                                <th>Dibuat pada</th>
                                <th>Aksi</th>

                            </tr>
                        }
                    </thead>
                    <tbody>
                        {nilai.map((n, _i) => (
                            <tr key={_i} className="hover">
                                <th>{_i + 1}</th>
                                <td>{n.nama_kelas}</td>
                                <td>{n.mapel}</td>
                                <td>{n.nama_nilai}</td>
                                <td>{formatTanggal(n.created_at)}</td>
                                <td>
                                    <button className="btn btn-sm btn-error mr-4" onClick={deleteNilai.bind(this, n)}><i className="fa-solid fa-trash text-white"></i></button>
                                    <button className="btn btn-sm btn-primary" onClick={submit.bind(this, n)}><i className="fa-solid fa-eye"></i></button>

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
