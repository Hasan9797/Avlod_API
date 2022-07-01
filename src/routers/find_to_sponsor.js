const { Router } = require("express");
const { getAllReq, getLastReq, addNewReq } = require("../controllers/find_to_sponsor");
const router = Router();

//get All
router.get("/", getAllReq);

//get last 
router.get("/last", getLastReq)

// add 
router.post("/add", addNewReq);

module.exports = router;
