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
            options: ["Once a month", "Every day", "2-3 Time a week", "Never"],
            correct_option: "2 -3 Times a week"
        }
    ],
    BrushingTeeth: [
        {
            question: "Test Question for brushing teeth",
            options: ["1", "2", "3", "4"],
            correct_option: "3"
        }
    ]


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
    console.log("Should only print once")
    console.log("Inside DailyQuiz")
    console.log(quizzes);
    return quizzes;
}

export function getQuiz(name) {
    let quizzes = [];
    quizzes.push(quizdata[name]);
    console.log("Inside getQuiz Function")
    console.log(name);
    console.log(quizzes);
    return quizzes;

}