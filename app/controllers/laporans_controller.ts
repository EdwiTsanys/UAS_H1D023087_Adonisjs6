import type { HttpContext } from '@adonisjs/core/http'
import Lokasi from '#models/lokasi'
//import Barang from '#models/barang'

export default class LaporanController {
  async index({ view }: HttpContext) {
    // Ambil semua lokasi dan preload barang-barangnya
    const lokasis = await Lokasi.query().preload('barangs', (query) => {query.preload('kategori')})

    // Hitung total barang per lokasi
    const dataLaporan = lokasis.map((lokasi) => {
      const total = lokasi.barangs.reduce((sum, b) => sum + b.jumlah, 0)
      return {
        nama_lokasi: lokasi.nama_lokasi,
        gedung: lokasi.gedung,
        total,
        barangs: lokasi.barangs,
      }
    })

    return view.render('laporan/index', { dataLaporan })
  }
}
