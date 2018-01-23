let mockReviewData = {
	recentReviews: [
	{
		author:{
			firstName: "Tyler",
			lastName: "Gray"
		},
		postTitle: "Best Game Ever",
		gameTitle: "Mario Odyssey",
		gamePlatform: "Nintendo Switch",
		gameScore: "10",
		scorePicture: "http://via.placeholder.com/150x150",
		gameImage: "https://www.gaminginstincts.com/wp-content/uploads/2017/11/super-mario-odyssey-150x150.png",
		postReview: "Super Mario Odyssey displays a clear understanding of what makes Mario tick, and is neck and neck for top billing among its esteemed predecessors. It surprises you with not just inventive mechanics, of which there are many, but with expertly tuned level design and moments of charismatic wit. It is comfortable in absurdity and wields this attitude to cut through the limitations of its otherwise straightforward structure and keep you smiling all along the way."
		// reviewDate: Date.now
	},

	// {
	// author:{
	// 		firstName: "Josh",
	// 		lastName: "Gore"
	// 	},
	// 	postTitle: "Best Game Ever",
	// 	gameTitle: "Super Metroid",
	// 	gamePlatform: "Super NES",
	// 	gameScore: "9",
	// 	scorePicture: "http://via.placeholder.com/150x150",
	// 	scorePicture2: "http://via.placeholder.com/100x100",
	// 	gameImage: "http://img.kbhgames.com/2017/05/Hyper-Metroid-150x150.jpg",
	// 	gameImage2: "http://via.placeholder.com/100x100",
	// 	postReview: "Super Metroid displays a clear understanding of what makes Metroid tick, and is neck and neck for top billing among its esteemed predecessors."
	// 	// reviewDate: Date.now
	// }
	]
};


//HOMEPAGE DATA (homepage.html)
function renderReviewData(result){
	return `
        	<div class="flex-container">
          		<div class="box"> 
            		<div class="gameImage"> <img class="gamePicture" src= "${result.gameImage}"> 
            		</div>
            		<div class="postInfo"> 
               			<p class="authorName">${result.author.firstName} ${result.author.lastName.trim()}</p>
               			<p class="gameTitle">${result.gameTitle}</p> 
               			<p class="platform">${result.gamePlatform}</p>
            		</div>
            		<div class="scoreInfo"> <img class="scorePicture" src= "${result.scorePicture}">
               		<p class="score">${result.gameScore}</p>
            		</div>
          		</div>
        	</div>
	`
}




//once API is up and running, this should be the only function we need to change (getReviewData)
function getReviewData(callback) {
	setTimeout(function(){callback(mockReviewData)}, 100);
}

function displayReviews(data){
	const reviewResults = data.recentReviews.map(renderReviewData);
	$(".flexParent").html(reviewResults);
}

function getAndDisplayReviews(){
	getReviewData(displayReviews);
}

$(function(){
	getAndDisplayReviews()
})






// CLICKABLE REVIEW DATA PAGE 3(review.html)
function renderReviewDataTwo(resultTwo){
	return `
	<section role="region">
    <div class="reviewOverviewTwo">
      <h2 class="postTitle">${resultTwo.postTitle}</h2>
      <h3 class="gameTitle">${resultTwo.gameTitle}</h3>
      <h4 class="authorName">Author: ${resultTwo.author.firstName} ${resultTwo.author.lastName.trim()}</h4>
      <div class="flexParent2">
        <div class="flex-container">
          <div class="box">
          	<p class="postedReview">${resultTwo.postReview}</p>
          </div>
        </div>
      </div>
    </div>
  </section>


<div class="footer">
  <div class="flex-container2">
          <div class="box2"> 
            <div> <img class="gameImage2" src= ${resultTwo.gameImage}>
            </div>
            <div id="postInfo2"> 
               <p class="authorName">${resultTwo.author.firstName} ${resultTwo.author.lastName.trim()}</p>
               <p class="gameTitle">${resultTwo.gameTitle}</p> 
               <p class="platform">${resultTwo.gamePlatform}</p>
            </div>
            <div> <img class="scoreImage2" src= ${resultTwo.scorePicture}>
               <p class="score">${resultTwo.gameScore}</p>
            </div>
          </div>
        </div>
</div>`
}

//renderLoginData is to show your firstName and lastName in the header on both index.html and review.html
function renderLoginData(resultThree){
	return `
	<p class="loggedIn">Logged in as: ${resultThree.author.firstName} ${resultThree.author.lastName.trim()}</p>`
}

//once API is up and running, this should be the only function we need to change (getReviewDataTwo)
function getReviewDataTwo(callback) {
	setTimeout(function(){callback(mockReviewData)}, 100);
}

function displayReviewsTwo(data){
	const reviewResults = data.recentReviews.map(renderReviewDataTwo);
	const loginResults = data.recentReviews.map(renderLoginData);
	$(".mainReviewDiv").html(reviewResults);
	$(".loginText").html(loginResults);

}

function getAndDisplayReviewsTwo(){
	getReviewDataTwo(displayReviewsTwo);
}

$(function(){
	getAndDisplayReviewsTwo()
})














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