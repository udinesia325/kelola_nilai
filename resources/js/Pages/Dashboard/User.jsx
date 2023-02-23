import ChartBulanan from '@/Components/ChartBulanan'
import CreateNilai from '@/Components/CreateNilai'
import Layout from '@/Layouts/Layout'
import { Head } from '@inertiajs/react'
import React from 'react'

export default function User() {
  return (
    <Layout>
      <Head title='Dashboard' />
      <CreateNilai />
      <br />
      <ChartBulanan />
    </Layout>
  )
}
