var sqlite3 = require('sqlite3').verbose();

const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message);
        throw err;
    } else {
        db.run(`CREATE TABLE event (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            unit text, 
            eventList text, 
            theme text, 
            content text, 
            fromDate text, 
            fromTime text 
            )`,
            (err) => {
                if (err) {
                    console.log(err, 'table already created');
                } else {
                    // Table just created, creating some rows
                    var insert = 'INSERT INTO event (name, unit, eventList, theme, content, fromDate, fromTime) VALUES (?,?,?,?,?,?,?)';
                    db.run(insert, ["admin", "main acc", "кюшац", "lunch", "kartoha s kuricej", "2020-03-19", "12:38"]);
                    db.run(insert, ["someone", "muggle", "поглазеть", "watch", "just chillin", "2002-02-19", "11:38"]);
                }
            });
    }
});


module.exports = db;
