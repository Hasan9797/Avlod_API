const { Router } = require("express");
const {
  getAllProjects,
  addNewProject,
  updateProject,
  deleteProject,
} = require("../controllers/projects");
const middlewareJWT = require("../middleware/jwt");
const router = Router();

//GET All staffs
router.get("/", getAllProjects);

// Get oneStaff from id
// router.get('/:id', getOneStaff)

// Add New Staff
router.post("/add", middlewareJWT, addNewProject);

// Update Staff
router.put("/:id", middlewareJWT, updateProject);

//Delete Staff
router.delete("/:id", middlewareJWT, deleteProject);

module.exports = router;
