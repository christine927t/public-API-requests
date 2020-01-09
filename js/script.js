/////////HELPER FUNCTIONS/////////
//create gallery cards
const $card = $("<div class='card'></div>")
const $cardImgCont = $("<div class='card-img-container'></div>")
const $cardInfo = $("<div class='card-info-container'></div>")
const $cardImg = $("<img class='card-img' src='https://placehold.it/90x90' alt='Profile picture'>")
const $cardName = $("<h3 id='name' class='card-name cap'>First Last</h3>")
const $cardEmail = $("<p class='card-text'>email</p>")
const $cardCityState = $("<p class='card-text cap'>city, State</p>")

//appends gallery cards to the page
function createCards(){
    $cardInfo.append($cardName).append($cardEmail).append($cardCityState);
    //$cardInfo.append($cardName).append($cardEmail).append($cardCityState.addClass('card'));
   // $cardInfo.append($cardName).append($cardEmail).append($cardCityState.addClass('card'));
    $cardImgCont.append($cardImg);
    $card.append($cardImgCont).append($cardInfo);
    $('#gallery').append($card);
}

//create modal elements
const $modalCont = $("<div class='modal-container'></div>");
const $modal = $("<div class='modal'></div>");
const $button = $("<button type='button' id='modal-close-btn' class='modal-class-btn'><strong>X</strong></button>")
const $modalInfo = $("<div class='modal-info-container'></div>")
const $modalImg = $("<img class='modal-img' src='https://placehold.it/125x125' alt='Profile picture'>")
const $modalName = $("<h3 id='name' class='modal-name cap'>First Last</h3>")
const $modalEmail = $("<p class='modal-text'>email</p>")
const $modalCity = $("<p class='modal-text cap'>City</p>")
const $modalPhone = $("<p class='modal-text'>(555) 555-1212</p>")
const $modalAddr = $("<p class='modal-text'>123 Portland Ave., Portland, OR 97204</p>")
const $modalBday = $("<p class='modal-text'>Birthday: 10/21/2015</p>")
        
//appends modal elements to the page
function createModal(){
    $modalInfo.append($modalImg).append($modalName).append($modalEmail).append($modalCity).append("<hr>").append($modalPhone).append($modalAddr).append($modalBday);
    $modal.append($button).append($modalInfo);
    $modalCont.append($modal);
    $('#gallery').append($modalCont)
}

$button.click(function(){
    $modalCont.hide();  
})

const url = 'https://randomuser.me/api/?results=12'

/////////FETCH API REQUEST/////////
fetch(url)
    .then((response) => response.json())
    .then(function(data) {
      console.log(data)
      let $people = data.results;
      console.log($people)
      return $people.map(function(person){
        createCards()
        $cardImg.attr("src", `${person.picture.medium}`)
        $cardName.text(`${person.name.first} ${person.name.last}`)
        console.log($cardName.text())
        $cardEmail.text(`${person.email}`)
        $cardCityState.text(`${person.location.city}`+`, `+ `${person.location.state}`)
      })
    })
    .catch(function(error){
      console.log(error)      
    })


  