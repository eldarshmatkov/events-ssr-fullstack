import {Body, Controller, Get, HttpException, HttpStatus, Post, Query, Req, Res} from '@nestjs/common';
import Event from './event.model';
import {EventsService} from './events.service';

@Controller('api')
export class EventsController {
    constructor(private readonly eventsService: EventsService) {

    }
    // GET event
    @Get('get/event')
    async getEvent(@Res() res: Response, @Query('search') query:string): Promise<any> {
        this.eventsService.getEvent(res, query);
    }

    //POST event
    @Post('post/event')
    async sendEvent(@Body() body: Event, @Res() res: Response): Promise<any> {
        this.eventsService.sendEvent(body, res);
    }


}
