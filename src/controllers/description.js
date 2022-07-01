const pool = require("../config/db");

// get All
const getAllStaff = async (req, res) => {
    try {
        const staffs = await pool.query("SELECT * FROM about");
        res.status(200).json(staffs.rows)
    } catch (err) {
        res.status(500).json({
            message: error.message
        })
    }
}


// post
const addNewStaff = async (req, res) => {
    try {
        const {about_description} = req.body
        const newStaff = await pool.query(`
        INSERT INTO about (about_description)
        VALUES ($1) RETURNING *
        `, [about_description]);
        res.status(200).json(newStaff.rows);
    } catch (error) {
        console.error(error);
    }
}


//delete
const deleteStaff = async (req, res) => {
    const {id} = req.params;
    await pool.query(`DELETE FROM about WHERE about_id = $1`, [id]);
    res.status(200).json({
        message: "About Deleted"
    })
}

module.exports = {
    getAllStaff,
    addNewStaff,
    deleteStaff
}