const { Model, snakeCaseMappers } = require('objection');

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
