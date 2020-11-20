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
    Video.count().then(response => {
        const count = response
        Video.findAll({
            limit: 10,
            subQuery: false,
            order: [['createdAt', 'DESC']]
        })
            .then(response => {
                res.status(200).send({
                    videos: response,
                    count
                });
            })
            .catch(err => {
                res.status(500).send({message: err.message});
            });
    })
}

exports.fetchOffset = (req, res) => {
    Video.findAll({
        offset: req.body.offset * req.body.limit,
        limit: req.body.limit,
        subQuery: false,
        order: [['createdAt', 'DESC']]
    })
        .then(response => {
            res.status(200).send({videos: response});
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
}