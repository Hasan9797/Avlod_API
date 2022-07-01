const { Router } = require("express");
const {
  getAllStaff,
  getOneStaff,
  addNewStaff,
  updateStaff,
  deleteStaff,
} = require("../controllers/staffs");
const middlewareJWT = require("../middleware/jwt");
const router = Router();

//GET All staffs
router.get("/", getAllStaff);

// Get oneStaff from id
router.get('/:id', getOneStaff)

// Add New Staff
router.post("/add", middlewareJWT, addNewStaff);

// Update Staff
router.put("/:id", middlewareJWT, updateStaff);

//Delete Staff
router.delete("/:id", middlewareJWT, deleteStaff);

module.exports = router;
