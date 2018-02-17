// let mockReviewData = {
// 	recentReviews: [
// 	{
// 		author:{
// 			firstName: "Tyler",
// 			lastName: "Gray"
// 		},
// 		postTitle: "Best Game Ever",
// 		gameTitle: "Mario Odyssey",
// 		gamePlatform: "Nintendo Switch",
// 		gameScore: "10",
// 		gameImage: "https://www.gaminginstincts.com/wp-content/uploads/2017/11/super-mario-odyssey-150x150.png",
// 		postReview: "Super Mario Odyssey displays a clear understanding of what makes Mario tick, and is neck and neck for top billing among its esteemed predecessors. It surprises you with not just inventive mechanics, of which there are many, but with expertly tuned level design and moments of charismatic wit. It is comfortable in absurdity and wields this attitude to cut through the limitations of its otherwise straightforward structure and keep you smiling all along the way."
// 	},
//     ]
// };

globalToken = null;

const scoreURL = [
"/images/zero.png",
"/images/one.png",
"/images/two.png",
"/images/three.png",
"/images/four.png",
"/images/five.png",
"/images/six.png",
"/images/seven.png",
"/images/eight.png",
"/images/nine.png",
"/images/ten.png"
]


//renderLoginData is to show your firstName and lastName in the header on both index.html and review.html
function renderLoginData(result){
	return `
	<p class="loggedIn">Logged in as: ${result.author.firstName} ${result.author.lastName}</p>`
}


//HOMEPAGE DATA (homepage.html)
function renderHomeData(result){
	return `
        	<div class="flex-container">
          		<div class="box grow" id="${result.id}"> 
            		<div class="gameImage"> <img class="gamePicture" src= "${result.gameImage}">
            		</div>
            		<div class="postInfo"> 
               			<p class="gameTitle">${result.gameTitle}</p> 
               			<p class="platform">${result.gamePlatform}</p>
            		</div class="scoreInfo"> <img class="scorePicture" src= "${scoreURL[result.gameScore]}">

          		</div>
        	</div>
	`
}


//REVIEW DATA (review.html)
function renderReviewData(result){
	return `
	<section role="region">
    <div class="reviewOverviewTwo">
      <h2 class="postTitle">${result.postTitle}</h2>
      <h3 class="gameTitle">${result.gameTitle}</h3>

      <div class="flexParent2">
        <div class="flex-container">
          <div class="reviewBox">
          	<p class="postedReview">${result.postReview}</p>
          </div>
        </div>
      </div>
    </div>
  </section>


<div class="footer">
  <div class="flex-container2">
          <div class="box2"> 
            <div> <img class="gameImage2" src= ${result.gameImage}>
            </div>
            <div id="postInfo2"> 
               
               <p class="gameTitle">${result.gameTitle}</p> 
               <p class="platform">${result.gamePlatform}</p>
            </div>
              <div> <img class="scoreImage2" src= "${scoreURL[result.gameScore]}">
              </div>
          </div>
        </div>
</div>`
}



let authURL = '/auth/login'
let userURL = '/users'
let apiURL = '/reviews';

function getReviewData(callback) {
  const settings = {
    dataType: "json",
        headers: {
    'Authorization': 'Bearer ' + globalToken
  },
    crossDomain: true,
    type: 'GET',
    url: apiURL,
    success: callback
  };
  $.ajax(settings);
}


function displayReviews(data){
  console.log(data);
  lastData = data.reviews;
	// const loginResults = data.reviews.map(renderLoginData);
	const reviewResults = data.reviews.map(renderHomeData);
	// $(".loginText").html(loginResults);
	$(".flexParent").append(reviewResults);
  reviewPage();
  backButton();
  watchSubmit();
  createUser();
  userLogin();
}


function getAndDisplayReviews(){
	getReviewData(displayReviews);
}

// $(function(){
// 	getAndDisplayReviews();
// })



$(function(){
  backButton();
  watchSubmit();
  createUser();
  userLogin();
  reviewPage()
  if (globalToken !== null){
  $('#loginDivMain').addClass('hidden');
  $('#homePageDiv').removeClass('hidden');
  }
})







//INDIVIDUAL REVIEW RENDERING ON CLICK
function reviewPage(){
$('.box').on('click',function(){
  $('#homePageDiv').addClass('hidden');
  $('#mainReviewPage').removeClass('hidden');
  console.log(lastData);
  let reviewZ = lastData.find(review=> review.id == this.id);
  console.log(reviewZ);
  let reviewResults2 = renderReviewData(reviewZ)
  console.log(reviewResults2);
  $(".mainReviewDiv").html(reviewResults2);
  console.log(this.id);
  });
};

function homeRedirect(){
  window.location.href='/index.html';
};



//FORM SUBMIT
function watchSubmit() {
  $('#reviewForm').submit(function(event) {
    event.preventDefault();

  let formValues = $(this).serializeArray();

  const settings = {
    data:formValues,
    dataType: "json",
    crossDomain: true,
    type: 'POST',
    url: apiURL,
    success: homeRedirect
  };
  $.ajax(settings);
  });
}


//********************
function afterLogin(data){
  globalToken=data.authToken;
  console.log(globalToken);
  alertLoginSuccess()
  getAndDisplayReviews()
  $('#loginDivMain').addClass('hidden');
  $('#homePageDiv').removeClass('hidden');
}

function alertUserCreated(){
  alert("Account Created")
}

function alertLoginSuccess(){
  alert("Login Successful")
}

function alertPost(){
  alert("Review Posted")
}
//*******************************



//CREATE USER SUBMIT
function createUser() {
  $('#createForm').submit(function(event) {
    event.preventDefault();

  let formValues = $(this).serializeArray();

  const settings = {
    data:formValues,
        headers: {
    'Authorization': 'Bearer ' + globalToken
  },
    dataType: "json",
    crossDomain: true,
    type: 'POST',
    url: userURL,
    success: alertUserCreated
  };
  $.ajax(settings);
  });
}

// USER LOGIN SUBMIT
function userLogin() {
  $('#loginForm').submit(function(event) {
    event.preventDefault();

  let formValues = $(this).serializeArray();

  const settings = {
    data:formValues,
    headers: {
    'Authorization': 'Bearer ' + globalToken
  },
    dataType: "json",
    crossDomain: true,
    type: 'POST',
    url: authURL,
    success: afterLogin
  };
  $.ajax(settings);
  });
}

function backButton(){
  $('.backButton').on('click',function(){
  $('#mainReviewPage').addClass('hidden');
  $('#homePageDiv').removeClass('hidden');
});
}


// function watchSubmit() {
//   $('#reviewForm').submit(function(event) {
//     event.preventDefault();

//     //postTitle FORM
//     let postTitle = $(event.currentTarget).find('#postTitle').val();
//     let postValue = postTitle.val();
//     postTitle.val("");

//     //gameTitle FORM
//     let gameTitle = $(event.currentTarget).find('#postGameTitle').val();
//     let gameValue = gameTitle.val();
//     gameTitle.val("");

//     //gamePlatform FORM
//     let gamePlatform = $(event.currentTarget).find('#postPlatform').val();
//     let platformValue = gamePlatform.val();
//     gamePlatform.val("")

//     //gameScore FORM
//     let gameScore = $(event.currentTarget).find('#postScore').val();
//     let scoreValue = gameScore.val();
//     gameScore.val("")

//     //gameImage FORM
//     let gameImage = $(event.currentTarget).find('#postGameURL').val();
//     let imageValue = gameImage.val();
//     gameImage.val("");

//     //postReview FORM
//     let postReview = $(event.currentTarget).find('#gameReview').val();
//     let reviewValue = postReview.val();
//     postReview.val("")

//   const settings = {
//     data:{
//       postTitle: postTitle,
//       gameTitle: gameTitle,
//       gamePlatform: gamePlatform,
//       gameScore: gameScore,
//       gameImage: gameImage,
//       postReview: postReview
//     },
//     dataType: "json",
//     crossDomain: true,
//     type: 'POST',
//     url: apiURL,
//     success: homeRedirect
//   };
//   $.ajax(settings);
//   });
// }














//once API is up and running, this should be the only function we need to change (getReviewData)


// function getReviewData(callback) {
//  setTimeout(function(){callback(mockReviewData)}, 100);
// }

// function displayReviews(data){
//   const loginResults = data.recentReviews.map(renderLoginData);
//   const reviewResults = data.recentReviews.map(renderHomeData);
//   const reviewResults2 = data.recentReviews.map(renderReviewData);
//   $(".loginText").html(loginResults);
//   $(".flexParent").html(reviewResults);
//   $(".mainReviewDiv").html(reviewResults2);
// }

// function getAndDisplayReviews(){
//   getReviewData(displayReviews);
// }

// $(function(){
//   getAndDisplayReviews()
// })








//modal form
const modalService = () => {
  const d = document;
  const body = d.querySelector('body');
  const buttons = d.querySelectorAll('[data-modal-trigger]');
  
  // attach click event to all modal triggers
  for(let button of buttons) {
    triggerEvent(button);
  }
  
  function triggerEvent(button) {
    button.addEventListener('click', () => {
      const trigger = button.getAttribute('data-modal-trigger');
      const modal = d.querySelector(`[data-modal=${trigger}]`);
      const modalBody = modal.querySelector('.modal-body');
      const closeBtn = modal.querySelector('.close');
      
      closeBtn.addEventListener('click', () => modal.classList.remove('is-open'))
      // modal.addEventListener('click', () => modal.classList.remove('is-open'))
      
      modalBody.addEventListener('click', (e) => e.stopPropagation());

      modal.classList.toggle('is-open');
      
      // Close modal when hitting escape
      body.addEventListener('keydown', (e) => {
        if(e.keyCode === 27) {
          modal.classList.remove('is-open')
        }
      });
    });
  }
}

modalService();
//end modal