import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'barangs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nama').notNullable()
      table.string('kode_barang').notNullable().unique()
      table.integer('kategori_id').unsigned().references('id').inTable('kategoris').onDelete('CASCADE')
      table.integer('lokasi_id').unsigned().references('id').inTable('lokasis').onDelete('CASCADE')
      table.integer('jumlah').unsigned().notNullable()
      table.boolean('sedang_dimutasi').defaultTo(false)
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}