const _ = require('lodash');
const moment = require('moment');
const { 
    annualEventService,
    happenedEventService
} = require('../../service/index.service');

const eventController = module.exports

eventController.detailEvent = async(req, res) => {
    const googleId = req.cookies['google_account_id'];

    const event = await annualEventService.findByTitle(req.params.slug);
    const data = event.dataValues

    const events = await annualEventService.findAll();
    const dataEvents = events.map(event => event.dataValues);

    res.render('user/event-detail', { data, dataEvents , googleId });
}

eventController.eventPage = async(req, res) => {
    const googleId = req.cookies['google_account_id'];

    const events = await annualEventService.findAll();
    const dataEvents = events.map(event => event.dataValues);
    const happenedEvents = await happenedEventService.findAll()
    const dataHappenEvents = happenedEvents.map(event => {
        event.dataValues.action_time = _.head(event.dataValues.action_time.split(':'))
        return event.dataValues;
    });
    const years = [];
    for(i = 2010; i <= moment().year(); i++) {
        years.push({ year: i});
    }


    res.render('user/event-page', { dataEvents, dataHappenEvents, years , googleId})
}

eventController.happenedEventDetail = async(req, res) => {
    const googleId = req.cookies['google_account_id'];

    const happenedEvent = await happenedEventService.findEventByTimeAndTitle(req.query.year, req.query.event_name)
    const happenedEventDetail = happenedEvent.dataValues
    const events = await annualEventService.findAll()
    const dataEvents = events.map(event => event.dataValues);
    res.render('user/happened-event-detail', { happenedEventDetail, dataEvents, googleId})
}

eventController.homepage = async(req, res) => {
    const googleId = req.cookies['google_account_id'];

    const events = await annualEventService.findAll();
    const dataEvents = events.map(event => event.dataValues);


    res.render('user/home-page', { dataEvents , googleId})
}

eventController.filterEvent = async(req, res) => {
    const year = req.body.year;
    const happened_events = await happenedEventService.filter({ year });
    const filtered_events = happened_events.map(event => _.get(event, 'dataValues'));

    res.json(filtered_events);
}