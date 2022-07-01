const pool = require("../config/db");

// get All
const getAllPartniors = async (req, res) => {
    try {
        const partners = await pool.query("SELECT * FROM partners");
        res.status(200).json(partners.rows)
    } catch (err) {
        res.status(500).json({
            message: error.message
        })
    }
}

// get 
const getOnePartnior = async (req, res) => {
    try {
        const partners = await pool.query("SELECT * FROM partners WHERE partner_id = $1", [req.params.id]);
        if(!partners.rows[0]){
            return res.status(404).json({ error: "No Staff Found" });
        }
        res.status(200).json(partners.rows)
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}

// post
const addNewPartnior = async (req, res) => {
    try {
        const { partner_name, partner_img, partner_description } = req.body
        const newPartnior = await pool.query(`
        INSERT INTO partners (partner_name, partner_img, partner_description)
        VALUES ($1, $2, $3) RETURNING *
        `, [partner_name, partner_img, partner_description]);
        res.status(200).json(newPartnior.rows);
    } catch (error) {
        console.error(error);
    }
}

//put
const updatePartnior =  async (req, res) => {
    try {
        
    const {id} = req.params;
    const {partner_name, partner_img, partner_description} = req.body

    const oldStaff = await pool.query(`SELECT * FROM partners WHERE partner_id = $1`, [id])

    const updatePartnior = await pool.query(`
    UPDATE partners SET partner_name = $1, partner_img = $2, partner_description = $3 WHERE partner_id = $4 RETURNING *`,
    [   partner_name ? partner_name : oldStaff.rows[0].partner_name,
        partner_img ? partner_img : oldStaff.rows[0].partner_img, 
        partner_description ? partner_description : oldStaff.rows[0].partner_description,
        id
    ]);
    res.status(200).json(updatePartnior.rows)
    } catch (error) {
        console.error(error);
    }
}

//delete
const deletePartnior = async (req, res) => {
    const {id} = req.params;
    await pool.query(`DELETE FROM partners WHERE partner_id = $1`, [id]);
    res.status(200).json({
        message: "Partnior Deleted"
    })
}

module.exports = {
    getAllPartniors,
    getOnePartnior,
    addNewPartnior,
    updatePartnior,
    deletePartnior,
}