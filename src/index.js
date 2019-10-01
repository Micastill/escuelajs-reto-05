const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
let API = 'https://rickandmortyapi.com/api/character/';
//let API = 'https://us-central1-escuelajs-api.cloudfunctions.net/characters';

let next_fecht = localStorage;
next_fecht.setItem('next_fecht', 'start');

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      next_fecht.setItem('next_fecht', response.info.next);
      const characters = response.results;
      let output = characters.map(character => {
        return `
      <article class="Card">
        <img src="${character.image}" />
        <h2>${character.name}<span>${character.species}</span></h2>
      </article>
    `
      }).join('');
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

async function loadData () {

  if (next_fecht.getItem('next_fecht') != 'start'){
  let response = await getData(next_fecht.getItem('next_fecht') );
  }else{
  let responde = await getData(API);
  } 
  
}

const killObserver = () => {
  let newItem = document.createElement('h3');
  newItem.innerText = 'Ya no hay personajes para mostrar...';
  $app.appendChild(newItem);
  intersectionObserver.disconnect();

}

const intersectionObserver = new IntersectionObserver(entries => {
  if(next_fecht.getItem('next_fecht') === ''){
    killObserver();
  } else if (entries[0].isIntersecting){
    loadData();
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);