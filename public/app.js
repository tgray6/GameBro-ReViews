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



const scoreURL = [
"/zero.png",
"/one.png",
"/two.png",
"/three.png",
"/four.png",
"/five.png",
"/six.png",
"/seven.png",
"/eight.png",
"/nine.png",
"/ten.png"
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
                <p class="score">${result.gameScore}</p>
              </div>
          </div>
        </div>
</div>`
}

//REMOVED FROM LINE 106, PICTURES CAUSING TOO MANY PROBLEMS AND SLOWING ME DOWN
// <div> <img class="scoreImage2" src= "">




let apiURL = '/reviews';

function getReviewData(callback) {
  const settings = {
    dataType: "json",
    crossDomain: true,
    type: 'GET',
    url: apiURL,
    success: callback
  };
  $.ajax(settings);
}





function displayReviews(data){
  console.log(data);
  lastData = data.reviews
	// const loginResults = data.reviews.map(renderLoginData);
	const reviewResults = data.reviews.map(renderHomeData);
	// $(".loginText").html(loginResults);
	$(".flexParent").html(reviewResults);
  reviewPage();
  // renderScoreImage();
}



function getAndDisplayReviews(){
	getReviewData(displayReviews);
}

$(function(){
	getAndDisplayReviews();
})




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



// function detailReviews(data){
//   return `

//   `
// }


// function testFunction(){
//   $.getJSON(apiURL, function(data){
//   })
// }




// function renderScoreImage(){
//   let score = $('.score').val();
//   if (score = 10){
//     $('.scorePicture').attr("src", "http://www.clker.com/cliparts/E/J/e/s/C/8/red-rounded-square-with-number-10-hi.png");
//   }
//   else if (score = 9){
//     $('.scorePicture').attr("src", "http://www.clker.com/cliparts/R/t/I/J/5/M/number-nine-in-red-hi.png");
//   }
// };



// function scoreTest(){
//   let score = $('.score').text();
//   console.log (score);
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





// function watchSubmit() {
//   $('.postEdit').submit(function(event) {
//     event.preventDefault();

//     //postTitle FORM
//     let postTitle = $(event.currentTarget).find('#postTitle');
//     let postValue = postTitle.val();
//     postTitle.val("");

//     //gameTitle FORM
//     let gameTitle = $(event.currentTarget).find('#postGameTitle');
//     let gameValue = gameTitle.val();
//     gameTitle.val("");

//     //gamePlatform FORM
//     let gamePlatform = $(event.currentTarget).find('#postGamePlatform');
//     let platformValue = gamePlatform.val();
//     gamePlatform.val("");

//     //gameScore FORM
//     let gameScore = $(event.currentTarget).find('#postScore');
//     let scoreValue = gameScore.val();
//     gameScore.val("");

//     //gameImage FORM
//     let gameImage = $(event.currentTarget).find('#postGameURL');
//     let imageValue = gameImage.val();
//     gameImage.val("");

//     //postReview FORM
//     let postReview = $(event.currentTarget).find('#gameReview');
//     let reviewValue = postReview.val();
//     postReview.val("");


//     getReviewData(postValue, gameValue, platformValue, scoreValue, imageValue, reviewValue, displayReviews);
//   });
// }
// $(watchSubmit);






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