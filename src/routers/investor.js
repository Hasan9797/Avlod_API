const { Router } = require("express");
const {
  getAllInvestors,
  getLastInvestor,
  addNewInvestors,
} = require("../controllers/investor");
const router = Router();

//get All Investors
router.get("/", getAllInvestors);

//get Last Investor
router.get("/last", getLastInvestor);

// Add New Staff
router.post("/add", addNewInvestors);

module.exports = router;
