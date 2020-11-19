module.exports = (sequelize, Sequelize) => {
    const Video = sequelize.define("videos", {
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        folder: {
            type: Sequelize.STRING
        }
    });

    return Video;
};
