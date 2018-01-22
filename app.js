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
		scorePicture: $("#scorePicture").attr('src', "http://via.placeholder.com/150x150"),
		gameImage: $("#gamePicture").attr('src', "https://www.gaminginstincts.com/wp-content/uploads/2017/11/super-mario-odyssey-150x150.png"),
		postReview: "Super Mario Odyssey displays a clear understanding of what makes Mario tick, and is neck and neck for top billing among its esteemed predecessors. It surprises you with not just inventive mechanics, of which there are many, but with expertly tuned level design and moments of charismatic wit. It is comfortable in absurdity and wields this attitude to cut through the limitations of its otherwise straightforward structure and keep you smiling all along the way.",
		// reviewDate: Date.now
	},

	{
	author:{
			firstName: "Josh",
			lastName: "Gore"
		},
		postTitle: "Best Game Ever",
		gameTitle: "Super Metroid",
		gamePlatform: "Super NES",
		gameScore: "9",
		scorePicture: $("#scorePicture").attr('src', "http://via.placeholder.com/150x150"),
		gameImage: $("#gamePicture").attr('src', "http://img.kbhgames.com/2017/05/Hyper-Metroid-150x150.jpg"),
		postReview: "Super Metroid displays a clear understanding of what makes Metroid tick, and is neck and neck for top billing among its esteemed predecessors.",
		// reviewDate: Date.now
	}
	]
};

function renderReviewData(result){
	return `
	      <h2>Click To See Full Review</h2>
        	<div class="flex-container">
          		<div class="box"> 
            		<div id="gameImage"> <img id="gamePicture" src= "${result.recentReviews.gameImage}"> 
            		</div>
            		<div id="postInfo"> 
               			<p class="authorName"> `${result.recentReviews.author.firstName} ${result.recentReviews.author.lastName} .trim()`</p>
               			<p class="gameTitle">${result.recentReviews.gameTitle}</p> 
               			<p class="platform">${result.recentReviews.gamePlatform}</p>
            		</div>
            		<div id="scoreInfo"> <img id="scorePicture" src= ${result.recentReviews.scorePicture}>
               		<p class="score">7</p>
            		</div>
          		</div>
        	</div>
	`
}

function getReviewData(callback) {
	setTimeout(function(){callback(mockReviewData)}, 100);
}

function displayReviews(data){
	const reviewResults = data.recentReviews.map(renderReviewData);
	$(".reviewOverview").html(reviewResults);
}

function getAndDisplayReviews(){
	getReviewData(displayReviews);
}

$(function(){
	getAndDisplayReviews()
})










var MOCK_STATUS_UPDATES = {
    "statusUpdates": [
        {
            "id": "1111111",
            "text": "Can't believe how much fun I'm having.",
            "friendId": "aaaaaa",
            "friendName": "John Doe",
            "publishedAt": 1470016976609
        },
        {
            "id": "2222222",
            "text": "Have FOMO? Well you SHOULD!",
            "friendId": "bbbbbbb",
            "friendName": "Jane Doe",
            "publishedAt": 1470012976609
        },
        {
            "id": "333333",
            "text": "They're giving out immortality and free $$$ where I am.",
            "friendId": "cccc",
            "friendName": "Jim Doe",
            "publishedAt": 1470011976609
        },
        {
            "id": "4444444",
            "text": "humble brag humble brag humble brag",
            "friendId": "ddddd",
            "friendName": "Jackie Doe",
            "publishedAt": 1470009976609
        }
    ]
};

function getRecentStatusUpdates(callbackFn) {
    setTimeout(function(){ callbackFn(MOCK_STATUS_UPDATES)}, 100);
}

// this function stays the same when we connect
// to real API later
function displayStatusUpdates(data) {
    for (index in data.statusUpdates) {
       $('body').append(
        '<p>' + data.statusUpdates[index].text + '</p>');
    }
}

// this function can stay the same even when we
// are connecting to real API
function getAndDisplayStatusUpdates() {
    getRecentStatusUpdates(displayStatusUpdates);
}

$(function() {
    getAndDisplayStatusUpdates();
})