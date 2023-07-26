const form = document.querySelector("#triviaForm");
const questions = document.querySelector('#questionsArea');

form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  fetch(
    `https://opentdb.com/api.php?amount=10&category=${form.category.value}&difficulty=${form.difficult.value}&type=${form.typeAnswers.value}`
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response)
      //showQuestions(response);
    })
    .catch((err) => console.error(err));
});


function showQuestions(preguntas){
  questions.innerHTML='';
  questions.innerHTML = '
  <h3>${}</h3>'
}