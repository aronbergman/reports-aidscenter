const db = require("../models");
const Video = db.video;

exports.setVideo = (req, res) => {
    console.log('req.body', req.body)
    Video.create({
        title: req.body.title,
        description: req.body.description,
        folder: req.body.folder
    })
        .then(() => res.send({ message: 'Видео сохранено успешно.' }))
        .catch(err => res.status(500).send({ message: err.message }));
};

exports.getFirstList = (req, res) => {
    Video.findAll({
        limit: 12,
        subQuery: false,
        order: [['createdAt', 'DESC']]
    })
        .then(response => {
            res.status(200).send({
                videos: response
            });
        })
}