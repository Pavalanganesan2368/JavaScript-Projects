const inputText = document.querySelector('#input-text');
const inputButton = document.querySelector('.input-button');
const containerDisplay = document.querySelector('.container-display');

inputButton.addEventListener('click', () => {
  let createText = document.createElement("li");
  createText.textContent = inputText.value;

  createText.classList.add("container-displays");

  let createDeleteButton = document.createElement("button");
  createDeleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';

  createDeleteButton.addEventListener('click', () => {
    createText.remove();
  });
  
  createText.appendChild(createDeleteButton);
  containerDisplay.appendChild(createText);
  createDeleteButton.classList.add("class","containerDelete");
  
  let createAddButton = document.createElement("button");
  createAddButton.innerHTML = '<i class="fa-solid fa-strikethrough"></i>';

  createAddButton.addEventListener('click', () => {
    createText.style.textDecoration = "line-through";
  });
  
  createAddButton.classList.add("class","container-add")
  createText.appendChild(createAddButton);
  containerDisplay.appendChild(createText);
  createDeleteButton.classList.add("class","containerDelete");
  inputText.value = '';
});