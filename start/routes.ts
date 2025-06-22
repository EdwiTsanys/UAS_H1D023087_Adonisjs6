/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'


router.on('/').render('dashboard')

/** AUTH Routes (login/register/logout) */
router.get('/register', '#controllers/auth_controller.showRegister')
router.post('/register', '#controllers/auth_controller.register')

router.get('/login', '#controllers/auth_controller.showLogin')
router.post('/login', '#controllers/auth_controller.login')

router.post('/logout', '#controllers/auth_controller.logout')

//router.on('/').render('barang/index')

router.group(() => {
  router.get('/', '#controllers/barangs_controller.index')
  router.get('/create', '#controllers/barangs_controller.create')
  router.post('/', '#controllers/barangs_controller.store')
  router.get('/:id/edit', '#controllers/barangs_controller.edit')
  router.post('/:id', '#controllers/barangs_controller.update')
  router.post('/:id/delete', '#controllers/barangs_controller.destroy')
}).prefix('/barang')

router.group(() => {
  router.get('/', '#controllers/lokasis_controller.index')
  router.get('/create', '#controllers/lokasis_controller.create')
  router.post('/', '#controllers/lokasis_controller.store')
  router.get('/:id/edit', '#controllers/lokasis_controller.edit')
  router.post('/:id', '#controllers/lokasis_controller.update')
  router.post('/:id/delete', '#controllers/lokasis_controller.destroy')
}).prefix('/lokasi')

router.group(() => {
  router.get('/', '#controllers/mutasis_controller.index')
  router.get('/create', '#controllers/mutasis_controller.create')
  router.post('/', '#controllers/mutasis_controller.store')
}).prefix('/mutasi')

router.group(() => {
  router.get('/', '#controllers/penghapusans_controller.index')
  router.get('/create', '#controllers/penghapusans_controller.create')
  router.post('/', '#controllers/penghapusans_controller.store')
}).prefix('/penghapusan')

router.get('/laporan', '#controllers/laporans_controller.index')