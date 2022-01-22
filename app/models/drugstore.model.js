module.exports = (sequelize, Sequelize) => {
    const Drugstore = sequelize.define("drugstore", {
                "1_code": {
                    type: Sequelize.STRING
                },
                "2_help_type": {
                    type: Sequelize.STRING
                },
                "3_issue_date": {
                    type: Sequelize.STRING
                },
                "4_description_of_circuit": {
                    type: Sequelize.STRING
                },
                "5_consulting_on_regular_testing_provided": {
                    type: Sequelize.STRING
                },
                "6_prevention_counseling_provided": {
                    type: Sequelize.STRING
                },
                "7_provided_counseling_on_receiving_treatment_for_hiv": {
                    type: Sequelize.STRING
                },
                "8_consultant_comment": {
                    type: Sequelize.STRING
                },
                "9_city": {
                    type: Sequelize.STRING
                },
            }
        )
    ;

    return Drugstore;
};
