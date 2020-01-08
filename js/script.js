
//create gallery cards and append them to the DOM
const $card = $("<div class='card'></div>")
const $cardImg = $("<div class='card-img-container'></div>")
const $cardInfo = $("<div class='card-info-container'></div>")
const $img = $("<img class='card-img' src='https://placehold.it/90x90' alt='Profile picture'>")
const $h3 = $("<h3 id='name' class='card-name cap'>First Last</h3>")
const $email = $("<p class='card-text'>email</p>")
const $cityState = $("<p class='card-text cap'>city, State</p>")

$cardInfo.append($h3).append($email).append($cityState);
$cardImg.append($img);
$card.append($cardImg).append($cardInfo);
$('#gallery').append($card);


$.ajax({
    url: 'https://randomuser.me/api/',
    dataType: 'json',
    success: function(data) {
      console.log(data);
    }
  });


//create modal elements

/* <div class="modal-container">
<div class="modal">
    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
    <div class="modal-info-container">
        <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
        <h3 id="name" class="modal-name cap">name</h3>
        <p class="modal-text">email</p>
        <p class="modal-text cap">city</p>
        <hr>
        <p class="modal-text">(555) 555-5555</p>
        <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
        <p class="modal-text">Birthday: 10/21/2015</p>
    </div>
</div>

// IMPORTANT: Below is only for exceeds tasks 
<div class="modal-btn-container">
    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
    <button type="button" id="modal-next" class="modal-next btn">Next</button>
</div>
</div> */