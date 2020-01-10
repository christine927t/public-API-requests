let person;
const url = 'https://randomuser.me/api/?results=12&nat=us'

/////////HELPER FUNCTIONS/////////
function createCards(person){
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
        
function createModal(person){
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

  //appends modal elements to the page
  $modalInfo.append($modalImg)
    .append($modalName)
    .append($modalEmail)
    .append($modalCityState)
    .append("<hr>")
    .append($modalPhone)
    .append($modalAddr)
    .append($modalBday);
  $modal.append($button).append($modalInfo);
  $modalCont.append($modal);
  $('#gallery').append($modalCont)

  //interpolating person info for each modal
  $modalImg.attr("src", `${person.picture.large}`)
  $modalName.text(`${person.name.first} ${person.name.last}`)
  console.log($modalName.text())
  $modalEmail.text(`${person.email}`)
  $modalCityState.text(`${person.location.city}`)
  $modalPhone.text(`${person.phone}`);
  $modalAddr.text(`${person.location.street} ${person.location.state} ${person.location.postcode}`)

  //click handler to for the 'close' button on modal
  $button.click(function(){
    $modalCont.hide();  
  })
}

//generates HTML for each card
function generateCardHTML(data){
    console.log(data)
    people = data.results;
    console.log(people)
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

