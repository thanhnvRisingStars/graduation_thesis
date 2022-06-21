const _ = require('lodash');
const { 
    innService,
    postService,
    annualEventService,
    userService
} = require('../../service/index.service');


const InnController = module.exports

InnController.managerMotel = async(req, res) => {
    const googleId = req.cookies['google_account_id'];
    const posts = (await postService.filterByCreatorId(req.params.googleId)).map((post) => _.get(post, 'dataValues'));
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

    res.render('user/motelManager', { posts, dataEvents, googleId, user});
}

InnController.pageCreateInn = async(req, res) => {
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
    res.render('user/create-inn-page' , { googleId, dataEvents , user});
}

InnController.addNewInn = async(req, res) => {
    const post = JSON.parse(JSON.stringify(req.body));
    Object.assign(post, { 
        creator_id: req.cookies['google_account_id'],
        image_slide: req.file.filename
    });

    console.log(post);

    await postService.creatorOne(post)
    res.redirect(`/manager/${req.cookies['google_account_id']}`);
}

InnController.deleteInnPost = async(req, res) => {
    const postId = req.query.id;
    await postService.deleteById(postId);

    res.redirect(`/manager/${req.cookies['google_account_id']}`);
}

InnController.detailPost = async(req, res) => {
    const googleId = req.cookies['google_account_id'];
    const post = _.get(await postService.findById(req.params.id), 'dataValues');
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

    res.render('user/post-detail', { post, googleId , dataEvents, user});
}

InnController.detailMotel = async(req, res) => {
    const googleId = req.cookies['google_account_id'];
    const post = _.get(await postService.findById(req.params.id), 'dataValues');
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

    res.render('user/detailMotel', { post, googleId , dataEvents, user});
}

InnController.editDetailPost = async(req, res) => {
    
    const googleId = req.cookies['google_account_id'];
    const post = _.get(await postService.findById(req.params.id), 'dataValues');
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

    res.render('user/post-edit', { post, googleId, dataEvents, user});
}

InnController.postEdit = async(req, res) => {
    const post = JSON.parse(JSON.stringify(req.body));
    Object.assign(post, { 
        creator_id: req.cookies['google_account_id'],
        image_slide: req.file.filename
    });

    await postService.updateById(post, req.query.id);

    res.redirect(`/account/${req.cookies['google_account_id']}/${req.query.id}`);
}

InnController.DaNangInns = async(req, res) => {
    const googleId = req.cookies['google_account_id'];
    const inns = (await innService.findAll()).map(post => _.get(post, 'dataValues'));
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

    res.render('user/DaNangInns', { inns, googleId, dataEvents, user});
}

InnController.BinhSonInns = async(req, res) => {
    const googleId = req.cookies['google_account_id'];
    const inns = (await postService.findAll()).map(post => _.get(post, 'dataValues'));
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
 
    res.render('user/BinhSonInns', { inns, googleId, dataEvents, user});
}

InnController.allInns = async(req, res) => {
    const googleId = req.cookies['google_account_id'];
    const events = await annualEventService.findAll();
    const dataEvents = events.map(event => event.dataValues);
    const post = (await postService.findAll()).map(post => {
        _.set(post, 'dataValues.image_slide', `/images/${post.dataValues.image_slide}`)
        return _.get(post, 'dataValues')
    });
    let inns = (await innService.findAll()).map(post => _.get(post, 'dataValues'));

    inns = inns.concat(post);

    let length = null;

    const pageNum = {
        pre : parseInt(req.query.page) - 1,
        next: parseInt(req.query.page) + 1,
        next2: parseInt(req.query.page) + 2,
        now: req.query.page
    };

    if (req.query.page) {
        inns = inns.slice((parseInt(req.query.page)-1)*10+1, parseInt(req.query.page)*10-1);
        if (parseInt(req.query.page) > 1) {
            length = ['value'];
        }
    }
    else {
        inns = inns.slice(0,9);
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

    
    
    res.render('user/allInns', { inns, googleId, dataEvents, user, length, pageNum});
}
