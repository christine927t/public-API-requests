let person;
const url = 'https://randomuser.me/api/?results=12&nat=us'

/////////SEARCH DIV FEATURE/////////
//creates search elements
const $searchForm = $("<form action='#' method='get'>")
const $searchInput = $("<input type='search' id='search-input' class='search-input' placeholder='Search...'>")
const $searchSubmit = $("<input type='submit' value='&#x1F50D;' id='search-submit class='search-submit'>")



/////////HELPER FUNCTIONS/////////
const createCards = (person) => {
  //create gallery cards
  const $card = $("<div class='card'></div>")
  const $cardImgCont = $("<div class='card-img-container'></div>")
  const $cardInfo = $("<div class='card-info-container'></div>")
  const $cardImg = $("<img class='card-img' src='https://placehold.it/90x90' alt='Profile picture'>")
  const $cardName = $("<h3 id='name' class='card-name cap'>First Last</h3>")
  const $cardEmail = $("<p class='card-text'>email</p>")
  const $cardCityState = $("<p class='card-text cap'>city, State</p>")

  //appending gallery cards to page
  $cardInfo.append($cardName).append($cardEmail).append($cardCityState);
  $cardImgCont.append($cardImg);
  $card.append($cardImgCont).append($cardInfo);
  $('#gallery').append($card);

  //interpolating person info for each card
  $cardImg.attr("src", `${person.picture.large}`)
  $cardName.text(`${person.name.first} ${person.name.last}`)
  $cardEmail.text(`${person.email}`)
  $cardCityState.text(`${person.location.city}`+`, `+ `${person.location.state}`)

  //click handler to create modal
  $card.click(function(){
      createModal(person)
  })
}
        
const createModal = (person) => {
  //create modal elements
  const $button = $("<button type='button' id='modal-close-btn' class='modal-class-btn'><strong>X</strong></button>")
  const $modalCont = $("<div class='modal-container'></div>");
  const $modal = $("<div class='modal'></div>");
  const $modalInfo = $("<div class='modal-info-container'></div>")
  const $modalImg = $("<img class='modal-img' src='https://placehold.it/125x125' alt='Profile picture'>")
  const $modalName = $("<h3 id='name' class='modal-name cap'>First Last</h3>")
  const $modalEmail = $("<p class='modal-text'>email</p>")
  const $modalCityState = $("<p class='modal-text cap'>City</p>")
  const $modalPhone = $("<p class='modal-text'>(555) 555-1212</p>")
  const $modalAddr = $("<p class='modal-text'>123 Portland Ave., Portland, OR 97204</p>")
  const $modalBday = $("<p class='modal-text'>Birthday: 10/21/2015</p>")
  const $bdaySlice = `${person.dob.date}`
  const $bdayNew = ($bdaySlice.substr(5,2) +'/'+ $bdaySlice.substr(8,2) +'/'+ $bdaySlice.substr(2,2))  
  const $btnContainer = $("<div class='modal-btn-container'>")
  const $nextBtn = $("<button type='button' id='modal-prev' class='modal-prev btn'>Prev</button>")
  const $prevBtn = $("<button type='button' id='modal-next' class='modal-next btn'>Next</button>")

  //appends modal elements to the page
  $modalInfo.append($modalImg)
    .append($modalName)
    .append($modalEmail)
    .append($modalCityState)
    .append("<hr>")
    .append($modalPhone)
    .append($modalAddr)
    .append($modalBday)
  $btnContainer.append($prevBtn).append($nextBtn)
  $modal.append($button).append($modalInfo).append($btnContainer);
  $modalCont.append($modal);
  $('#gallery').append($modalCont)

  //interpolating person info for each modal
  $modalImg.attr("src", `${person.picture.large}`)
  $modalName.text(`${person.name.first} ${person.name.last}`)
  $modalEmail.text(`${person.email}`)
  $modalCityState.text(`${person.location.city}`)
  $modalPhone.text(`${person.phone}`);
  $modalAddr.text(`${person.location.street.number} ${person.location.street.name}`+`, `+ `${person.location.state} ${person.location.postcode}`)
  $modalBday.text(`Birthday: `+ $bdayNew)

  //click handler to for the 'close' button on modal
  $button.click(function(){
    $modalCont.hide();  
  })
}

//appends search elements to the page
$searchForm.append($searchInput).append($searchSubmit)
$('.search-container').append($searchForm)

const $search = (text, people) => {
  let $searchStore = []
  people.map(function(person){
    let $fullName = (`${person.name.first} ${person.name.last}`)
    if ($fullName.toLowerCase().includes(text.toLowerCase())){
      $searchStore.push(person);
    }  
  })

  console.log($searchStore)
  if ($searchStore.length > 0) {
    $('.card').hide();
    //debugger;
    console.log(people)
    console.log($searchStore)
    createCards($searchStore)
  }
}

$searchSubmit.click(function(){
  event.preventDefault();
  text = $searchInput.val();
  $search(text,people)
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


