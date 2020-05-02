const express = require("express");
var router = express.Router();
var PlansControlller = require("../controllers/PlansController");

router.get("/plans", PlansControlller.index);
router.get("/admin/plans/create", PlansControlller.create);
router.post("/plans/store", PlansControlller.store);


module.exports = router;