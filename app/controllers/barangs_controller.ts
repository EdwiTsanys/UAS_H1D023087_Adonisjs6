import type { HttpContext } from '@adonisjs/core/http'
import Barang from '#models/barang'
import Kategori from '#models/kategori'
import Lokasi from '#models/lokasi'

export default class BarangController {
  async index({ view }: HttpContext) {
    const barangs = await Barang.query().where('dihapus', false).preload('kategori').preload('lokasi')
    return view.render('barang/index', { barangs })
  }

  async create({ view }: HttpContext) {
    const kategoris = await Kategori.all()
    const lokasis = await Lokasi.all()
    return view.render('barang/create', { kategoris, lokasis })
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['nama', 'kode_barang', 'kategori_id', 'lokasi_id', 'jumlah'])
    await Barang.create(data)
    return response.redirect('/barang')
  }

  async edit({ params, view }: HttpContext) {
    const barang = await Barang.findOrFail(params.id)
    const kategoris = await Kategori.all()
    const lokasis = await Lokasi.all()
    return view.render('barang/edit', { barang, kategoris, lokasis })
  }

  async update({ params, request, response }: HttpContext) {
    const barang = await Barang.findOrFail(params.id)
    const data = request.only(['nama', 'kode_barang', 'kategori_id', 'lokasi_id', 'jumlah'])
    barang.merge(data)
    await barang.save()
    return response.redirect('/barang')
  }

  async destroy({ params, response }: HttpContext) {
    const barang = await Barang.findOrFail(params.id)

    if (barang.sedang_dimutasi) {
      return response.redirect('/barang')
    }

    await barang.delete()
    return response.redirect('/barang')
  }
}
