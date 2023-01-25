import Layout from '@/Layouts/Layout'
import { useForm } from '@inertiajs/react'
import React from 'react'

function Create(props) {
  const { jenis, mapel, siswa } = props.data
  const { user } = props.auth
  const { data, setData, post } = useForm({
    "data_nilai": [...siswa.map(s => {
      return {
        nilai: 0,
        mapel,
        nama: s.nama_siswa,
        siswa_id: s.id,
        nilai_id: jenis.id,
        user_id: user.id,
      }
    })]

  })
  function submit(e) {
    e.preventDefault()
    post("/nilai/store");
  }
  // console.log(data.data_nilai);
  function handleSetData(siswa_id, event) {
    setData("data_nilai", [...data.data_nilai.map((data) => {
      if (data.siswa_id == siswa_id) {
        return { ...data, nilai: event.target.value }
      }
      return { ...data }
    })])
  }
  console.log(props);
  return (
    <Layout>
      <form onSubmit={submit}>
        <button className="btn btn-sm btn-active block ml-auto mr-4 my-3">Simpan</button>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Nilai</th>

              </tr>
            </thead>
            <tbody>
              {data.data_nilai && data.data_nilai.map((s, i) => (
                <tr key={i} className="hover">
                  <th>{i + 1}</th>
                  <td>{s.nama}</td>
                  <td>
                    <div className="form-control w-full max-w-xs">
                      <label className="label">
                        <span className="label-text">Masukkan Nilai</span>
                      </label>
                      <input type="number" placeholder="Ketik Disini" className="input input-sm input-bordered w-full max-w-xs" value={s.nilai} onChange={handleSetData.bind(this, s.siswa_id)} />

                    </div>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
        <button className="btn btn-sm btn-active block ml-auto mr-4 my-3">Simpan</button>
      </form>
    </Layout>
  )
}

export default Create