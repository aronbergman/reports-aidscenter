const db = require("../models");
const { Op } = require("sequelize");
const Testing = db.testing;
const HotLine = db.hotLine;
const GroupsHiv = db.groupsHiv;
const GroupsTG = db.groupsTG;
const Drugstore = db.drugstore;

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [day, month, year].join('.');
}

exports.testing = (req, res) => {
    // Save User to Database
    Testing.create(req.body)
        .then((data) => {
            res.send({ message: "Testing created!", data });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.hotLine = (req, res) => {
    // Save User to Database
    HotLine.create(req.body)
        .then((data) => {
            res.send({ message: "HotLine created!", data });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.groupsHiv = (req, res) => {
    // Save User to Database
    GroupsHiv.create(req.body)
        .then((data) => {
            res.send({ message: "GroupsHiv created!", data });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.groupsTG = (req, res) => {
    // Save User to Database
    GroupsTG.create(req.body)
        .then((data) => {
            res.send({ message: "GroupsHiv created!", data });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.drugstore = (req, res) => {
    // Save User to Database
    Drugstore.create(req.body)
        .then((data) => {
            res.send({ message: "Drugstore created!", data });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.findTesting = (req, res) => {
    const {
        rangePeriodStart,
        rangePeriodEnd,
        usedDrugs,
        sexWorked,
        usedPrep,
        city,
        code,
        searchByCode,
        formType,
        age,
        searchType
    } = req.body
    let filters = {}

    if (rangePeriodStart && rangePeriodEnd) {
        filters = {
            where: {
                "43_date": {
                    [Op.gte]: req.body.rangePeriodStart,
                    [Op.lte]: req.body.rangePeriodEnd
                }
            }
        }
    }

    if (usedDrugs) {
        filters.where = {
            ...filters.where,
            ["16_used_drugs"]: {
                [Op.ne]: "Не употреблял"
            }
        }
    }

    if (formType) {
        filters.where = {
            ...filters.where,
            ["47_type_form"]: {
                [Op.eq]: formType
            }
        }
    }

    if (sexWorked) {
        filters.where = {
            ...filters.where,
            ["18_drugs_or_money_in_exchange_for_sex"]: {
                [Op.ne]: "Нет"
            }
        }
    }

    if (usedPrep) {
        filters.where = {
            ...filters.where,
            ["33_you_are_a_used_PrEP"]: {
                [Op.ne]: "Нет"
            }
        }
    }

    if (city) {
        filters.where = {
            ...filters.where,
            ["46_city"]: {
                [Op.eq]: city
            }
        }
    }

    if (age) {
        filters.where = {
            ...filters.where,
            ["4_age"]: {
                [Op.or]: age
            }
        }
    }

    if (searchType) {
        if (searchByCode) {
            filters.where = {
                ...filters.where,
                ["1_code"]: {
                    [Op.substring]: searchByCode
                }
            }
        }
    } else {
        if (searchByCode) {
            filters.where = {
                ...filters.where,
                ["id"]: {
                    [Op.substring]: searchByCode
                }
            }
        }
    }

    if (code) {
        filters.where = {
            ...filters.where,
            ["1_code"]: {
                [Op.eq]: code
            }
        }
    }

    console.log('req.body', req.body)
    console.log('filters', filters)
    Testing.findAll(filters).then((data) => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.findDrugstore = (req, res) => {
    const {
        rangePeriodStart,
        rangePeriodEnd,
        city,
        type
    } = req.body
    let filters = {}

    if (rangePeriodStart && rangePeriodEnd) {
        filters = {
            where: {
                "createdAt": {
                    [Op.gte]: req.body.rangePeriodStart,
                    [Op.lte]: req.body.rangePeriodEnd
                }
            }
        }
    }

    if (city) {
        filters.where = {
            ...filters.where,
            ["9_city"]: {
                [Op.eq]: city
            }
        }
    }

    if (type) {
        filters.where = {
            ...filters.where,
            ["2_help_type"]: {
                [Op.eq]: type
            }
        }
    }

    console.log('req.body', req.body)
    console.log('filters', filters)
    Drugstore.findAll(filters).then((data) => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.findHotLine = (req, res) => {
    const {
        rangePeriodStart,
        rangePeriodEnd,
        city,
        reason,
        result
    } = req.body
    let filters = {}

    if (rangePeriodStart && rangePeriodEnd) {
        filters = {
            where: {
                "4_date": {
                    [Op.gte]: req.body.rangePeriodStart,
                    [Op.lte]: req.body.rangePeriodEnd
                }
            }
        }
    }

    if (city) {
        filters.where = {
            ...filters.where,
            ["1_city"]: {
                [Op.eq]: city
            }
        }
    }

    if (reason) {
        filters.where = {
            ...filters.where,
            ["5_reason_for_petition"]: {
                [Op.substring]: reason
            }
        }
    }

    if (result) {
        filters.where = {
            ...filters.where,
            ["6_consultation_results"]: {
                [Op.substring]: result
            }
        }
    }

    HotLine.findAll(filters).then((data) => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.findGroupsHiv = (req, res) => {
    const {
        rangePeriodStart,
        rangePeriodEnd,
        city,
    } = req.body
    let filters = {}

    if (rangePeriodStart && rangePeriodEnd) {
        filters = {
            where: {
                "2_date": {
                    [Op.gte]: req.body.rangePeriodStart,
                    [Op.lte]: req.body.rangePeriodEnd
                }
            }
        }
    }

    if (city) {
        filters.where = {
            ...filters.where,
            ["1_city"]: {
                [Op.eq]: city
            }
        }
    }

    GroupsHiv.findAll(filters).then((data) => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.findGroupsTG = (req, res) => {
    const {
        rangePeriodStart,
        rangePeriodEnd,
        city,
    } = req.body
    let filters = {}

    if (rangePeriodStart && rangePeriodEnd) {
        filters = {
            where: {
                "2_date": {
                    [Op.gte]: req.body.rangePeriodStart,
                    [Op.lte]: req.body.rangePeriodEnd
                }
            }
        }
    }

    if (city) {
        filters.where = {
            ...filters.where,
            ["1_city"]: {
                [Op.eq]: city
            }
        }
    }

    GroupsTG.findAll(filters).then((data) => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};
