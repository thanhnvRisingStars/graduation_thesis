const express = require('express');
const router = express.Router();
const homeController = require('../controllers/user/home.controller');
const InnController = require('../controllers/user/inn.controller');

const { upload } = require('../helpers/multer')

// profile
router.post('/edit-profile', upload.single('uploaded_file'), homeController.editProfile);
router.get('/edit-profile', homeController.profile);
 
// inn
router.get('/:googleId/edit/:id', InnController.editDetailPost);
router.post('/delete-inn-post', InnController.deleteInnPost);
router.post('/post/edit', upload.single('uploaded_file'), InnController.postEdit);
router.post('/add-new-inn', upload.single('uploaded_file'), InnController.addNewInn);
router.get('/account/:googleId/:id/', InnController.detailPost);
router.get('/account/:googleId', InnController.getPost);
router.get('/create-inn', InnController.pageCreateInn);

router.get('/DaNang-inns', InnController.DaNangInns);
router.get('/BinhSon-inns', InnController.BinhSonInns);
router.get('/all-inns', InnController.allInns);


// event
router.get('/happening-event/:slug', homeController.happeningEvent);
router.get('/inns/:id', homeController.innDetail);
router.post('/register-event', homeController.registerEvent);
router.get('/logout', homeController.logout);
router.get('/:slug', homeController.slug);
router.get('/', homeController.homepage);

module.exports = router;