const { post } = require('../models');

const PostService = module.exports;

PostService.filterByCreatorId = async(id)=> await post.findAll({where: { creator_id: id}})

PostService.creatorOne = async(one)=> await post.create(one);

PostService.deleteById = async(id) => await post.destroy({where: {id}})

PostService.findById = async(id) => await post.findOne({where: {id}})