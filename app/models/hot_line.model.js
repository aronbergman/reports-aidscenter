module.exports = (sequelize, Sequelize) => {
    const HotLine = sequelize.define("hot_line", {
                "1_city": {
                    type: Sequelize.STRING
                },
                "2_consultant": {
                    type: Sequelize.STRING
                },
                "3_source_of_appeal": {
                    type: Sequelize.STRING
                },
                "4_date": {
                    type: Sequelize.STRING
                },
                "5_reason_for_petition": {
                    type: Sequelize.STRING
                },
                "6_consultation_results": {
                    type: Sequelize.STRING
                },
                "7_consulting_on_regular_testing_provided": {
                    type: Sequelize.STRING
                },
                "8_prevention_counseling_provided": {
                    type: Sequelize.STRING
                },
                "9_provided_counseling_on_receiving_treatment_for_hiv": {
                    type: Sequelize.STRING
                },
                "10_consultant_comment": {
                    type: Sequelize.STRING
                },
            }
        )
    ;

    return HotLine;
};
