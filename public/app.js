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
                    <p class="authorName">${result.author}</p>
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
      <h4 class="authorName1">${result.author}</h4>

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
               <h4 class="authorName">${result.author}</h4>
            </div>
              <div> <img class="scoreImage2" src= "${scoreURL[result.gameScore]}">
              </div>
          </div>
        </div>
</div>`
}


let authURL = '/auth/login'
let userURL = '/users'
let editURL = '/reviews/'
let apiURL = '/reviews';

function resetURL(){
  editURL = '/reviews/';
}

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
  // console.log(data);
  // console.log(globalAuthor);
  lastData = data.reviews;
  localStorage.setItem("storedReviews", JSON.stringify(lastData))
  // console.log(localStorage.getItem("storedReviews"))
	
	const reviewResults = data.reviews.map(renderHomeData);
  $(".flexParent").html(reviewResults);

	
  // const loginResults = data.reviews.map(renderLoginData);

  // $(".authorName").html(globalAuthor);
	$(".loginText").html("Logged in as :" + globalUser.firstName + " " + globalUser.lastName);

  reviewPage();
  backButton();
  createUser();
  userLogin();
  postButtonUnhide();
  $('#deleteButton').hide();
  $('#reviewForm').trigger("reset");
  resetURL();
}


function getAndDisplayReviews(){
	getReviewData(displayReviews);
}



$(function(){
  backButton();
  createUser();
  userLogin();
  reviewPage();
  watchSubmit();
  editSubmit();
  editButton();
  deleteSubmit();
  closeButton();
})







//INDIVIDUAL REVIEW RENDERING ON CLICK
function reviewPage(){
$('.box').on('click',function(){
  fadeOutHome()
  fadeInReviews()
  // console.log(lastData);
  let reviewZ = lastData.find(review=> review.id == this.id);
  // console.log(reviewZ);
  let reviewResults2 = renderReviewData(reviewZ);
  // console.log(reviewResults2);
  $(".mainReviewDiv").html(reviewResults2);
  // console.log(this.id);
  let authorData = reviewZ.author_id;

  editURL = editURL+this.id;
  console.log(editURL);
  let editSettings = {
    "postTitle": reviewZ.postTitle,
    "gameTitle": reviewZ.gameTitle,
    "gamePlatform": reviewZ.gamePlatform,
    "gameScore": reviewZ.gameScore,
    "gameImage": reviewZ.gameImage,
    "postReview": reviewZ.postReview
  }

  console.log(editSettings);


  if( authorData === globalUser.userID){
    $('#editButton').removeClass('hidden');
      editForm('#reviewForm2', editSettings);
  }
  else{
    $('#editButton').addClass('hidden');
  }
  });
};













//***************************NEW STUFF FOR EDIT/DELETE***********************
function editButton(){
  $('#editButton').on('click',function(){
  $('.modalParent2').show();
});
}




//edit form Fill Data-fills the form with the clicked review for edit
function editForm(form, data){
$.each(data, function(key, value){
  $('[name='+key+']', form).val(value);
});
}


//PUT
function editSubmit() {
  $('#reviewForm2').submit(function(event) {
  $('.modalParent2').hide();
  fadeOutReviews();
  fadeInHome();
  event.preventDefault();

  let formValues = $(this).serializeArray();

  const settings = {
    data:formValues,
    headers: {
    'Authorization': 'Bearer ' + globalToken
  },
    dataType: "json",
    crossDomain: true,
    type: 'PUT',
    url: editURL,
    success: getAndDisplayReviews
  };
  $.ajax(settings);
  });
}





//DELETE
function deleteSubmit() {
  $('#deleteButton2').on('click',function(event) {
  $('.modalParent2').hide();
  fadeOutReviews();
  fadeInHome();
  event.preventDefault();


  const settings = {
    headers: {
    'Authorization': 'Bearer ' + globalToken
  },
    dataType: "json",
    crossDomain: true,
    type: 'DELETE',
    url: editURL,
    success: getAndDisplayReviews
  };
  $.ajax(settings);
  });
}



//****************************************************************************






//FORM SUBMIT
function watchSubmit() {
  $('#reviewForm').submit(function(event) {
    $('.modalParent').hide();
    event.preventDefault();


  let formValues = $(this).serializeArray();
  // formValues.push({
  //   name: "firstName",
  //   value: globalFirst
  //   }
  // )
  // formValues.push({
  //   name: "lastName",
  //   value: globalLast
  // })
  // formValues.push({
  //   name: "userID",
  //   value: globalID
  // })
  console.log(formValues);
  const settings = {
    data:formValues,
    headers: {
    'Authorization': 'Bearer ' + globalToken
  },
    dataType: "json",
    crossDomain: true,
    type: 'POST',
    url: apiURL,
    success: getAndDisplayReviews
  };
  $.ajax(settings);
  });
}




$(function () {
    //setup ajax error handling
    $.ajaxSetup({
        error: function (x, status, error) {
            if (x.status == 401) {
                alert("Incorrect Username or Password");
            }
            else if (x.status ==422){
              alert("Username already exists");
            }
        }
    });
});







//********************
function afterLogin(data){
  globalUser = data.user;
  globalToken=data.authToken;
  // globalFirst=data.firstName;
  // globalLast=data.lastName;
  // globalID=data.userID;
  // console.log(globalID);
  
  // console.log(globalID);
  // console.log(globalFirst);
  // console.log(globalLast);
  // console.log(globalToken);
  alertLoginSuccess()
  getAndDisplayReviews()
  timeoutLogin()
  // $('#loginDivMain').addClass('hidden');
  $('#homePageDiv').fadeIn(3000);
  $('#homePageDiv').removeClass('hidden');
}

function alertUserCreated(){
  // alert("Account Created")
  $('.createMsgModal').show();
  setTimeout(window.location.reload.bind(window.location), 1500);
}

function alertLoginSuccess(){
  // alert("Login Successful")
  $('.loginMsgModal').show();
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
  fadeOutReviews();
  fadeInHome();
  resetURL();
});
}





function postButtonUnhide(){
  $('.postButton').on('click', function(){
    $('.modalParent').show();
  })
}





//FADING EFFECT
function timeoutLogin(){
 $("#loginDivMain").fadeOut(1000, function() {
  $(this).hide();
    });
}

function fadeInReviews(){
 $("#mainReviewPage").fadeIn(1000, function() {
  $(this).removeClass('hidden');
    });
}

function fadeOutReviews(){
 $("#mainReviewPage").fadeOut(1000, function() {
  $(this).hide();
    });
}



function fadeInHome(){
 $("#homePageDiv").fadeIn(3000, function() {
  $(this).show();
    });
}

function fadeOutHome(){
 $("#homePageDiv").fadeOut(250, function() {
  $(this).hide();
    });
}


function closeButton(){
  $('.close').on('click', function(event){
    event.preventDefault();
  $('.modalParent').hide();
  $('.modalParent2').hide();
  })
}

















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
      // body.addEventListener('keydown', (e) => {
      //   if(e.keyCode === 27) {
      //     modal.classList.remove('is-open')
      //   }
      // });
    });
  }
}

modalService();
//end modal