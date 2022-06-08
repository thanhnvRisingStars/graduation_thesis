const _ = require('lodash');
const { 
    postService
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
    const post = _.get(await postService.findById(req.params.id), 'dataValues');

    res.render('user/post-detail', { post });
}

InnController.editDetailPost = async(req, res) => {
    const post = _.get(await postService.findById(req.params.id), 'dataValues');

    res.render('user/post-edit', { post });
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