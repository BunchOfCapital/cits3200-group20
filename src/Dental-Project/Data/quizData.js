import react, { useState } from "react";

export default quizdata = {
    Hygiene: [
        {
            question: "How long should you brush your teeth for",
            options: ["2 minutes", "1 hour", "10 seconds", "10 minutes"],
            correct_option: "2 minutes"
        },
        {
            question: "What colour should your teeth be?",
            options: ["Red", "Pink", "White", "Blue"],
            correct_option: "White"
        },
        {
            question: "How often should you floss?",
            options: ["Once a month", "Every day", "Once a week", "Never"],
            correct_option: "Every day"
        },
        {
            question: "How many times a day should you brush your teeth?",
            options: ["One time", "Four times", "Two times", "Zero times"],
            correct_option: "Two times"
        },
        {
            question: "A child should be seen by a dentist at what age?",
            options: ["7 years old", "3 years old", "5 years old", "1 year old"],
            correct_option: "1 year old"
        },
        {
            question: "Toothbrushes should be replaced every: ",
            options: ["2-3 Months", "1-2 Weeks", "4-6 Months", "1-2 Years"],
            correct_option: "2-3 Months"
        },
    ],
    ToothDecay: [
        {
            question: "What causes tooth decay?",
            options: ["Acid", "Age", "Cavities", "Caffeine"],
            correct_option: "Acid"
        },
        {
            question: "What drinks are acidic and can cause tooth decay?",
            options: ["Beer", "Soft drinks", "Water", "Sparkling Water"],
            correct_option: "Soft drinks"
        },
        {
            question: "What is a symptom of tooth decay?",
            options: ["Black/Brown stains on the tooth surface", "Tooth becoming loose", "Nose bleeds", "Sore tongue"],
            correct_option: "Black/Brown stains on the tooth surface"
        },
        {
            question: "What is the best way to avoid tooth decay?",
            options: ["Eating sugar filled food/drinks", "Avoid sharing eating utensils", "Having a healthy, balanced diet", "Using more force when brushing your teeth"],
            correct_option: "Having a healthy, balanced diet"
        }
    ],
    HowToFloss: [
        {
            question: "About how much flossing wire should you use?",
            options: ["30cm", "100cm", "10cm", "5cm"],
            correct_option: "30cm"
        },
        {
            question: "How should you clean your teeth with flossing wire?",
            options: ["Press the wire between teeth and into the gum", "Guide the wire gently between your teeth", "Clean the front of your teeth", "Scrape your tongue with the flossing wire"],
            correct_option: "Guide the wire gently between your teeth"
        },
        {
            question: "Should you reuse your flossing wire?",
            options: ["Yes its better for the environment", "No", "You can use it more than once", "It's cost effective to keep it"],
            correct_option: "No"
        },

    ],

    BrushingTeeth: [
        {
            question: "What is the correct amount of toothpaste to use?",
            options: ["The size of a grain of rice", "The size of a pea", "The full brush length", "A huge dollop"],
            correct_option: "The size of a pea"
        },
        {
            question: "How hard should the bristles be?",
            options: ["Soft", "Medium", "Hard", "It doesn't matter"],
            correct_option: "Soft"
        },
        {
            question: "Is it ok to share a toothbrush?",
            options: ["It's always ok", "Yes its fine", "Yes, but only if you know them", "No, bacteria could be shared"],
            correct_option: "No, bacteria could be shared"
        },
        {
            question: "How should you brush your teeth?",
            options: ["Powerful strokes, side to side", "Short/light strokes, up and down", "Light strokes, side to side", "Powerful strokes, up and down"],
            correct_option: "Short/light strokes, up and down"
        },
        {
            question: "Where should you leave your toothbrush when your finished?",
            options: ["Leave it on the bathroom bench", "Place it in a travel bag", "Let it air-dry whilst upright", "Soak it in water"],
            correct_option: "Let it air-dry whilst upright"
        },

    ],





};

// https://www.w3docs.com/snippets/javascript/how-to-randomize-shuffle-a-javascript-array.html 
function shuffleArray(array) {
    let curId = array.length;
    // There remain elements to shuffle
    while (0 !== curId) {
        // Pick a remaining element
        let randId = Math.floor(Math.random() * curId);
        curId -= 1;
        // Swap it with the current element.
        let tmp = array[curId];
        array[curId] = array[randId];
        array[randId] = tmp;
    }
    return array;
}

export function getDailyQuiz() {

    const QUIZ_SIZE = 8;

    let quizzes = [];
    // Get each question an put it in quizzes
    Object.keys(quizdata).forEach((quiz) => quizzes.push(...quizdata[quiz]));
    while (quizzes.length > QUIZ_SIZE) {
        quizzes.splice(Math.floor(Math.random() * quizzes.length), 1);
    }
    quizzes = shuffleArray(quizzes);
    return quizzes;
}

export function getQuiz(name) {
    let quizzes = [];
    quizzes.push(...quizdata[name])
    return quizzes;

}