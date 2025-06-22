import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Barang from './barang.js'

export default class Lokasi extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nama_lokasi: string

  @column()
  declare gedung: string

  @hasMany(() => Barang, { foreignKey: 'lokasi_id' })
  declare barangs: HasMany<typeof Barang>
}
