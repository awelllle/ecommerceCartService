
const {validParam, sendErrorResponse, sendSuccessResponse} = require('../../helpers/utility');
let router = require('express').Router();
let controller = require('./controller');

router.post('/cart', controller.cart);
router.post('/add', controller.add);
router.post('/remove', controller.remove);

module.exports = router;