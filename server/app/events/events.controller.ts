import {Body, Controller, Get, HttpException, HttpStatus, Post, Query, Req, Res} from '@nestjs/common';
import Send from '../../model/events/send.model';
let db = require('../../database/database.js');

@Controller('api')
export class EventsController {
    // GET event
    @Get('get/event')
    async getEvent(@Res() res:any, @Query() query:any):Promise<any> {
        console.log('event search!');
        console.log(query);
        var sql = "SELECT * FROM event WHERE theme LIKE ?";
        var formattedParam = '%' + query.search + '%';
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

    //POST event
    @Post('post/event')
    async sendEvent(@Body() body: Send, @Res() res): Promise<any> {
        console.log('event sent!');
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
