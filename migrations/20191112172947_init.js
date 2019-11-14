exports.up = async function(knex, Promise) {
    await knex.schema.createTable('tournament', function(table) {
        table.increments();
        table.string('name').notNullable();
        table.integer('smashtrack_id').unsigned();
        table.integer('challonge_id').unsigned();
        table.integer('last_match_id').unsigned();
        table.boolean('active');
        table.enu('tournament_type', ['single elimination', 'double elimination', 'round robin', 'swiss']);
    });
};

exports.down = async function(knex, Promise) {
    await knex.schema.dropTable('tournament');
};
