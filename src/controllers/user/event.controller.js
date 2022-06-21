const _ = require('lodash');
const vn = require('sub-vn')
const moment = require('moment');
const { 
    annualEventService,
    happenedEventService,
    userService
} = require('../../service/index.service');

const { happened_event } = require('../../models')

const eventController = module.exports

eventController.detailEvent = async(req, res) => {
    const googleId = req.cookies['google_account_id'];

    const event = await annualEventService.findByTitle(req.params.slug);
    const data = event.dataValues

    const events = await annualEventService.findAll();
    const dataEvents = events.map(event => event.dataValues);

    let user= {
        email: ''
    };

    if(req.cookies.google_account_id) {
        user = _.get(await userService.findByGoogleAccountId(req.cookies.google_account_id), 'dataValues');
    }

    const pattern = /http/g
    if (!pattern.test(user.avatar_link)) {
        user.avatar_link = `/images/${user.avatar_link}`;
    }

    res.render('user/event-detail', { data, dataEvents , googleId , user });
}

eventController.eventPage = async(req, res) => {
    const googleId = req.cookies['google_account_id'];

    const events = await annualEventService.findAll();
    const dataEvents = events.map(event => event.dataValues);
    const happenedEvents = await happened_event.findAll();

    const dataHappenEvents = happenedEvents.map(event => {
    event.dataValues.action_time = _.head(event.dataValues.action_time.split(':'))
    return event.dataValues;
    });

    const years = [];
    for(i = 2010; i <= moment().year(); i++) {
        years.push({ year: i});
    }

    let user= {
        email: ''
    };

    if(req.cookies.google_account_id) {
        user = _.get(await userService.findByGoogleAccountId(req.cookies.google_account_id), 'dataValues');
    }

    const pattern = /http/g
    if (!pattern.test(user.avatar_link)) {
        user.avatar_link = `/images/${user.avatar_link}`;
    }

    res.render('user/event-page', { dataEvents, dataHappenEvents, years , googleId, user})
}

eventController.happenedEventDetail = async(req, res) => {
    const googleId = req.cookies['google_account_id'];

    const happenedEvent = await happenedEventService.findEventByTimeAndTitle(req.query.year, req.query.event_name)
    const happenedEventDetail = happenedEvent.dataValues
    const events = await annualEventService.findAll()
    const dataEvents = events.map(event => event.dataValues);

    const image_names = happenedEventDetail.image_name
    let user= {
        email: ''
    };

    if(req.cookies.google_account_id) {
        user = _.get(await userService.findByGoogleAccountId(req.cookies.google_account_id), 'dataValues');
    }

    const pattern = /http/g
    if (!pattern.test(user.avatar_link)) {
        user.avatar_link = `/images/${user.avatar_link}`;
    }
    res.render('user/happened-event-detail', { happenedEventDetail, dataEvents, googleId, image_names, user})
}

eventController.homepage = async(req, res) => {
    const googleId = req.cookies['google_account_id'];

    const events = await annualEventService.findAll();
    const dataEvents = events.map(event => event.dataValues);

    let user= {
        email: ''
    };

    if(req.cookies.google_account_id) {
        user = _.get(await userService.findByGoogleAccountId(req.cookies.google_account_id), 'dataValues');
    }

    const pattern = /http/g
    if (!pattern.test(user.avatar_link)) {
        user.avatar_link = `/images/${user.avatar_link}`;
    }


    res.render('user/home-page', { dataEvents , googleId, user})
}

eventController.filterEvent = async(req, res) => {
    try {
        const year = req.body.year;
        const happened_events = await happenedEventService.filter({ year });
        const filtered_events = happened_events.map(event => _.get(event, 'dataValues'));
    
        res.json(filtered_events);
    } catch (err) {
        console.log(err);
    }
}