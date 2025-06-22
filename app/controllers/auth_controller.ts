import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  showRegister({ view }: HttpContext) {
    return view.render('auth/register')
  }

  async register({ request, response, auth }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.create({ email, password })
    await auth.use('web').login(user)
    
    // Redirect ke barang setelah register
    return response.redirect('/login')
  }

  showLogin({ view }: HttpContext) {
    return view.render('auth/login')
  }

  async login({ request, response, auth }: HttpContext) {
  const { email, password } = request.only(['email', 'password'])

  // 1. Cari user berdasarkan email
  const user = await User.findBy('email', email)

  // 2. Kalau user tidak ditemukan
  if (!user) {
    return response.redirect('/login') // atau tampilkan pesan gagal
  }

  // 3. Cek password
  const isPasswordValid = await hash.verify(user.password, password)

  if (!isPasswordValid) {
    return response.redirect('/login') // password salah
  }

  // 4. Login user
  await auth.use('web').login(user)

  // 5. Redirect ke halaman barang
  return response.redirect('/barang')
}

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect('/')
  }
}
