const form = document.querySelector("#triviaForm");
const questions = document.querySelector("#questionsArea");
const puntaje = document.querySelector("#puntaje");
const btnResult = document.querySelector("#btnResult");
const btnNewTrivia = document.querySelector("#btnNewTrivia");
const answeres = document.querySelector("#answeres");
let score = 0;

form.addEventListener("submit", (e) => {
  btnResult.disabled = false;
  e.preventDefault();
  fetch(
    `https://opentdb.com/api.php?amount=10&category=${form.category.value}&difficulty=${form.difficult.value}&type=${form.typeAnswers.value}`
  )
    .then((response) => response.json())
    .then((response) => {
      validateQuestions(response, form.typeAnswers.value);
    })
    .catch((err) => console.error(err));
});

function validateQuestions(respuesta, typeAnswers) {
  if (respuesta.response_code == 1) {
    alert(
      "Porfavor introduzca nuevos valores no se cuenta con las suficientes preguntas para su solicitud"
    );
  } else if (respuesta.response_code == 0) {
    showQuestions(respuesta.results, typeAnswers);
  }
}

function showQuestions(preguntas, tipo) {
  switch (tipo) {
    case "boolean":
      preguntas.forEach((pregunta) => {
        const info = document.createElement("section");
        info.innerHTML += `
        <div class="container bg-white rounded my-3 p-2">
          <h3 >${pregunta.question}</h3>
          <div class="text-center">
            <button type="button" class="btn btn-success btn-lg m-3 true">Verdadero</button>
            <button type="button" class="btn btn-danger btn-lg m-3 false">Falso</button>
          </div>
        </div>
        `;
        questions.appendChild(info);
      });

      const answersT = document.querySelectorAll(".true");
      const answersF = document.querySelectorAll(".false");
      scoreTriviaTF(answersT, answersF, preguntas);
      break;
    case "multiple":
      preguntas.forEach((pregunta) => {
        pregunta.incorrect_answers.push(pregunta.correct_answer);
        shuffleArray(pregunta.incorrect_answers);
        const info = document.createElement("section");
        info.innerHTML += `
        <div class="container bg-white rounded my-3 p-2">
          <h3 >${pregunta.question}</h3>
          <div class="text-center my-3">
          <button type="button" class="btn btn-primary btn-lg btnResp1">${pregunta.incorrect_answers[0]}</button>
          <button type="button" class="btn btn-primary btn-lg btnResp2">${pregunta.incorrect_answers[1]}</button>
          <button type="button" class="btn btn-primary btn-lg btnResp3">${pregunta.incorrect_answers[2]}</button>
          <button type="button" class="btn btn-primary btn-lg btnResp4">${pregunta.incorrect_answers[3]}</button>
          </div>
        </div>
        `;
        questions.appendChild(info);
      });

      const answer1 = document.querySelectorAll('.btnResp1');
      const answer2 = document.querySelectorAll('.btnResp2');
      const answer3 = document.querySelectorAll('.btnResp3');
      const answer4 = document.querySelectorAll('.btnResp4');
      scoreTriviaM(answer1, answer2, answer3, answer4, preguntas);
      break;
    default:
      break;
  }
}

function shuffleArray(inputArray) {
  inputArray.sort(() => Math.random() - 0.5);
}

function scoreTriviaTF(verdaderos, falsos, preguntas) {
  verdaderos.forEach((verdadero, index) => {
    verdadero.addEventListener("click", function (e) {
      falsos[index].disabled = true;
      if (preguntas[index].correct_answer === "True") {
        score = score + 100;
      }
    });
  });
  falsos.forEach((falso, index) => {
    falso.addEventListener("click", function (e) {
      verdaderos[index].disabled = true;
      if (preguntas[index].correct_answer === "False") {
        score = score + 100;
      }
    });
  });
}

function scoreTriviaM (rs1, rs2, rs3, rs4, preguntas) {
 rs1.forEach((r1,index) => {
  r1.addEventListener('click', function (e) {
    rs2[index].disabled = true;
    rs3[index].disabled = true;
    rs4[index].disabled = true;
    if(preguntas[index].correct_answer === r1.innerHTML){
      score = score + 100;
    }
  })
 })
 rs2.forEach((r2,index) => {
  r2.addEventListener('click', function (e) {
    rs1[index].disabled = true;
    rs3[index].disabled = true;
    rs4[index].disabled = true;
    if(preguntas[index].correct_answer === r2.innerHTML){
      score = score + 100;
    }
  })
 })
 rs3.forEach((r3,index) => {
  r3.addEventListener('click', function (e) {
    rs2[index].disabled = true;
    rs1[index].disabled = true;
    rs4[index].disabled = true;
    if(preguntas[index].correct_answer === r3.innerHTML){
      score = score + 100;
    }
  })
 })
 rs4.forEach((r4,index) => {
  r4.addEventListener('click', function (e) {
    rs2[index].disabled = true;
    rs3[index].disabled = true;
    rs1[index].disabled = true;
    if(preguntas[index].correct_answer === r4.innerHTML){
      score = score + 100;
    }
  })
 })
}

btnResult.addEventListener("click", (e) => {
  e.preventDefault();
  puntaje.innerHTML = "Tu puntaje es: " + score;
});

btnNewTrivia.addEventListener("click", (e) => {
  e.preventDefault();
  questions.innerHTML = "";
  puntaje.innerHTML = "";
  btnResult.disabled = true;
  score = 0;
});
