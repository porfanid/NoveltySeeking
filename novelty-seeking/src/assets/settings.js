//---------------------------------------------------------------------------------
// Questions configuration
//---------------------------------------------------------------------------------
export const is_next_option_random = false;
export const number_of_questions = 7
export const first_choice_has_button = false;
export const random_choices=["MICROWORLD", "ANCIENT_CIVILIZATION", "LANDSCAPES", "NATURE_BLOOMING", "FOOD", "FUTURISTIC_TRANSPORTATION"];

// Προσοχή!! Αν αυτό γίνει true, έχουμε μόνο 4 ερωτήσεις(εκτός και αν προστεθούν και άλλες κατηγορίες στον επάνω πίνακα)
export const remove_all_previous_values_from_choices = false;

//---------------------------------------------------------------------------------
// Quiz configuration
//---------------------------------------------------------------------------------
export const show_next_button_to_quiz = true;

//---------------------------------------------------------------------------------
// video configuration
//---------------------------------------------------------------------------------
export const show_next_button_to_video = false;
export const delay_quiz_page = 3000;
export const show_countdown = true;

//---------------------------------------------------------------------------------
// auth configuration
//---------------------------------------------------------------------------------
export const show_auth = true;
export const use_otp = false;
export const otp_secret = "MZ3WK4TFMV2GK4MZ3WK4TFMV2GK4";
export const correct_password = "brain2024";

// time per question

export const get_time_for_each_question = true;

export const get_time_for_entire_quiz = false;
