import type { HttpContext } from '@adonisjs/core/http'
import Barang from '#models/barang'
import Penghapusan from '#models/penghapusan'
import { DateTime } from 'luxon'

export default class PenghapusanController {
  async index({ view }: HttpContext) {
    const penghapusans = await Penghapusan.query().preload('barang')
    return view.render('penghapusan/index', { penghapusans })
  }

  async create({ view }: HttpContext) {
    // hanya barang yang tidak sedang dimutasi
    const barangs = await Barang.query().where('sedang_dimutasi', false)
    return view.render('penghapusan/create', { barangs })
  }

  async store({ request, response }: HttpContext) {
    const { barang_id, alasan } = request.only(['barang_id', 'alasan'])

    const barang = await Barang.findOrFail(barang_id)

    // Simpan ke riwayat penghapusan
    await Penghapusan.create({
      barang_id: barang.id,
      alasan,
      tanggal: DateTime.local().toJSDate(),
    })

    // Hapus barang dari inventaris
    barang.dihapus = true
    await barang.save()


    return response.redirect('/penghapusan')
  }
}
