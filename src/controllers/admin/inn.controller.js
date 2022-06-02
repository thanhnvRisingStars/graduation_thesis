const _ = require('lodash');
const moment = require('moment');
const { 
} = require('../../service/index.service');

const InnController = module.exports

InnController.getInn = async(req, res) => {
    res.render('admin/inn-page');
}
