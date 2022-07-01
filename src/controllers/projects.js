const pool = require("../config/db");

// get All
const getAllProjects = async (req, res) => {
    try {
        const projects = await pool.query("SELECT * FROM projects");
        res.status(200).json(projects.rows)
    } catch (err) {
        res.status(500).json({
            message: error.message
        })
    }
}


// get 
// const getOneStaff = async (req, res) => {
//     try {
//         const staffs = await pool.query("SELECT * FROM staffs WHERE staff_id = $1", [req.params.id]);
//         if (!staffs.rows[0]) {
//             return res.status(404).json({ error: "No Staff Found" });
//         }
//         res.status(200).json(staffs.rows)
//     } catch (error) {
//         res.status(500).json({
//             message: error
//         })
//     }
// }


// post
const addNewProject = async (req, res) => {
    try {
        const { ptoject_title, ptoject_description, ptoject_img } = req.body
        const newProject = await pool.query(`
        INSERT INTO projects (ptoject_title, ptoject_description, ptoject_img)
        VALUES ($1, $2, $3) RETURNING *
        `, [ptoject_title, ptoject_description, ptoject_img]);
        res.status(200).json(newProject.rows);
    } catch (error) {
        console.error(error);
    }
}

//put
const updateProject = async (req, res) => {
    try {

        const { id } = req.params;
        const { ptoject_title, ptoject_description, ptoject_img } = req.body

        const oldProject = await pool.query(`SELECT * FROM projects WHERE project_id = $1`, [id])

        const updateProject = await pool.query(`
    UPDATE projects SET ptoject_title = $1, ptoject_description = $2, ptoject_img = $3 WHERE project_id = $4 RETURNING *`,
            [ptoject_title ? ptoject_title : oldProject.rows[0].ptoject_title,
            ptoject_description ? ptoject_description : oldProject.rows[0].ptoject_description,
            ptoject_img ? ptoject_img : oldProject.rows[0].ptoject_img,
            id
            ]);
        res.status(200).json(updateProject.rows)

    } catch (error) {
        console.error(error);
    }
}

//delete
const deleteProject = async (req, res) => {
    const { id } = req.params;
    await pool.query(`DELETE FROM projects WHERE project_id = $1`, [id]);
    res.status(200).json({
        message: "Project Deleted"
    })
}

module.exports = {
    getAllProjects,
    addNewProject,
    updateProject,
    deleteProject,
}