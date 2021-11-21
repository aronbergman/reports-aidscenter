module.exports = (sequelize, Sequelize) => {
    const GroupsHiv = sequelize.define("groups_hiv", {
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
                "5_number_of_people_consulted_on_starting_treatment": {
                    type: Sequelize.STRING
                },
                "6_people_consulted_on_adherence_to_treatment": {
                    type: Sequelize.STRING
                },
                "7_psychological_counseling_with_hiv": {
                    type: Sequelize.STRING
                },
                "8_consultant_comment": {
                    type: Sequelize.STRING
                },
            }
        )
    ;

    return GroupsHiv;
};
