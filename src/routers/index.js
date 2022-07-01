const {Router} = require("express");
const router = Router();

router.use('/staffs', require('./stuffs'));
router.use('/description', require("./description"))
router.use("/partniors", require("./portniors"))

module.exports = router