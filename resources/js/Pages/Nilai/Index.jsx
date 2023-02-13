import Alert from '@/Components/Alert';
import CreateNilai from '@/Components/CreateNilai';
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
    // console.log(nilai);
    return (
        <Layout>
            {props.flash.message ? <Alert>{props.flash.message}</Alert> : null}

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

            <CreateNilai />
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
