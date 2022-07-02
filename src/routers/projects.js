const { Router } = require("express");
const {
  getAllProjects,
  addNewProject,
  updateProject,
  deleteProject,
} = require("../controllers/projects");
const middlewareJWT = require("../middleware/jwt");
const router = Router();

//GET All 
router.get("/", getAllProjects);

// Add New 
router.post("/add", middlewareJWT, addNewProject);

// Update 
router.put("/:id", middlewareJWT, updateProject);

//Delete 
router.delete("/:id", middlewareJWT, deleteProject);

module.exports = router;
