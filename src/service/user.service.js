const { user } = require('../models');

const userService = module.exports

userService.createOne = async(profile) => user.create(profile);

userService.findByGoogleAccountId = async(google_account_id) => user.findOne({
    where: {
        google_account_id
    }
});