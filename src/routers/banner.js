const { Router } = require("express");
const {
  getAllBanners,
  addNewBanner,
  updateBanner,
  deleteBannert,
} = require("../controllers/banners");
const middlewareJWT = require("../middleware/jwt");
const router = Router();

//GET All staffs
router.get("/", getAllBanners);

// Get oneStaff from id
// router.get('/:id', getOneStaff)

// Add New Staff
router.post("/add", middlewareJWT, addNewBanner);

// Update Staff
router.put("/:id", middlewareJWT, updateBanner);

//Delete Staff
router.delete("/:id", middlewareJWT, deleteBannert);

module.exports = router;
