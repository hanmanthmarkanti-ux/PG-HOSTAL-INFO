const { getDb, saveDb } = require('./db');

function run(sql, params = []) {
    const db = getDb();
    db.run(sql, params);
    const lastId = db.exec("SELECT last_insert_rowid() as id");
    saveDb();
    return { lastInsertRowid: lastId.length ? lastId[0].values[0][0] : 0 };
}

function queryAll(sql, params = []) {
    const db = getDb();
    const stmt = db.prepare(sql);
    if (params.length) stmt.bind(params);
    const rows = [];
    while (stmt.step()) {
        const cols = stmt.getColumnNames();
        const vals = stmt.get();
        const row = {};
        cols.forEach((c, i) => row[c] = vals[i]);
        rows.push(row);
    }
    stmt.free();
    return rows;
}

function queryOne(sql, params = []) {
    const rows = queryAll(sql, params);
    return rows[0] || undefined;
}

module.exports = { run, queryAll, queryOne };
