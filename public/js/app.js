const $translateForm = document.querySelector("form");
const $textInput = document.querySelector("#textareaInput");
const $sentimentIndicator = document.querySelector("#sentiment-indicator");

const submitBtn = document.querySelector("#btn-submit");
const happyEmojiUrl = "/img/happy.jpg";
const neutralEmojiUrl = "/img/neutral.jpg";
const sadEmojiUrl = "/img/sad.jpg";

function changeImage(sentiment) {
  if (sentiment === 1) {
    $sentimentIndicator.src = happyEmojiUrl;
    $sentimentIndicator.alt = "Happy emoji";
  } else if (sentiment === 0) {
    $sentimentIndicator.src = neutralEmojiUrl;
    $sentimentIndicator.alt = "Neutral emoji";
  } else {
    $sentimentIndicator.src = sadEmojiUrl;
    $sentimentIndicator.alt = "Sad emoji";
  }
}

$translateForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const text = $textInput.value;
  submitBtn.textContent = "Loading...";

  const body = {
    text,
  };

  fetch("/api/v1/sentiment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      return response.json().then((data) => {
        changeImage(data.sentiment);
        submitBtn.textContent = "Submit";
      });
    })
    .catch((err) => {
      console.log(err);
      alert("Error translating that text...");
      submitBtn.textContent = "Submit";
    });
});
