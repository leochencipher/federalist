const router = require("express").Router()
const PublishedFilesController = require("../controllers/published-branch")
const passport = require("../policies/passport")
const sessionAuth = require("../policies/sessionAuth")

router.get("/v0/site/:site_id/published-branch", passport, sessionAuth, PublishedFilesController.find)

module.exports = router