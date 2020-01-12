let person;
const gallery = document.getElementById('gallery')
const searchCont = document.getElementsByClassName('search-container')
const url = 'https://randomuser.me/api/?results=12&nat=us'

/////////HELPER FUNCTIONS/////////
//Creates elements//
const createElement = (element, attr = {}, text = '') => {
  let myElement = document.createElement(element);

  for (let prop in attr){
    myElement[prop] = attr[prop];
  }

  myElement.textContent = text;
  return myElement;
}

/////////SEARCH DIV FEATURE/////////
//creates search elements
const searchForm = createElement("FORM", {action: '#', method: 'get'})
const searchInput = createElement("INPUT", {type: 'search', id: 'search-input', className: 'search-input', placeholder: 'Search...'})
const searchSubmit = createElement("INPUT", {type: 'submit', value: '&#x1F50D;', id: 'search-submit', className: 'search-submit'})

const createCards = (person) => {
  //create gallery cards
  const card = createElement("DIV", {className: "card"});
  const cardImgCont = createElement("DIV", {className: "card-img-container"})
  const cardInfo = createElement("DIV", {className: "card-info-container"})
  const cardImg = createElement("IMG", {className: "card-img", src: `${person.picture.large}`, alt: "Profile picture"})
  const cardName = createElement("H3", {id: "name", className:"card-name cap"}, `${person.name.first} ${person.name.last}`)
  const cardEmail = createElement("P", {className: "card-text"}, `${person.email}`)
  const cardCityState = createElement("P", {className: "card-text cap"}, `${person.location.city}`+`, `+ `${person.location.state}`)

  //appending gallery cards to page
  cardInfo.append(cardName, cardEmail, cardCityState);
  cardImgCont.append(cardImg);
  card.append(cardImgCont, cardInfo);
  gallery.append(card);

  //click handler to create modal
  card.addEventListener('click', () => {
    createModal(person)
  })
}
        
const createModal = (person) => {
  //create modal elements
  const button = createElement("BUTTON", {type:'button', id: 'modal-close-btn', className:'modal-class-btn'}, "X")
  const modalCont = createElement("DIV", {className: 'modal-container'});
  const modal = createElement("DIV", {className: 'modal'});
  const modalInfo = createElement("DIV", {className: 'modal-info-container'})
  const modalImg = createElement("IMG", {className: 'modal-img', src: `${person.picture.large}`, alt: 'Profile picture'},)
  const modalName = createElement("H3", {id: 'name', className: 'modal-name cap'}, `${person.name.first} ${person.name.last}`)
  const modalEmail = createElement("P", {className: 'modal-text'}, `${person.email}`)
  const modalCityState = createElement("P", {className: 'modal-text cap'}, `${person.location.city}`)
  const hr = createElement("HR");
  const modalPhone = createElement("P", {className: 'modal-text'}, `${person.phone}`)
  const modalAddr = createElement("P", {className: 'modal-text'}, `${person.location.street.number} ${person.location.street.name}`+`, `+ `${person.location.state} ${person.location.postcode}`)
  const bdaySlice = `${person.dob.date}`
  const bdayNew = (bdaySlice.substr(5,2) +'/'+ bdaySlice.substr(8,2) +'/'+ bdaySlice.substr(2,2))  
  const modalBday = createElement("P", {className: 'modal-text'}, `Birthday: `+ bdayNew)
  const btnContainer = createElement("DIV", {className: 'modal-btn-container'})
  const nextBtn = createElement("BUTTON", {type: 'button', id: 'modal-prev', className: 'modal-prev btn'}, 'Prev')
  const prevBtn = createElement("BUTTON", {type: 'button', id: 'modal-next', className: 'modal-next btn'}, 'Next')

  //appends modal elements to the page
  modalInfo.append(modalImg, modalName, modalEmail, modalCityState, hr, modalPhone, modalAddr, modalBday)
  btnContainer.append(prevBtn, nextBtn)
  modal.append(button, modalInfo, btnContainer);
  modalCont.append(modal);
  gallery.append(modalCont)

  //click handler to for the 'close' button on modal
  button.addEventListener('click', () => {
    modalCont.style.display = 'none'; 
  })
}

//appends search elements to the page
searchForm.append(searchInput, searchSubmit)
for (let i=0; i < searchCont.length; i++){
  searchCont[i].append(searchForm)
}

const search = (text, people) => {
  let searchStore = []
  people.map(function(person){
    let fullName = (`${person.name.first} ${person.name.last}`)
    if (fullName.toLowerCase().includes(text.toLowerCase())){
      searchStore.push(person);
    }  
  })

  console.log(searchStore)
  if (searchStore.length > 0) {
    ('.card').hide();
    //debugger;
    console.log(people)
    console.log(searchStore)
    createCards(searchStore)
  }
}

searchSubmit('click', (event) => {
  event.preventDefault();
  text = searchInput.value;
  search(text,people)
})

//generates HTML for each card
const generateCardHTML = (data) => {
    console.log(data)
    people = data.results;
    return people.map(function(person){
      createCards(person)
      //debugger;
    })
}

/////////FETCH API REQUEST/////////
fetch(url)
    .then((response) => response.json())
    .then(generateCardHTML)
    .catch(function(error){
      console.log(error)      
    })


