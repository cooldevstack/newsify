const express = require("express")
const tagsController = require("../controllers/tags")
const { body } = require("express-validator/check")
const router = express.Router();
const isAuth = require("../middlewares/is-Auth")

router.get("/Tags", tagsController.getAllTags)
router.get("/Tags/:tagID", tagsController.getTag)
router.post("/Tags", isAuth, [
    body("tag").trim().isLength({ min: 3, max: 10 })
], tagsController.createTag)
router.put("/Tags/:tagID", isAuth, tagsController.updateTag)
router.delete("/Tags/:tagID", tagsController.deleteTag)

module.exports = router