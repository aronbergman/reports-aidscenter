const ffmpeg = require('fluent-ffmpeg');
const fs = require("fs");

const createPlaylist = ({ filenameArray, folder }, quality) => {
    const infs = new ffmpeg
    const video = `${folder}/${filenameArray.join('.')}`
    const playlist = `${folder}/playlist-${quality}p.m3u8`
    const createResolution = {
        frameSize: '',
        bitrate: 0
    }

    switch (quality) {
        case 240:
            createResolution.frameSize = '426x240'
            createResolution.bitrate = '365k'
            break
        case 360:
            createResolution.frameSize = '640x360'
            createResolution.bitrate = '730k'
            break
        case 480:
            createResolution.frameSize = '854x480'
            createResolution.bitrate = '1800k'
            break
        case 720:
            createResolution.frameSize = '1280x720'
            createResolution.bitrate = '3000k'
            break
        case 1080:
            createResolution.frameSize = '1920x1080'
            createResolution.bitrate = '4500k'
            break
        default:
            createResolution.frameSize = '426x240'
            createResolution.bitrate = '365k'
            break
    }

    return new Promise((resolve, reject) => {
        infs.addInput(video).outputOptions([
            '-s:v:0 ' + createResolution.frameSize,
            '-c:v:0 libx264',
            '-b:v:0 ' + createResolution.bitrate,
            '-master_pl_name ' + quality + '-master.m3u8',
            '-f hls',
            '-max_muxing_queue_size 1024',
            '-hls_time 1',
            '-hls_list_size 0',
            '-hls_segment_filename', folder + '/' + quality + 'p-%d.ts'
        ]).output(playlist)
            // .on('start', function (commandLine) {
            //     console.log('Spawned Ffmpeg with command: ' + commandLine);
            // })
            .on('error', function (err, stdout, stderr) {
                console.log('An error occurred: ' + err.message, err, stderr);
            })
            .on('progress', function (progress) {
                console.log(`🚀 Processing: ${createResolution.frameSize} | ${createResolution.bitrate} | ${progress.percent.toFixed(2)}%`)
            })
            .on('end', function (err, stdout, stderr) {
                masterPlaylistWorker(folder, quality)
                if (quality === 240) {
                    fs.unlink(video, function (err) {
                        if (err) throw err;
                        console.log(`Оригинал видео удалён`);
                    });
                    // записать в базу данных новое видео
                }
                resolve()
            })
            .run()
    })
}

const masterPlaylistWorker = (folder, quality) => {
    const masterPlaylist = `${folder}/master.m3u8`
    const singleMaster = `${folder}/${quality}-master.m3u8`

    try {
        if (!fs.existsSync(masterPlaylist)) {
            fs.rename(singleMaster, masterPlaylist, (err) => {
                if (err) throw err;
                console.log(`Плейлист ${quality}-master.m3u8 переименован в master.m3u8`);
            });

        } else {
            fs.readFile(singleMaster, "utf8",
                function (error, data) {
                    if (error) throw error;
                    const start = data.indexOf('#EXT-X-STREAM-INF')
                    const finish = data.indexOf(`${quality}.m3u8`)
                    const strintToMaster = data.slice(start, finish)

                    fs.appendFile(masterPlaylist, strintToMaster, function (error) {
                        if (error) throw error;
                        fs.unlink(singleMaster, function (err) {
                            if (err) throw err;
                            console.log(`Расширен master.m3u8 из файла ${quality}-master.m3u8, последний удален`);
                        });
                    });
                });
        }
    } catch (e) {
        console.log(e)
    }
}

const makePlaylistVideo = {
    createPlaylist
};

module.exports = makePlaylistVideo;
