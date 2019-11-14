const { Model, snakeCaseMappers } = require('objection');
const Knex = require('knex');

// Initialize knex.
const knex = Knex({
    client: 'mysql',
    useNullAsDefault: true,
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
});

// Give the knex object to objection.
Model.knex(knex);

class Tournament extends Model {
    static get tableName() {
        return 'tournament';
    }

    static get idColumn() {
        return 'id';
    }

    static get columnNameMappers() {
        return snakeCaseMappers({ upperCase: false });
    }

    static get modelPaths() {
        return [__dirname];
    }
}

module.exports = Tournament;
