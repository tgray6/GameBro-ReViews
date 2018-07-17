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




//RENDERS SINGLE REVIEW BOX ON HOMEPAGE AFTER LOGIN
function renderHomeData(result){
	return `
        	<div class="flex-container">
          		<div class="box grow" id="${result.id}"> 
            		<div class="gameImage"> <img class="gamePicture" src= "${result.gameImage}" alt="game image">
            		</div>
            		<div class="postInfo"> 
               			<p class="gameTitle">${result.gameTitle}</p> 
               			<p class="platform">${result.gamePlatform}</p>
                    <p class="authorName">${result.author}</p>
            		</div class="scoreInfo"> <img class="scorePicture" src= "${scoreURL[result.gameScore]}" alt="Score Image">

          		</div>
        	</div>
	`
}


//RENDERS THE INDIVIDUAL REVIEW ON CLICK FROM HOMEPAGE
function renderReviewData(result){
	return `
	<section role="region">
    <div class="reviewOverviewTwo">
      <h2 class="postTitle">${result.postTitle}</h2>
      <h3 class="gameTitle">${result.gameTitle}</h3>
      <h4 class="authorName1">-${result.author}-</h4>

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
            <div> <img class="gameImage2" src= "${result.gameImage}" alt="Game Picture">
            </div>
            <div id="postInfo2">
               
               <p class="gameTitle">${result.gameTitle}</p> 
               <p class="platform">${result.gamePlatform}</p>
               <h4 class="authorName">${result.author}</h4>
            </div>
              <div> <img class="scoreImage2" src= "${scoreURL[result.gameScore]}" alt= "Score Picture">
              </div>
          </div>
    </div>
  </div>`
}


const authURL = '/auth/login';
const userURL = '/users';
const apiURL = '/reviews';

let editURL = '/reviews/';

function resetURL(){
  editURL = '/reviews/';
}


//GET ENDPOINT FOR THE REVIEW DATA
//CALLED UPON LOGIN AND SUBMISSION OF FORMS
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


//RENDERING THE DATA FOR getReviewData function above. THIS IS A KEY FUNCTION FOR ALL SCREENS
function displayReviews(data){
  lastData = data.reviews;
  localStorage.setItem("storedReviews", JSON.stringify(lastData))
	
	const reviewResults = data.reviews.map(renderHomeData);
  $(".flexParent").html(reviewResults);

	$(".loginText").html("Logged in as : " + globalUser.firstName + " " + globalUser.lastName);

  reviewPage();
  backButton();
  createUser();
  userLogin();
  $('#deleteButton').hide();
  $('#reviewForm').trigger("reset");
  resetURL();
}


function getAndDisplayReviews(){
	getReviewData(displayReviews);
}



//ONREADY FUNCTIONS
$(function(){
  unhideCreateForm();
  unhideLoginForm();
  backButton();
  createUser();
  userLogin();
  reviewPage();
  watchSubmit();
  editSubmit();
  editButton();
  deleteSubmit();
  closeButton();
  unhideLoginDivMain();
  postButton();
})

function unhideLoginDivMain(){
  $('#loginDivMain').removeClass("hidden");
}


//INDIVIDUAL REVIEW RENDERING ON CLICK
function reviewPage(){
$('.box').on('click',function(){
  fadeOutHome()
  fadeInReviews()
  let reviewZ = lastData.find(review=> review.id == this.id);
  let reviewResults2 = renderReviewData(reviewZ);
  $(".mainReviewDiv").html(reviewResults2);
  let authorData = reviewZ.author_id;

  editURL = editURL+this.id;

  if( authorData === globalUser.userID){
    $('#editButton').removeClass('hidden');
    editForm('#reviewForm2', reviewZ);
  }
  else{
    $('#editButton').addClass('hidden');
  }
  });
};

//Fills the form with the clicked on review for the edit form
//CALLING A FUNCTION FOR EACH ITEM IN DATA. THAT FUNCTION LOOKS UP THE ELEMENT WITH ATTRIBUTE '[name='+key+' WITHIN THE SUPPLIED FORM AND SETS THE VALUE TO value.
//$.each takes all key/value pairs in the supplied object and calls the supplied function with the key and the value as parameters. 
//This is a bit more succinct than using object.entries.
function editForm(form, data){
  $.each(data, function(key, value){
    $('[name='+key+']', form).val(value);
  });
}


//UNHIDE INITIAL LOGIN FORMS-CALLED FUNCTIONS ON PAGE READY
function unhideCreateForm(){
  $('.unhideCreate').click(function(){
    $('#formDIV').removeClass("hidden");
    $('#createForm').removeClass("hidden");
    $('.unhideCreate').hide()
  })
}

function unhideLoginForm(){
  $('.unhideLogin').click(function(){
    $('#formDIV2').removeClass("hidden");
    $('#loginForm').removeClass("hidden");
    $('.unhideLogin').hide()
  })
}




//***************************NEW STUFF FOR EDIT/DELETE***********************

//SHOWS FORM ON EDIT BUTTON CLICK
function editButton(){
  $('#editButton').click(function(){
  $('.modalParent2').show();
});
}


//THIS IS THE FUNCTION THAT SUBMITS AN EDITED REVIEW
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




//DELETE A REVIEW ON CLICK OF THE DELETE BUTTON
function deleteSubmit() {
  $('#deleteButton2').on('click',function(event) {
    if (confirm (" You Sure You Want To Delete This Review!?")) {
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
    }
  });
}


//****************************************************************************






//FORM SUBMIT-POSTS THE REVIEW ON SUBMISSION OF THE FORM
function watchSubmit() {
  $('#reviewForm').submit(function(event) {
    $('.modalParent').hide();
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
      url: apiURL,
      success: getAndDisplayReviews
    };
  $.ajax(settings);
  });
}




//ERROR HANDLE
$(function () {
    $.ajaxSetup({
        error: function (x, status, error) {
            if (x.status == 401) {
                loginError();
            }
            else if (x.status ==422){
              createUserError();
            }
        }
    });
});

function hideLoginModal(){
  $('.loginMsgModal').hide()
  $('.createMsgModal').hide();
}


function loginError(){
  $('.loginMsgModal').show();
  $('.loginMessage').html("Incorrect Username or Password");
  setTimeout(hideLoginModal, 3000);
}

function createUserError(){
  $('.createMsgModal').show();
  $('.createMessage').html("Username Already Taken");
  setTimeout(hideLoginModal, 3000);
}




//FUNCTION FOR AFTER USERS LOGIN
//********************
function afterLogin(data){
  globalUser = data.user;
  globalToken=data.authToken;
  alertLoginSuccess();
  getAndDisplayReviews();
  fadeoutLogin();
  fadeInHome();
}

function onUserCreated(){
  $('.createMsgModal').show();
  $('.createMessage').html('User Created: Please Login');
  setTimeout(window.location.reload.bind(window.location), 3000);
}

function alertLoginSuccess(){
  $('.loginMsgModal').show();
  $('.loginMessage').html('Logging In');
}

//*******************************



//CREATE USER FORM SUBMIT
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
      success: onUserCreated
    };
    $.ajax(settings);
  });
}

// LOGIN FORM SUBMIT
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






//BACK BUTTON FUNCTION
function backButton(){
  $('.backButton').on('click',function(){
    fadeOutReviews();
    fadeInHome();
    resetURL();
  });
}

//UNHIDE POST FORM BUTTON
function postButton(){
  $('.postButton').click(function(){
    $('.modalParent').show();
  })
}

//FADING EFFECTS
function fadeoutLogin(){
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