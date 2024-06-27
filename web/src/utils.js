export function displayDialogue(text, onDisplayEnd) {
  const dialogueUI = document.querySelector("#textbox-container");
  const dialogue = document.querySelector("#dialogue");

  dialogueUI.style.display = "block";

  let index = 0;
  let currentText = "";
  const intervalRef = setInterval(() => {
    if (index < text.length) {
      currentText += text[index];
      dialogue.innerHTML = currentText;
      index++;
      return;
    }

    clearInterval(intervalRef);
  }, 10);
}