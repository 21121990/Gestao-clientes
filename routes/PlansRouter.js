const express = require("express");
var router = express.Router();
var PlansControlller = require("../controllers/PlansController");

router.get("/admin/plans", PlansControlller.index);
router.get("/admin/plans/edit/:id", PlansControlller.edit);
router.post("/plans/delete/:id", PlansControlller.delete);
router.post("/plans/update", PlansControlller.update);
router.get("/admin/plans/create", PlansControlller.create);
router.post("/plans/store", PlansControlller.store);


module.exports = router;