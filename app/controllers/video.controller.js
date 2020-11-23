const db = require("../models");
const Video = db.video;
const User = db.user;

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
                res.status(500).send({ message: err.message });
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
            res.status(200).send({ videos: response });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.fetchCountVideo = (req, res) => {
    Video.findOne({
        where: { folder: req.body.folder }
    })
        .then(response => {

            Video.update(
                { counterView: ++response.counterView },
                { where: { folder: req.body.folder } }
            )

            res.status(200).send(response);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.fetchVoteVodeo = (req, res) => {
    const forUserVotes = {
        folder: req.body.folder,
        vote: req.body.vote,
        userId: req.body.user,
        userVotes: req.body.votes
    }

    Video.findOne({
        where: { folder: req.body.folder }
    })
        .then(response => {
            forUserVotes.vote = req.body.vote
            if (req.body.vote === 1) {
                Video.update(
                    { like: ++response.like },
                    { where: { folder: req.body.folder } }
                )
            } else if (req.body.vote === 0) {
                Video.update(
                    { dislike: ++response.dislike },
                    { where: { folder: req.body.folder } }
                )
            }

            User.update(
                { votes: JSON.stringify(forUserVotes.userVotes) },
                { where: { id: forUserVotes.userId } }
            ).then(() => {
                res.status(200).send({
                    video: response
                });
            })

        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}