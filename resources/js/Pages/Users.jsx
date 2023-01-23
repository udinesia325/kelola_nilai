import Layout from '@/Layouts/Layout';
import { Head, useForm } from '@inertiajs/react';

export default function Users(props) {
    const { users,flash } = props
 
    const { data, setData, post, progress, processing, } = useForm({
        file: null
    })
    console.log(props);
    function submit(e) {
        e.preventDefault()
        post('/users/import')
    }
 
    return (
        <Layout>
            <Head title="Dashboard" />
            {flash.message && (<h1>{flash.message}</h1>)}
            {/* start modal */}
            {/* The button to open modal */}
            <label htmlFor="my-modal" className="btn btn-sm btn-success mb-4 font-bold text-white">Import User</label>

            <input type="checkbox" id="my-modal" className="modal-toggle"  />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Masukkan File Excel</h3>
                    <div className="py-4">
                        <form className='my-8 flex flex-row justify-center items-center gap-2' onSubmit={submit}>
                            <input type="file" accept='xls, xlsx' onChange={e => setData('file', e.target.files[0])} className="file-input file-input-bordered file-input-success file-input-sm w-full max-w-xs" />
                            <button className="btn btn-sm btn-success w-[75px]" disabled={processing} type='submit' htmlFor="my-modal">Import</button>
                        </form>
                    </div>
                    <div className="modal-action">
                        <label htmlFor="my-modal" className="btn btn-sm">Tutup</label>
                    </div>
                </div>
            </div>
            {/* end modal */}
            {progress && 
            <progress className="progress progress-success w-56 block mb-4" value={progress.percentage} max="100"></progress>
            }
            <div className="overflow-x-auto w-full">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Email</th>

                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, _i) => (
                            <Row key={_i} username={user.name} email={user.email} />
                        ))
                        }
                    </tbody>

                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </tfoot>

                </table>
            </div>
        </Layout>
    );
}
function Row({ username, email }) {
    return (
        <tr>
            <th>
                <label>
                    <input type="checkbox" className="checkbox" />
                </label>
            </th>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <i className="fa-solid fa-user-tie m-auto text-2xl"></i>
                        </div>
                    </div>

                </div>
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