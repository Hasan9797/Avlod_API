const pool = require("../config/db");
const path = require("path");

const getAllReq = async (req, res) => {
  try {
    const find_of_sponsor = await pool.query("SELECT * FROM find_of_sponsor");
    res.status(200).json(find_of_sponsor.rows);
  } catch (err) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const getLastReq = async (req, res) => {
  try {
    const investor = await pool.query(`SELECT * FROM find_of_sponsor
    ORDER BY find_id DESC
    LIMIT 1;`);
    res.status(200).json(investor.rows);
  } catch (err) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const addNewReq = async (req, res) => {
  try {
    const { file } = req.files;
    const aplicationFilter = ["application/pdf", "application/doc", "application/docx"]
    const { first_name, last_name, email, phone_number } = req.body;
    if(!aplicationFilter.includes(file.mimetype)){
        return res
                .status(400)
                .send({
                    status: 400,
                    message: "Invalid mime type"
                })
    }

    const fileName = Date.now() + file.name.replace(/\s/, '')
            await file.mv(path.join(process.cwd(), 'uploads', fileName))

    const newProject = await pool.query(
      `
        INSERT INTO find_of_sponsor (first_name, last_name, email, phone_number, file)
        VALUES ($1, $2, $3, $4, $5) RETURNING *
        `,
      [first_name, last_name, email, phone_number, fileName]
    );
    res.status(200).send({
        status: 200,
        message: "Data succesfully added!",
        data: newProject.rows
    })


  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getAllReq,
  getLastReq,
  addNewReq,
};
