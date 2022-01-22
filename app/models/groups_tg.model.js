module.exports = (sequelize, Sequelize) => {
    const GroupsTG = sequelize.define("groups_tg", {
                "1_city": {
                    type: Sequelize.STRING
                },
                "2_date": {
                    type: Sequelize.STRING
                },
                "3_number_of_participants": {
                    type: Sequelize.STRING
                },
                "4_list_of_participants": {
                    type: Sequelize.STRING
                },
                "5_medical_principles_transgender_transition": {
                    type: Sequelize.STRING
                },
                "6_psychology_principles_transgender_transition": {
                    type: Sequelize.STRING
                },
                "7_consultant_comment": {
                    type: Sequelize.STRING
                },
            }
        )
    ;

    return GroupsTG;
};
