const path = require('path')
const fs = require('fs');
const makePlaylistVideo = require("../middleware/make-playlist-video");
const consola = require("consola");

module.exports = function (app, multer, express) {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/videos')
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname))
        }
    })

    const upload = multer({ storage: storage }).array('file')

    app.post('/api/upload/video', function (req, res) {
        console.log("REQ", req)
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(500).json(err)
            } else if (err) {
                return res.status(500).json(err)
            }
            res.status(200).json(req.files)

            console.log(req)

            if (req.files) {
                const filenameArray = req.files[0].filename.split('.')
                const folder = `./public/videos/${filenameArray[0]}`
                const pathVideoInFolder = `${folder}/${filenameArray.join('.')}`

                fs.promises.mkdir(`./public/videos/${filenameArray[0]}`, function (err) {
                    if (err) {
                        console.log(err)
                    }
                }).then(() => {
                    fs.rename(`./public/videos/${filenameArray.join('.')}`, pathVideoInFolder, function (err) {
                        if (err) throw err
                    })
                }).then(() => {
                    const probe = require('node-ffprobe')

                    probe(pathVideoInFolder).then(probeData => {

                        const size = {
                            width: probeData.streams[0].width,
                            height: probeData.streams[0].height
                        }
                        return { filenameArray, folder, size }

                    }).then((data) => {

                        consola.info({
                            message: `FOR video ${data.size.height}x${data.size.width}`,
                            badge: true
                        });

                        if (data.size.height >= 1080) {
                            // делаю 1080 720 480 360 240
                            makePlaylistVideo.createPlaylist(data, 1080)
                                .then(() => makePlaylistVideo.createPlaylist(data, 720))
                                .then(() => makePlaylistVideo.createPlaylist(data, 480))
                                .then(() => makePlaylistVideo.createPlaylist(data, 360))
                                .then(() => makePlaylistVideo.createPlaylist(data, 240))
                        } else if (data.size.height >= 720) {
                            // делаю 720 480 360 240
                            makePlaylistVideo.createPlaylist(data, 720)
                                .then(() => makePlaylistVideo.createPlaylist(data, 480))
                                .then(() => makePlaylistVideo.createPlaylist(data, 360))
                                .then(() => makePlaylistVideo.createPlaylist(data, 240))
                        } else if (data.size.height >= 480) {
                            // делаю 480 360 240
                            makePlaylistVideo.createPlaylist(data, 480)
                                .then(() => makePlaylistVideo.createPlaylist(data, 360))
                                .then(() => makePlaylistVideo.createPlaylist(data, 240))
                        } else if (data.size.height >= 360) {
                            // делаю 360 240
                            makePlaylistVideo.createPlaylist(data, 360)
                                .then(() => makePlaylistVideo.createPlaylist(data, 240))
                        } else {
                            // делаю 240
                            makePlaylistVideo.createPlaylist(data, 240)
                                .then(() => {
                                })
                        }
                    })

                })
            }
        })
    });

    app.get('/api/files', function (req, res) {
        const testFolder = './public/videos/';
        let fileInfos = [];
        fs.readdir(testFolder, (err, files) => {
            files.forEach(file => {
                fileInfos.push({
                    name: file,
                    url: testFolder + file,
                });
            });
            res.status(200).send(fileInfos);
        });
    })

    const storageImage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/images')
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname))
        }
    })

    const storagePreviewVideo = multer.diskStorage({
        destination: function (req, file, cb) {
            const folderName = file.originalname.split('.')
            cb(null, `public/videos/${folderName[0]}`)
        },
        filename: function (req, file, cb) {
            cb(null, 'preview' + path.extname(file.originalname))
        }
    })

    const uploadImage = multer({ storage: storageImage }).array('files')

    app.post('/api/upload/image', function (req, res) {
        uploadImage(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(500).json(err)
            } else if (err) {
                return res.status(500).json(err)
            }
            return res.status(200).json(req.files)
        })
    });

    const uploadVideoPreview = multer({ storage: storagePreviewVideo }).array('preview')
    app.post('/api/upload/preview', function (req, res) {
        uploadVideoPreview(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(500).json(err)
            } else if (err) {
                return res.status(500).json(err)
            }
            return res.status(200).json(req.files)
        })
    });

    app.use('/public', express.static('public'))
}