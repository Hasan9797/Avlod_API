const pool = require("../config/db");

// get All
const getAllStaff = async (req, res) => {
    try {
        const staffs = await pool.query("SELECT * FROM staffs");
        res.status(200).json(staffs.rows)
    } catch (err) {
        res.status(500).json({
            message: error.message
        })
    }
}

// get 
const getOneStaff = async (req, res) => {
    try {
        const staffs = await pool.query("SELECT * FROM staffs WHERE staff_id = $1", [req.params.id]);
        if(!staffs.rows[0]){
            return res.status(404).json({ error: "No Staff Found" });
        }
        res.status(200).json(staffs.rows)
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}

// post
const addNewStaff = async (req, res) => {
    try {
        const {staff_full_name, staff_position, staff_description, staff_img} = req.body
        const newStaff = await pool.query(`
        INSERT INTO staffs (staff_full_name, staff_position, staff_description, staff_img)
        VALUES ($1, $2, $3, $4) RETURNING *
        `, [staff_full_name, staff_position, staff_description, staff_img]);
        res.status(200).json(newStaff.rows);
    } catch (error) {
        console.error(error);
    }
}

//put
const updateStaff =  async (req, res) => {
    try {
        
    const {id} = req.params;
    const {staff_full_name, staff_position, staff_description, staff_img} = req.body

    const oldStaff = await pool.query(`SELECT * FROM staffs WHERE staff_id = $1`, [id])

    const updateStaff = await pool.query(`
    UPDATE staffs SET staff_full_name = $1, staff_position = $2, staff_description = $3, staff_img = $4 WHERE staff_id = $5 RETURNING *`,
    [   staff_full_name ? staff_full_name : oldStaff.rows[0].staff_full_name,
        staff_position ? staff_position : oldStaff.rows[0].staff_position, 
        staff_description ? staff_description : oldStaff.rows[0].staff_description,
        staff_img ?  staff_img : oldStaff.rows[0].staff_img,
        id
    ]);
    res.status(200).json(updateStaff.rows)

    } catch (error) {
        console.error(error);
    }
}

//delete
const deleteStaff = async (req, res) => {
    const {id} = req.params;
    await pool.query(`DELETE FROM staffs WHERE staff_id = $1`, [id]);
    res.status(200).json({
        message: "Staff Deleted"
    })
}

module.exports = {
    getAllStaff,
    getOneStaff,
    addNewStaff,
    updateStaff,
    deleteStaff
}