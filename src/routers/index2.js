const {Router} = require("express");
const router = Router();

router.use('/projects', require('./projects'));
router.use('/banner', require("./banner"));

module.exports = router