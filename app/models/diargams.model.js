module.exports = (sequelize, Sequelize) => {
    const Diagrams = sequelize.define("diagrams", {
                "code": {
                    type: Sequelize.STRING
                },
                "title": {
                    type: Sequelize.STRING
                },
                "type": {
                    type: Sequelize.STRING
                },
                "form": {
                    type: Sequelize.STRING
                },
                "order": {
                    type: Sequelize.INTEGER
                },
                "arrayType": {
                    type: Sequelize.BOOLEAN
                }
            }
        )
    ;

    return Diagrams;
};
