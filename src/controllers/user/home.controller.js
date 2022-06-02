const _ = require('lodash');
const { 
    annualEventService,
    userService,
    googleService,
    happeningEventService
} = require('../../service/index.service');


const homeController = module.exports

homeController.homepage = async(req, res) => {
    const events = await annualEventService.findAll();
    const dataEvents = events.map(event => event.dataValues);
    let user= {
        email: ''
    };

    const happeningEvent = await happeningEventService.findOne();
    const happeningEventData = _.get(happeningEvent, 'dataValues');

    if(req.cookies.google_account_id) {
        user = _.get(await userService.findByGoogleAccountId(req.cookies.google_account_id), 'dataValues');
    }

    res.render('user/home-page', { dataEvents, user, happeningEventData })
}

homeController.registerEvent = async(req, res) => {
    try {
        const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;
        const happeningEvent = await happeningEventService.findOne();
        const happeningEventData = _.get(happeningEvent, 'dataValues');

        if(!happeningEventData.sheet_of_event) {
            await googleService.addSheet(spreadsheetId, happeningEventData.title);
            await happeningEventService.updateSheetEvent();
        }
        const value = [
            req.body.email,
            req.body.name,
            req.body.birthday,
            req.body.address,
            req.body.facebookLink,
            req.body.phoneNumber,
            req.body.hope
        ]
        await googleService.appendValueToSheet(spreadsheetId, happeningEventData.title, value);
    } catch (err) {
        console.error(err);
    }
    res.redirect('/')
}

homeController.slug = async(req, res) => {
    res.redirect('/')
}

homeController.happeningEvent = async(req, res) => {
    const events = await annualEventService.findAll();
    const dataEvents = events.map(event => event.dataValues);
    let user= {
        email: ''
    };

    const happeningEvent = await happeningEventService.findOne();
    const happeningEventData = _.get(happeningEvent, 'dataValues');

    res.render('user/happening-event', { dataEvents, user, happeningEventData })
}
