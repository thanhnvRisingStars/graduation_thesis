const _ = require('lodash');
const { 
    innService,
    postService,
    annualEventService
} = require('../../service/index.service');


const InnController = module.exports

InnController.getPost = async(req, res) => {
    const posts = (await postService.filterByCreatorId(req.params.googleId)).map((post) => _.get(post, 'dataValues'));

    res.render('user/post-manager', { posts });
}

InnController.pageCreateInn = async(req, res) => {
    res.render('user/create-inn-page');
}

InnController.addNewInn = async(req, res) => {
    const post = JSON.parse(JSON.stringify(req.body));
    Object.assign(post, { 
        creator_id: req.cookies['google_account_id'],
        image_slide: req.file.filename
    });

    await postService.creatorOne(post)
    res.redirect(`/account/${req.cookies['google_account_id']}`);
}

InnController.deleteInnPost = async(req, res) => {
    const postId = req.query.id;
    await postService.deleteById(postId);

    res.redirect(`/account/${req.cookies['google_account_id']}`);
}

InnController.detailPost =async(req, res) => {
    const googleId = req.cookies['google_account_id'];
    const post = _.get(await postService.findById(req.params.id), 'dataValues');

    res.render('user/post-detail', { post, googleId });
}

InnController.editDetailPost = async(req, res) => {
    const googleId = req.cookies['google_account_id'];
    const post = _.get(await postService.findById(req.params.id), 'dataValues');

    res.render('user/post-edit', { post, googleId });
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

    res.render('user/DaNangInns', { inns, googleId, dataEvents });
}

InnController.BinhSonInns = async(req, res) => {
    const googleId = req.cookies['google_account_id'];
    const inns = (await postService.findAll()).map(post => _.get(post, 'dataValues'));
    const events = await annualEventService.findAll();
    const dataEvents = events.map(event => event.dataValues);
 
    res.render('user/BinhSonInns', { inns, googleId, dataEvents});
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
    
    res.render('user/allInns', { inns, googleId, dataEvents });
}
