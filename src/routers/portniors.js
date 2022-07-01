const { Router } = require("express");
const {
  getAllPartniors,
  getOnePartnior,
  addNewPartnior,
  updatePartnior,
  deletePartnior,
} = require("../controllers/partniors");
// const middlewareJWT = require("../middleware/jwt");
const router = Router();

//GET All staffs
router.get("/", getAllPartniors);

// Get oneStaff from id
router.get('/:id', getOnePartnior)

// Add New Staff
router.post("/add", addNewPartnior);

// Update Staff
router.put("/:id", updatePartnior);

//Delete Staff
router.delete("/:id", deletePartnior);

module.exports = router;
