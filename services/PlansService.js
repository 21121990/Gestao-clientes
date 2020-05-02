var Database = require("../models/index");

class PlansService {

    constructor() {
        this.Plan = Database["Plan"];
    }

    async store(plans) {
        var errors = {};
        if (plans.import != undefined) {
            plans.import = true;
        } else {
            plans.import = false;
        }
        var isValid = this.Validate(plans, errors);

        if (isValid) {
            try {
                await this.Plan.create(plans);
                return true;
            } catch (error) {
                errors.system_msg = "Não foi possível salvar o plano";
                return errors;
            }

        } else {
            return errors;
        }
    }
    Validate(plans, errors) {
        var errorCount = 0;
        if (plans.title == undefined) {
            errors.title_msg = "O titulo é iválido";
            errorCount++;
        } else {
            if (plans.title.length < 3) {
                errors.title_msg = ("O título é inválido");
                errorCount++;
            }
        }

        if (plans.list == undefined) {
            errors.list_msg = "A quantidade de listas é inválida";
            errorCount++;
        } else {
            if (plans.list < 1) {
                errors.list_msg = "A quantidade de listas é inválida";
                errorCount++;
            }
        }

        if (errorCount == 0) {
            return true;
        } else {
            return false;
        }
    }

}


module.exports = new PlansService;