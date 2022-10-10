export default quizdata = {
    memeQuiz: [
        {
            question: "What is the best movie of all time?",
            options: ["Shrek 2", "Titanic", "Top Gun", "That one anime you love so much"],
            correct_option: "Shrek 2"
        },
        {
            question: "What is the best Anime of all time?",
            options: ["One Piece", "Cory in the house", "JOJO", "Naruto"],
            correct_option: "Cory in the house"
        },
        {
            question: "Best drink in the world?",
            options: ["Coke", "Sprite", "Gatorate", "Alcohol"],
            correct_option: "Alcohol"
        }
    ],
    cavityQuiz: [
        {
            question: "What is a cavity?",
            options: ["Shrek 2", "Titanic", "Top Gun", "That one anime you love so much"],
            correct_option: "Shrek 2"
        },
        {
            question: "How can a cavity affect your health?",
            options: ["One Piece", "Cory in the house", "JOJO", "Naruto"],
            correct_option: "Cory in the house"
        },
        {
            question: "How does t. Please include citations in your answer.",
            options: ["Coke", "Sprite", "Gatorate", "Alcohol"],
            correct_option: "Alcohol"
        }
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
    const QUIZ_SIZE = 4;

    let quizzes = [];
    // Get each question an put it in quizzes
    Object.keys(quizdata).forEach((quiz) => quizzes.push(...quizdata[quiz]));
    while (quizzes.length > QUIZ_SIZE) {
        quizzes.splice(Math.floor(Math.random() * quizzes.length), 1);
    }
    quizzes = shuffleArray(quizzes);

    return quizzes;
}