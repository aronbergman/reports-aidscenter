const db = require("../models");
const { Op } = require("sequelize");
const Testing = db.testing;

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
        .then(() => {
            res.send({ message: "Testing created!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.findTesting = (req, res) => {
    const { rangePeriodStart, rangePeriodEnd, usedDrugs, sexWorked, usedPrep, city, code, searchByCode, formType } = req.body
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

    if (searchByCode) {
        filters.where = {
            ...filters.where,
            ["1_code"]: {
                [Op.substring]: searchByCode
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
