const form = document.querySelector("#triviaForm");
const questions = document.querySelector('#questionsArea');
const puntaje = document.querySelector('#puntaje');
const btnResult = document.querySelector("#btnResult")
let score = 0;

form.addEventListener("submit", (e) => {
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

function validateQuestions (respuesta, typeAnswers){
  if (respuesta.response_code == 1){
    alert("Porfavor introduzca nuevos valores no se cuenta con las suficientes preguntas para su solicitud")
  } else  if (respuesta.response_code == 0){
    showQuestions(respuesta.results, typeAnswers);
  }
}

function showQuestions (preguntas, tipo) {
  switch (tipo) {
    case 'boolean':
      preguntas.forEach(pregunta => {
        const info = document.createElement("section");
        info.innerHTML += `
        <div class="container bg-white rounded my-3 p-2">
          <h3 >${pregunta.question}</h3>
          <div class="text-center">
            <button type="button" class="btn btn-success btn-lg m-3 true">Verdadero</button>
            <button type="button" class="btn btn-danger btn-lg m-3 false">Falso</button>
          </div>
        </div>
        `
        questions.appendChild(info)
      });

      const answersT =  document.querySelectorAll('.true')
      const answersF = document.querySelectorAll('.false')
      scoreTriviaT(answersT, answersF, preguntas);
      scoreTriviaF(answersT, answersF, preguntas);
      console.log(score)
    break;
  
    default:
      break;
  }
}

function scoreTriviaT(verdaderos, falsos, preguntas){
  verdaderos.forEach((verdadero,index) =>{
    verdadero.addEventListener("click", function (e) {
      falsos[index].disabled = true;
      if(preguntas[index].correct_answer === "True"){
        score = score + 100;
      }
    })
  })
}

function scoreTriviaF(verdaderos, falsos, preguntas){
  falsos.forEach((falso,index) =>{
    falso.addEventListener("click", function (e) {
      verdaderos[index].disabled = true;
      if(preguntas[index].correct_answer === "False"){
        score = score + 100;
      }      
    })
  })
}

btnResult.addEventListener('click', (e) => {
  e.preventDefault();
  puntaje.innerHTML = "Tu puntaje es: " + score;
})