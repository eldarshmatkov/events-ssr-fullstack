import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import Event from './event.model';
let db = require('../../database/database.js');

@Injectable()
export class EventsService {
    getEvent(res: any, query: string) {
        var sql = "SELECT * FROM event WHERE theme LIKE ?";
        var formattedParam = '%' + query + '%';
        var params = [formattedParam];
        db.all(sql, params, (err, rows) => {
            console.log(rows, 'ROWS!!');
            if (err) {
                throw new HttpException({error: err.message}, HttpStatus.BAD_REQUEST);
            }
            res.json({
                "message": "success",
                "data": rows
            })
        });
    }

    sendEvent(body: Event, res: any) {
        var errors = [];
        if (!body.name) {
            errors.push("No name specified");
        }
        if (!body.unit) {
            errors.push("No unit specified");
        }
        if (!body.eventList) {
            errors.push("No eventList specified");
        }
        if (!body.theme) {
            errors.push("No theme specified");
        }
        if (!body.content) {
            errors.push("No content specified");
        }

        if (errors.length) {
            throw new HttpException({error: errors.join(",")}, HttpStatus.BAD_REQUEST);
        }
        var data = {
            name: body.name,
            unit: body.unit,
            eventList: body.eventList,
            theme: body.theme,
            content: body.content,
            fromDate: body.fromDateMenu,
            fromTime: body.fromTimeMenu,
        };
        var sql = 'INSERT INTO event (name, unit, eventList, theme, content, fromDate, fromTime) VALUES (?,?,?,?,?,?,?)';
        var params = [data.name, data.unit, data.eventList, data.theme, data.content, data.fromDate, data.fromTime];
        db.run(sql, params, function (err, result) {
            if (err) {
                throw new HttpException({error: err.message}, HttpStatus.BAD_REQUEST);
            }
            res.json({
                "message": "success",
                "data": data,
            })
        });
    }
}
