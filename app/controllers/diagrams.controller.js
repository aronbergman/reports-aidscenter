const db = require("../models");
const Diagrams = db.diagrams;

exports.findDiagram = (req, res) => {
    Diagrams.findAll({
        where: {
            "form": req.body.type
        }
    })
        .then((data) => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};
