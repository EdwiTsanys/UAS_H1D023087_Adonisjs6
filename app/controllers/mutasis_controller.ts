import type { HttpContext } from '@adonisjs/core/http'
import Barang from '#models/barang'
import Lokasi from '#models/lokasi'
import RiwayatMutasi from '#models/riwayat_mutasi'
import { DateTime } from 'luxon'

export default class MutasiController {
  async index({ view }: HttpContext) {
    const mutasi = await RiwayatMutasi.query()
        .preload('barang')
        .preload('asalLokasi')
        .preload('tujuanLokasi')

    return view.render('mutasi/index', { mutasi })
  }

  async create({ view }: HttpContext) {
    const barangs = await Barang.query().preload('lokasi')
    const lokasis = await Lokasi.all()
    return view.render('mutasi/create', { barangs, lokasis })
  }

  async store({ request, response }: HttpContext) {
    const { barang_id, tujuan } = request.only(['barang_id', 'tujuan'])

    const barang = await Barang.findOrFail(barang_id)
    const asal = barang.lokasi_id

    barang.lokasi_id = tujuan
    barang.sedang_dimutasi = true // bisa dimatikan nanti jika mutasi selesai
    await barang.save()

    await RiwayatMutasi.create({
      barang_id,
      asal,
      tujuan,
      tanggal: DateTime.local().toJSDate(),
    })

    return response.redirect('/mutasi')
  }
}
