import type { HttpContext } from '@adonisjs/core/http'
import Lokasi from '#models/lokasi'

export default class LokasiController {
  async index({ view }: HttpContext) {
    const lokasis = await Lokasi.all()
    return view.render('lokasi/index', { lokasis })
  }

  async create({ view }: HttpContext) {
    return view.render('lokasi/create')
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['nama_lokasi', 'gedung'])
    await Lokasi.create(data)
    return response.redirect('/lokasi')
  }

  async edit({ params, view }: HttpContext) {
    const lokasi = await Lokasi.findOrFail(params.id)
    return view.render('lokasi/edit', { lokasi })
  }

  async update({ params, request, response }: HttpContext) {
    const lokasi = await Lokasi.findOrFail(params.id)
    const data = request.only(['nama_lokasi', 'gedung'])
    lokasi.merge(data)
    await lokasi.save()
    return response.redirect('/lokasi')
  }

  async destroy({ params, response }: HttpContext) {
    const lokasi = await Lokasi.findOrFail(params.id)
    await lokasi.delete()
    return response.redirect('/lokasi')
  }
}
