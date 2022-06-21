const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin/event.controller');
const innAdminController = require('../controllers/admin/inn.controller');

const { upload } = require('../helpers/multer')
 
router.get('/annual-events', adminController.annualEvents);
router.get('/change-new-event', adminController.changeNewEvent);
router.get('/recent-events', adminController.recentEventPage);
router.get('/edit-happening-event', adminController.editHappeningEventPage);
router.get('/send-mail-happening-event', adminController.setupMailEvent);
router.post('/send-mail', adminController.sendMailHappeningEvent);
router.post('/edit-happening-event', upload.array('uploaded_file'), adminController.editHappeningEventPagePost);
router.post('/save-recent-event', upload.array('uploaded_file'), adminController.saveRecentEvent);
router.post('/change-new-event', upload.array('uploaded_file'), adminController.changeNewEventPost);
router.get('/happening-event', adminController.happeningEvent);
router.post('/update-annual-event', upload.array('uploaded_file'),adminController.updateAnnualEvent);
router.get('/add-annual-event', adminController.addAnnualEventPage);
router.post('/add-annual-event', upload.array('uploaded_file'),adminController.addAnnualEvent);
router.get('/annual-event-detail', adminController.annualEventDetail);

// Inn
router.get('/post/detail', innAdminController.postDetail);
router.post('/delete-post', innAdminController.deletePost);
router.post('/confirmed-inn/delete', innAdminController.deleteConfirmInn);
router.get('/confirmed-inn', innAdminController.confirmedInnDetail);
router.get('/confirm-inns', innAdminController.confirmInns);
router.get('/confirmed-inns', innAdminController.confirmedInns);

router.post('/inn/new-inn/:url', innAdminController.newInn);
router.get('/inn/detail/:url', innAdminController.innDetail);
router.get('/inn/page/:page', innAdminController.pageFetch);
router.get('/inn', innAdminController.getInn);

// chart
router.get('/chart', adminController.chartEvent);
router.get('/login', adminController.login);


// Admin Main Page
router.get('/', adminController.adminPage);

module.exports = router;