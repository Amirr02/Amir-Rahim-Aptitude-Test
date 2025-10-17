const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

let step = 0;
let userAnswers = {};

const questions = [
    "Hello, I will help you choose your phone plan! Is this a Family or Individual Plan? (Family/Individual)",
    "Do you want a Postpaid or Prepaid Account? (Postpaid/Prepaid)",
    "What is your data usage? (High/Medium/Low)"
];

const recommendations = {
    "Family-Postpaid-High": "We recommend the Family Unlimited Plan",
    "Family-Postpaid-Medium": "We recommend the Family Standard Plan",
    "Family-Postpaid-Low": "We recommend the Family Basic Plan",
    "Family-Prepaid-High": "We recommend the Family Prepaid Unlimited Plan",
    "Family-Prepaid-Medium": "We recommend the Family Prepaid Standard Plan",
    "Family-Prepaid-Low": "We recommend the Family Prepaid Basic Plan",
    "Individual-Postpaid-High": "We recommend the Individual Unlimited Plan",
    "Individual-Postpaid-Medium": "We recommend the Individual Standard Plan",
    "Individual-Postpaid-Low": "We recommend the Individual Basic Plan",
    "Individual-Prepaid-High": "We recommend the Individual Prepaid Unlimited Plan",
    "Individual-Prepaid-Medium": "We recommend the Individual Prepaid Standard Plan",
    "Individual-Prepaid-Low": "We recommend the Individual Prepaid Basic Plan"
};

// Function to display bot messages
function botMessage(text) {
    const msg = document.createElement("div");
    msg.classList.add("message", "bot");
    msg.textContent = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to display user messages
function userMessage(text) {
    const msg = document.createElement("div");
    msg.classList.add("message", "user");
    msg.textContent = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to handle input
function handleInput() {
    const input = userInput.value.trim();
    if (!input) return;

    userMessage(input);

    // Error handling for unexpected inputs
    const validAnswers = [
        ["Family", "Individual"],
        ["Postpaid", "Prepaid"],
        ["High", "Medium", "Low"]
    ];

    if (!validAnswers[step].includes(input)) {
        botMessage("Sorry, I didn’t understand that. Please choose one of the options.");
        userInput.value = "";
        return;
    }

    // Save user answer
    if (step === 0) userAnswers.planType = input;
    if (step === 1) userAnswers.accountType = input;
    if (step === 2) userAnswers.dataUsage = input;

    step++;

    if (step < questions.length) {
        botMessage(questions[step]);
    } else {
        const key = `${userAnswers.planType}-${userAnswers.accountType}-${userAnswers.dataUsage}`;
        botMessage(recommendations[key]);
    }

    userInput.value = "";
}

// Initial bot message
botMessage(questions[step]);

sendBtn.addEventListener("click", handleInput);
userInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") handleInput();
});
