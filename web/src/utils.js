export function displayDialogue(text, onDisplayEnd = () => {}) {
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

  const closeBtn = document.querySelector("#close");

  function onCloseBtnClick() {
    onDisplayEnd();
    dialogueUI.style.display = "none";
    dialogue.innerHTML = "";
    if (intervalRef) clearInterval(intervalRef);
    console.log("intervalRef", intervalRef);
    closeBtn.removeEventListener("click", onCloseBtnClick);
  }

  closeBtn.addEventListener("click", onCloseBtnClick);
}