const pool = require("../config/db");

// get All
const getAllBanners = async (req, res) => {
  try {
    const banners = await pool.query("SELECT * FROM banners");
    res.status(200).json(banners.rows);
  } catch (err) {
    res.status(500).json({
      message: error.message,
    });
  }
};

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
const addNewBanner = async (req, res) => {
  try {
    const { banner_title, banner_description, banner_img } = req.body;
    const newBanners = await pool.query(
      `
        INSERT INTO banners (banner_title, banner_description, banner_img)
        VALUES ($1, $2, $3) RETURNING *
        `,
      [banner_title, banner_description, banner_img]
    );
    res.status(200).json(newBanners.rows);
  } catch (error) {
    console.error(error);
  }
};

//put
const updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const { banner_title, banner_description, banner_img } = req.body;

    const oldBanners = await pool.query(
      `SELECT * FROM banners WHERE banner_id = $1`,
      [id]
    );

    const updatebanners = await pool.query(
      `
    UPDATE banners SET banner_title = $1, banner_description = $2, banner_img = $3 WHERE banner_id = $4 RETURNING *`,
      [
        banner_title ? banner_title : oldBanners.rows[0].banner_title,
        banner_description ? banner_description : oldBanners.rows[0].banner_description,
        banner_img ? banner_img : oldBanners.rows[0].banner_img,
        id,
      ]
    );
    res.status(200).json(updatebanners.rows);
  } catch (error) {
    console.error(error);
  }
};

//delete
const deleteBannert = async (req, res) => {
  const { id } = req.params;
  await pool.query(`DELETE FROM banners WHERE banner_id = $1`, [id]);
  res.status(200).json({
    message: "Banners Deleted",
  });
};

module.exports = {
  getAllBanners,
  addNewBanner,
  updateBanner,
  deleteBannert,
};
