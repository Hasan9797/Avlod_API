const pool = require("../config/db");

// get All
const getAllInvestors = async (req, res) => {
  try {
    const investors = await pool.query("SELECT * FROM investors");
    res.status(200).json(investors.rows);
  } catch (err) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//get last investor
const getLastInvestor = async (req, res) => {
    try {
      const investor = await pool.query(`SELECT * FROM investors
      ORDER BY investor_id DESC
      LIMIT 1;`);
      res.status(200).json(investor.rows);
    } catch (err) {
      res.status(500).json({
        message: error.message,
      });
    }
  };


// post
const addNewInvestors = async (req, res) => {
  try {
    const {
      investor_full_name,
      investor_phone_number,
      investor_email,
      investor_amount,
    } = req.body;
    const newInvestors = await pool.query(
      `
        INSERT INTO investors (investor_full_name, investor_phone_number, investor_email, investor_amount)
        VALUES ($1, $2, $3, $4) RETURNING *
        `,
      [
        investor_full_name,
        investor_phone_number,
        investor_email,
        investor_amount,
      ]
    );
    res.status(200).json(newInvestors.rows);
  } catch (error) {
    console.error(error);
  }
};


module.exports = {
    getAllInvestors,
    getLastInvestor,
    addNewInvestors
}
