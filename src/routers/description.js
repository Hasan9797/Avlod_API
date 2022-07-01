const { Router } = require("express");
const {getAllStaff,addNewStaff,deleteStaff} = require("../controllers/description");
const router = Router();


router.get('/', getAllStaff )

// add descr
router.post('/add', addNewStaff)

// edit descr
router.delete('/:id', deleteStaff)

module.exports = router;