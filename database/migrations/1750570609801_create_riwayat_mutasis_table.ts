import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'riwayat_mutasis'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('barang_id').unsigned().references('id').inTable('barangs').onDelete('CASCADE')
      table.integer('asal').unsigned().references('id').inTable('lokasis')
      table.integer('tujuan').unsigned().references('id').inTable('lokasis')
      table.date('tanggal').notNullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}