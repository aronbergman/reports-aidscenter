module.exports = (sequelize, Sequelize) => {
    const Testing = sequelize.define("testing", {
                "1_code": {
                    type: Sequelize.STRING
                },
                "2_how_did_you_know": {
                    type: Sequelize.STRING
                },
                "3_gender": {
                    type: Sequelize.STRING
                },
                "4_age": {
                    type: Sequelize.STRING
                },
                "5_first_sex": {
                    type: Sequelize.STRING
                },
                "6_sexual_partners_from_6_months": {
                    type: Sequelize.STRING
                },
                "7_constant_sexual_partner": {
                    type: Sequelize.STRING
                },
                "8_sex_using_a_condom": {
                    type: Sequelize.STRING
                },
                "9_condom_for_sex_with_a_permanent": {
                    type: Sequelize.STRING
                },
                "10_condom_for_sex_with_a_club": {
                    type: Sequelize.STRING
                },
                "11_condom_for_last_sex": {
                    type: Sequelize.STRING
                },
                "12_using_condom": {
                    type: Sequelize.STRING
                },
                "13_no_using_condom": {
                    type: Sequelize.STRING
                },
                "14_now_there_is_a_condom": {
                    type: Sequelize.STRING
                },
                "15_with_whom_sex": {
                    type: Sequelize.STRING
                },
                "16_used_drugs": {
                    type: Sequelize.STRING
                },
                "17_drugs_for_sex": {
                    type: Sequelize.STRING
                },
                "18_drugs_or_money_in_exchange_for_sex": {
                    type: Sequelize.STRING
                },
                "19_sexually_transmitted_diseases": {
                    type: Sequelize.STRING
                },
                "20_med_sexually_transmitted_diseases": {
                    type: Sequelize.STRING
                },
                "21_diagnosed_gepatit": {
                    type: Sequelize.STRING
                },
                "22_diagnosed_with_syphilis": {
                    type: Sequelize.STRING
                },
                "23_hiv_tested": {
                    type: Sequelize.STRING
                },
                "24_how_often_hiv_tested": {
                    type: Sequelize.STRING
                },
                "25_do_you_know_your_hiv_status": {
                    type: Sequelize.STRING
                },
                "26_you_are_a_citizen_of_russia": {
                    type: Sequelize.STRING
                },
                "27_registration_on_the_territory": {
                    type: Sequelize.STRING
                },
                "28_you_education": {
                    type: Sequelize.STRING
                },
                "29_the_nature_of_your_work": {
                    type: Sequelize.STRING
                },
                "30_marital_status": {
                    type: Sequelize.STRING
                },
                "31_you_are_a_listen_PrEP": {
                    type: Sequelize.STRING
                },
                "32_you_are_a_interest_PrEP": {
                    type: Sequelize.STRING
                },
                "33_you_are_a_used_PrEP": {
                    type: Sequelize.STRING
                },
                "34_for_prep_you_use": {
                    type: Sequelize.STRING
                },
                "35_you_have_started_taking_prep": {
                    type: Sequelize.STRING
                },
                "36_hiv_test_result": {
                    type: Sequelize.STRING
                },
                "37_hepatitis_test_result": {
                    type: Sequelize.STRING
                },
                "38_syphilis_test_result": {
                    type: Sequelize.STRING
                },
                "39_consulting_on_regular_testing_provided": {
                    type: Sequelize.STRING
                },
                "40_prevention_counseling_provided": {
                    type: Sequelize.STRING
                },
                "41_provided_counseling_on_receiving_treatment_for_hiv": {
                    type: Sequelize.STRING
                },
                "42_consultant": {
                    type: Sequelize.STRING
                },
                "43_date": {
                    type: Sequelize.STRING
                },
                "44_time": {
                    type: Sequelize.STRING
                },
                "45_consultant_comment": {
                    type: Sequelize.STRING
                },
                "46_city": {
                    type: Sequelize.STRING
                }
            }
        )
    ;

    return Testing;
};
