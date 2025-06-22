import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Barang from './barang.js'
import Lokasi from './lokasi.js'

export default class RiwayatMutasi extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare barang_id: number

  @column()
  declare asal: number

  @column()
  declare tujuan: number

  @column()
  declare tanggal: Date

  @belongsTo(() => Barang, {foreignKey: 'barang_id',})
  declare barang: BelongsTo<typeof Barang>

  @belongsTo(() => Lokasi, {foreignKey: 'asal',})
  declare asalLokasi: BelongsTo<typeof Lokasi>

  @belongsTo(() => Lokasi, {foreignKey: 'tujuan'})
  declare tujuanLokasi: BelongsTo<typeof Lokasi>
}
