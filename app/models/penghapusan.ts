import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Barang from './barang.js'

export default class Penghapusan extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare barang_id: number

  @column()
  declare alasan: string

  @column()
  declare tanggal: Date

  @belongsTo(() => Barang, {foreignKey: 'barang_id',})
  declare barang: BelongsTo<typeof Barang>
}
