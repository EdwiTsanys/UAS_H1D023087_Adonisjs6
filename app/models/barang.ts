import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Kategori from './kategori.js'
import Lokasi from './lokasi.js'
import RiwayatMutasi from './riwayat_mutasi.js'
import Penghapusan from './penghapusan.js'

export default class Barang extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nama: string

  @column()
  declare kode_barang: string

  @column()
  declare jumlah: number

  @column()
  declare sedang_dimutasi: boolean

  @column()
  declare kategori_id: number

  @column()
  declare lokasi_id: number

  @column()
  declare dihapus: boolean


  @belongsTo(() => Kategori, {foreignKey: 'kategori_id',})
  declare kategori: BelongsTo<typeof Kategori>

  @belongsTo(() => Lokasi, {foreignKey: 'lokasi_id',})
  declare lokasi: BelongsTo<typeof Lokasi>

  @hasMany(() => RiwayatMutasi)
  declare riwayatMutasi: HasMany<typeof RiwayatMutasi>

  @hasMany(() => Penghapusan)
  declare penghapusans: HasMany<typeof Penghapusan>
}
