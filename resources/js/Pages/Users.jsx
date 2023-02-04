import Alert from '@/Components/Alert';
import Layout from '@/Layouts/Layout';
import { Head, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Users(props) {
    const { users, flash } = props
    const [modal, setModal] = useState(false)
    const { data, setData, post, progress, processing, } = useForm({
        file: null
    })
    // console.log(props);
    function submit(e) {
        e.preventDefault()
        post('/users/import')
    }
    function handleShow() {
        setModal(true)
    }
    function handleHide() {
        setModal(false)
    }
    useEffect(() => {
        if (flash.message) {
            setModal(false)
        }
    }, [flash])

    return (
        <Layout>

            <Head title="Dashboard" />

            {/* start modal */}
            {/* The button to open modal */}
            <label className="btn btn-sm btn-success mb-4 font-bold text-white" onClick={handleShow}><i className="fa-solid fa-arrow-up-from-bracket mr-4"></i> User</label>
            <input type="checkbox" className="modal-toggle" />

            {/* jika ada flash message maka tampilkan alert dan hilangkan modal */}

            <div className={`modal ${modal ? "modal-open" : ""}`}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Masukkan File Excel</h3>
                    <div className="py-4">
                        <form className='my-8 flex flex-row justify-center items-center gap-2' onSubmit={submit}>
                            <input type="file" accept='xls, xlsx' onChange={e => setData('file', e.target.files[0])} className="file-input file-input-bordered file-input-success file-input-sm w-full max-w-xs" />
                            <button className="btn btn-sm btn-success w-[75px]  text-white font-bold" disabled={processing} type='submit' htmlFor="my-modal">Import</button>
                        </form>
                    </div>
                    <div className="modal-action">
                        <label className="btn btn-sm" onClick={handleHide}> Tutup</label>
                    </div>
                </div>
            </div>
            {flash.message && <Alert>{flash.message}</Alert>}

            {/* end modal */}
            {progress &&
                <progress className="progress progress-success w-56 block mb-4" value={progress.percentage} max="100"></progress>
            }
            <div className="overflow-x-auto w-full min-w-full max-w-md md:max-w-full ">
                <table className="table table-zebra w-full">

                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, _i) => (
                            <Row key={_i} username={user.name} email={user.email} no={_i + 1} />
                        ))
                        }
                    </tbody>

                    <tfoot>
                        <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Email</th>
                        </tr>
                    </tfoot>

                </table>
            </div>
        </Layout>
    );
}
function Row({ no, username, email }) {
    return (
        <tr className='hover'>
            <td>{no}</td>
            <td>
                <div className="font-bold">{username}</div>

            </td>
            <td>
                <div>
                    <div className="font-bold">{username}</div>
                    <div className="text-sm opacity-50">{email}</div>
                </div>
            </td>
        </tr>

    )
}