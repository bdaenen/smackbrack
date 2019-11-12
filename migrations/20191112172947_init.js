exports.up = async function(knex, Promise) {
    await knex.schema.createTable('tournament', function(table) {
        table.increments();
        table.integer('board_id').unsigned();
        table.integer('challonge_id').unsigned();
    });
};

exports.down = async function(knex, Promise) {
    await knex.schema.dropTable('tournament');
};
