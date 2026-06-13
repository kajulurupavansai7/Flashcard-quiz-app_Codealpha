let flashcards = JSON.parse(localStorage.getItem("flashcards")) || [
    {
        question: "What is HTML?",
        answer: "HyperText Markup Language"
    },
    {
        question: "What is CSS?",
        answer: "Cascading Style Sheets"
    },
    {
        question: "What is JavaScript?",
        answer: "Programming language for web development"
    }
];

let currentCard = 0;

const question = document.getElementById("question");
const answer = document.getElementById("answer");
const showBtn = document.getElementById("showBtn");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const addBtn = document.getElementById("addBtn");
const editBtn = document.getElementById("editBtn");
const deleteBtn = document.getElementById("deleteBtn");

const newQuestion = document.getElementById("newQuestion");
const newAnswer = document.getElementById("newAnswer");

function saveCards() {
    localStorage.setItem("flashcards", JSON.stringify(flashcards));
}

function displayCard() {
    if (flashcards.length === 0) {
        question.textContent = "No Flashcards Available";
        answer.textContent = "";
        return;
    }

    question.textContent = flashcards[currentCard].question;
    answer.textContent = flashcards[currentCard].answer;

    answer.classList.add("hidden");
    showBtn.textContent = "Show Answer";
}

displayCard();

showBtn.addEventListener("click", () => {
    answer.classList.toggle("hidden");

    if (answer.classList.contains("hidden")) {
        showBtn.textContent = "Show Answer";
    } else {
        showBtn.textContent = "Hide Answer";
    }
});

nextBtn.addEventListener("click", () => {
    currentCard = (currentCard + 1) % flashcards.length;
    displayCard();
});

prevBtn.addEventListener("click", () => {
    currentCard =
        (currentCard - 1 + flashcards.length) %
        flashcards.length;
    displayCard();
});

addBtn.addEventListener("click", () => {
    const q = newQuestion.value.trim();
    const a = newAnswer.value.trim();

    if (!q || !a) {
        alert("Please enter question and answer");
        return;
    }

    flashcards.push({
        question: q,
        answer: a
    });

    saveCards();

    newQuestion.value = "";
    newAnswer.value = "";

    currentCard = flashcards.length - 1;
    displayCard();
});

editBtn.addEventListener("click", () => {
    const q = newQuestion.value.trim();
    const a = newAnswer.value.trim();

    if (!q || !a) {
        alert("Enter updated question and answer");
        return;
    }

    flashcards[currentCard] = {
        question: q,
        answer: a
    };

    saveCards();

    displayCard();

    newQuestion.value = "";
    newAnswer.value = "";

    alert("Flashcard Updated");
});

deleteBtn.addEventListener("click", () => {
    if (flashcards.length === 0) return;

    flashcards.splice(currentCard, 1);

    if (currentCard >= flashcards.length) {
        currentCard = flashcards.length - 1;
    }

    saveCards();
    displayCard();
});