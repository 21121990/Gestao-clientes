const PlansService = require("../services/PlansService");


class PlansController {
    async index(req, res) {
        var Plans = await PlansService.getAll();
        res.render("plans/index", { Plans: Plans });
    }
    async edit(req, res) {
        var id = req.params.id;
        var Plan = await PlansService.getOne(id);
        res.render("plans/edit", { Plan: Plan, title_msg: req.flash('title_msg'), list_msg: req.flash('list_msg') });
    }

    async update(req, res) {
        var plan = {};
        if(req.body.import == undefined){
            req.body.import = false;
        }
        else{
            req.body.import = true;
        }
        plan = {
            id: req.body.id,
            title: req.body.title,
            list: req.body.list,
            client: req.body.client,
            value: req.body.value,
            import: req.body.import
        }   
        var result =  await PlansService.update(plan);

        if (result == true) {
            res.redirect("/admin/plans/");
        } else {
            req.flash('title_msg', result.title_msg);
            req.flash('list_msg', result.list_msg);
            res.redirect("/admin/plans/edit/" + plan.id);
        }     

    }

    create(req, res) {
        res.render("plans/create", { title_msg: req.flash('title_msg'), list_msg: req.flash('list_msg') });
    }
    async store(req, res) {
        var { title, list, client, value, imports } = req.body;
        var plan = {
            title,
            list,
            client,
            value,
            import: imports
        }
        var result = await PlansService.store(plan);

        if (result == true) {
            res.redirect("/admin/plans/");
        } else {
            req.flash('title_msg', result.title_msg);
            req.flash('list_msg', result.list_msg);
            res.redirect("/admin/plans/create");
        }
    }
}

module.exports = new PlansController();