const questions = [
    {
        question: "Como o aplicativo de música informa aos usuários sobre sua política de privacidade?",
        answers: [
            { text: "Pop-up explicativo ao iniciar o aplicativo", correct: false },
            { text: "Não possui política de privacidade", correct: false },
            { text: "Informações no final dos termos de uso", correct: false },
            { text: "Através de um cadastro", correct: true },
        ]
    },
    {           
        question: "O aplicativo solicita o consentimento dos usuários antes de utilizar cookies?",
        answers: [
            { text: "Não", correct: false },
            { text: "Sim, com uma mensagem clara", correct: true },
            { text: "Não utiliza cookies", correct: false },
            { text: " Apenas em configurações avançadas", correct: false },
        ]
    },
    {           
        question: "Quais medidas o aplicativo adota para proteger os dados dos usuários?",
        answers: [
            { text: "Criptografia de dados sensíveis", correct: false },
            { text: "Não há opção para gerenciar preferências.", correct: false },
            { text: "Confia apenas na senha do usuário", correct: true },
            { text: "Atualizações automáticas do sistema", correct: false },
        ]
    },
    {           
        question: "O aplicativo informa sobre a retenção e exclusão de dados armazenados?",
        answers: [
            { text: "Sim, atráves da sáida do aplicativo", correct: true },
            { text: "Não retém dados", correct: false },
            { text: " Não especifica política de retenção", correct: false },
            { text: "informações disponíveis apenas no suporte", correct: false },
        ]
    },
    {           
        question: "O aplicativo permite que os usuários excluam suas contas e dados de forma fácil?",
        answers: [
            { text: "Não", correct: false },
            { text: "Apenas mediante solicitação", correct: false },
            { text: "Exclusão apenas por e-mail", correct: false },
            { text: "Sim, cabe ao usuário sair da conta e apagar os dados ou desinstalar o aplicativo ", correct: true },
        ]
    },
    {           
        question: "O aplicativo compartilha informações dos usuários com parceiros comerciais?",
        answers: [
            { text: "Sem informação clara sobre compartilhamento", correct: false },
            { text: "Compartilha automaticamente", correct: false },
            { text: "Sim, apenas com consentimento", correct: false },
            { text: "Não compartilha informações", correct: true },
        ]
    },
    {           
        question: "Como o aplicativo aborda questões de privacidade de menores de idade",
        answers: [
            { text: "Restringe acesso a menores de idade", correct: false },
            { text: "Sem política específica para menores", correct: true },
            { text: "Solicita autorização dos responsáveis", correct: false },
            { text: "Sem informações claras sobre o assunto", correct: false },
        ]
    },

];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn"); 
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Você pontuou ${score} de ${questions.length}!`;
    nextButton.innerHTML = "Tente novamente"
    nextButton.style.display = "block";
}



function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}





nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();

var msgCookies = document.getElementById('cookies-msg')

function aceito(){
    localStorage.lgpd = "sim"
    msgCookies.classList.remove('mostrar')
}

if(localStorage.lgpd == 'sim'){
    msgCookies.classList.remove('mostrar')
}else{
    msgCookies.classList.add('mostrar')
}