module.exports = function(sequelize, Sequelize) {
 
    const Post = sequelize.define('post', {
 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        creator_id: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        title: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        price: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        acreage: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        address: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        image_slide: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        description: {
            type: Sequelize.TEXT('long'),
            notEmpty: true
        },
        contact: {
            type: Sequelize.TEXT('long'),
            notEmpty: true
        },
    });
 
    return Post;
 
}