import { Kysely, SqliteDatabase } from 'kysely'

/** Migration used to initialize empty database tables for the test database. */
export async function up(db: Kysely<SqliteDatabase>) {
  await db.schema
    .createTable('screenings')
    .ifNotExists()
    .addColumn('id', 'integer', (c) => c.notNull())
    .addColumn('movie_id', 'integer', (c) =>
      c.notNull().references('movies.id')
    )
    .addColumn('date', 'datetime', (c) => c.notNull())
    .addColumn('tickets_id', 'integer', (c) =>
      c.notNull().references('tickets.id')
    )
    .execute()

  await db.schema
    .createTable('tickets')
    .ifNotExists()
    .addColumn('id', 'integer', (c) => c.notNull())
    .addColumn('total', 'integer', (c) => c.notNull())
    .addColumn('left', 'integer', (c) => c.notNull())
    .execute()
}

export async function down(db: Kysely<SqliteDatabase>) {
  db.schema.dropTable('screenings')
  db.schema.dropTable('tickets')
}
