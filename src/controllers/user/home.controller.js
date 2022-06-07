const _ = require('lodash');
const { 
    annualEventService,
    userService,
    googleService,
    happeningEventService,
    innService
} = require('../../service/index.service');


const homeController = module.exports

homeController.homepage = async(req, res) => {
    try {

        const googleId = req.cookies['google_account_id'];
        const events = await annualEventService.findAll();
        const dataEvents = events.map(event => event.dataValues);
        let user= {
            email: ''
        };

        const inns = (await innService.deletedFilter()).map((inn) => inn.dataValues);
        const happeningEvent = await happeningEventService.findOne();
        const happeningEventData = _.get(happeningEvent, 'dataValues');

        if(req.cookies.google_account_id) {
            user = _.get(await userService.findByGoogleAccountId(req.cookies.google_account_id), 'dataValues');
        }

        res.render('user/home-page', { dataEvents, user, happeningEventData, inns, googleId })
    } catch (err) {
        console.log(err);
    }
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
    const googleId = req.cookies['google_account_id'];

    const events = await annualEventService.findAll();
    const dataEvents = events.map(event => event.dataValues);
    let user= {
        email: ''
    };

    const happeningEvent = await happeningEventService.findOne();
    const happeningEventData = _.get(happeningEvent, 'dataValues');

    res.render('user/happening-event', { dataEvents, user, happeningEventData, googleId })
}

homeController.innDetail = async(req, res) => {
    const googleId = req.cookies['google_account_id'];

    const inn = _.get(await innService.findById(req.params.id), 'dataValues');
    const events = await annualEventService.findAll();
    const dataEvents = events.map(event => event.dataValues);
    let user= {
        email: ''
    };

    res.render('user/inn-detail', { dataEvents, user, inn, googleId });
}

homeController.logout = async(req, res) => {
    res.clearCookie('google_account_id');
    res.redirect('/');
}

