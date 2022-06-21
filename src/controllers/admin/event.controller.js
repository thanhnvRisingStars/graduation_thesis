const _ = require('lodash');
const moment = require('moment');
const { 
    annualEventService,
    happeningEventService,
    googleService,
    recentEventService,
    happenedEventService
} = require('../../service/index.service');
const mailHelper = require('../../helpers/mail');

const adminController = module.exports

adminController.adminPage = async(req, res) => {
    res.cookie('admin','admin');
    const admin = req.cookies.admin;
    res.render('admin/homepage', { admin });
}

adminController.annualEvents = async(req, res) => {
    const events = await annualEventService.findAll()
    const dataEvents = events.map(event => event.dataValues);
    const admin = req.cookies.admin;
    res.render('admin/annual-events', { admin, dataEvents })
}

adminController.updateAnnualEvent = async(req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    let event = {
        title,
        description
    }
    if (req.file) {
        Object.assign(event, { image_name: req.file.filename })
    } 
    await annualEventService.updateById(event, req.query.id);
    res.redirect('/admin');
}

adminController.annualEventDetail = async(req, res) => {
    const event = await annualEventService.findByTitle(req.query.title)
    const data = event.dataValues

    const admin = req.cookies.admin;
    res.render('admin/event-annual-detail', { admin, data })
}

adminController.addAnnualEventPage = async(req, res) => {
    const admin = req.cookies.admin;
    res.render('admin/add-annual-event', { admin })
}

adminController.addAnnualEvent = async(req, res) => {
    const event = {
        title: req.body.title,
        description: req.body.description,
        video_id: req.body.video_id,
    }

    await annualEventService.createOne(event);
    res.redirect('/admin/annual-events')
}

adminController.happeningEvent = async(req, res) => {
    const admin = req.cookies.admin;

    const happeningEvent = _.get((await happeningEventService.findOne()), 'dataValues');

    const image_names = happeningEvent.image_name

    res.render('admin/happening-event', { admin, happeningEvent, image_names })
}

adminController.changeNewEvent = async(req, res) => {
    const admin = req.cookies.admin;
    const time = { 
        date: moment().format("YYYY-MM-DD"),
    };

    const events = await annualEventService.findAll();
    const dataEvents = events.map(event => event.dataValues);

    res.render('admin/change-happening-event', { admin, time, dataEvents })
}

adminController.changeNewEventPost = async(req, res) => {
    try {
        let files = [];
        await req.files.map((file) => files.push(file.filename));

        const event = {
            title: req.body.title,
            description: req.body.description,
            image_name: files,
            action_time: req.body.action_time,
            place: req.body.place,
            event_type_id: req.body.event_type_id
        }

        const happeningEvent = await happeningEventService.findOne();
        const happeningEventData = _.get(happeningEvent, 'dataValues');

        delete happeningEventData["id"]

        await recentEventService.createOne(happeningEventData);
        await happeningEventService.removeEvent();
        await happeningEventService.createOne(event);
    
        res.redirect('/admin/happening-event');
    } catch (err) {
        console.log(err);
    }
}

adminController.editHappeningEventPage = async(req, res) => {
    const admin = req.cookies.admin;
    const happeningEvent = await happeningEventService.findOne();
    const happeningEventData = _.get(happeningEvent, 'dataValues');

    const image_names = happeningEventData.image_name

    res.render('admin/edit-happening-event', { admin, happeningEventData, image_names })
}

adminController.editHappeningEventPagePost = async(req, res) => {
    let files = [];
    await req.files.map((file) => files.push(file.filename));

    const event = {
        title: req.body.title,
        description: req.body.description,
        image_name: files,
        action_time: req.body.action_time,
        place: req.body.place
    }

    const id = req.query.id

    await happeningEventService.updateEvent(event, id);

    res.redirect('/admin/happening-event');
}

adminController.setupMailEvent = async(req, res) => {
    const admin = req.cookies.admin;
    const happeningEvent = await happeningEventService.findOne();
    const happeningEventData = _.get(happeningEvent, 'dataValues');
    const statusMail = happeningEventData.status_mail

    res.render('admin/setup-event-mail', { admin, statusMail })
}

adminController.sendMailHappeningEvent = async(req, res) => {
    try {
        const mailSubject = req.body.subject;
        const mailContent = req.body.content;
        const happeningEvent = await happeningEventService.findOne();
        const happeningEventData = _.get(happeningEvent, 'dataValues');
        const titleSheet = happeningEventData.title

        const sheet = await googleService.getDataSheet(process.env.GOOGLE_SPREADSHEET_ID , titleSheet);
        const dataSheet = sheet.data.values
        dataSheet.map(async(data) => {
           await mailHelper.sendMail(data[0], mailContent, mailSubject);
        })
        await happeningEventService.updateStatusMail();

        res.redirect('/admin/happening-event');
    } catch (err) {
        console.log(err);
        res.redirect('/admin/happening-event');
    }
}

adminController.recentEventPage = async(req, res) => {
    const events = await recentEventService.findAll()
    const dataEvents = events.map(event => event.dataValues);
    const admin = req.cookies.admin;

    const data = _.head(dataEvents);

    const image_names = data.image_name

    res.render('admin/recent-events', { admin, data, image_names })
}

adminController.saveRecentEvent = async(req, res) => {
    let recentEvent = await recentEventService.findById(req.query.id);
    recentEvent = _.get(recentEvent, 'dataValues');
    if (req.file) {
        recentEvent.image_name = req.file.filename;
    }
    recentEvent.description = req.body.description

    Object.assign(recentEvent, { year: _.head(_.split(recentEvent.action_time, '-'))})

    delete recentEvent["id"]

    await happenedEventService.createOne(recentEvent);
    await recentEventService.removeEventByTitle(recentEvent.title);

    res.redirect('/admin/recent-events');
}

adminController.chartEvent = async(req,res) => {
    const admin = req.cookies.admin;
    
    res.render('admin/chartEvent', { admin });
}

adminController.login = async(req,res) => {
    const login = { login: 'login' }

    res.render('admin/login', { login })
}