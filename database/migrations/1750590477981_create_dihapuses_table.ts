import { BaseSchema } from '@adonisjs/lucid/schema'

export default class AddDihapusToBarangs extends BaseSchema {
  protected tableName = 'barangs'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean('dihapus').defaultTo(false)
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('dihapus')
    })
  }
}
