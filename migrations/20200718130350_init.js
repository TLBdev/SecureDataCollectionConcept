
exports.up = function (knex) {
    return knex.schema.createTable('users', users => {
        users.increments()
        users.string('username', 256)
            .notNullable()
            .unique()
        users.string('password', 256).notNullable()
        users.string('name', 256).notNullable()
        users.boolean('active').notNullable()
        users.timestamps(true, true)

    })
        .createTable('subjects', tbl => {
            tbl.increments()
            tbl.string('name', 256).notNullable()
            tbl.string('dateofbirth', 256).notNullable()
            tbl.string('address', 256).notNullable()
            tbl.string('name_dob_add', 500).notNullable().unique()
            tbl.timestamps(true, true)
        })
        .createTable('data', tbl => {
            tbl.increments()
            tbl.string('user_id')
                .notNullable()
            tbl.integer('height', 256).notNullable()
            tbl.integer('weight', 256).notNullable()
            tbl.boolean('smoker').notNullable()
            tbl.string('interviewer_id', 256).notNullable()
            tbl.timestamps(true, true)
        })
        .createTable('accesses', tbl => {
            tbl.increments()
            tbl.integer('user_id').notNullable()
            tbl.string('username', 256).notNullable()
            tbl.string('name', 256).notNullable()
            tbl.string('request_type', 256).notNullable()
            tbl.string('request_target', 256).notNullable()
            tbl.string('request_origin', 256).notNullable()
            tbl.timestamps(true, true)
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('users')
        .dropTableIfExists('subjects')
        .dropTableIfExists('data')
        .dropTableIfExists('messages')
};
