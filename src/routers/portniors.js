const { Router } = require("express");
const {
  getAllPartniors,
  getOnePartnior,
  addNewPartnior,
  updatePartnior,
  deletePartnior,
} = require("../controllers/partniors");
const middlewareJWT = require("../middleware/jwt");
const router = Router();

//GET All 
router.get("/", getAllPartniors);

// Get one from id
router.get('/:id', getOnePartnior)

// Add New 
router.post("/add", middlewareJWT, addNewPartnior);

// Update 
router.put("/:id", middlewareJWT, updatePartnior);

//Delete 
router.delete("/:id", middlewareJWT, deletePartnior);

module.exports = router;
