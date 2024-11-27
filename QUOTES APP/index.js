const containerPara = document.querySelector('#container-para');
const containerAuthor = document.querySelector('#container-author');
const buttonContainer = document.querySelector('#btn-container');

buttonContainer.addEventListener('click',() => {
  async function getQuateAPI() {
  const getAPI = await fetch('https://quotes-api-self.vercel.app/quote');
  const getAPIURL = await getAPI.json();
  
  containerPara.textContent = getAPIURL.quote;
  containerAuthor.textContent = `-${getAPIURL.author}`
}
  getQuateAPI();
})