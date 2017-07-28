// List of initial buttons
var buttonsList = ['Will Smith', 'Joe Pesci', 'Chris Hemsworth', 'Clint Eastwood', 
'Scarlett Johannson', 'Nicholas Cage', 'Terry Crews', 'Robert Downey Jr', 'Adam Sandler', 'Sylvester Stallone'];

// function to add another button based on user input
$('#add-button').on('click', function() {
	event.preventDefault();
	// Grabs the user input in textbox
	var searchInput = $('#button-input').val().trim();
	// Used to prevent blank space making a button
	if (searchInput == '') {return;}
	else {
		buttonsList.push(searchInput);
		renderButtons()
	};
	// Clears textbox after submitting button
	$('#button-input').val('');
});

// Function to call API and display gifs
function displayActor() {
	// Clears away any gifs from a previous selection
	$('#gifs').empty();
	var APIKey = "dc6zaTOxFJmzC";
	// Grabs the data-person attribute of the button clicked
	var actorName = $(this).attr('data-person');
	// Url variable with API key and data-person attr
	var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + actorName + '&api_key=' + APIKey + '&limit=10';
	$.ajax({url: queryUrl, method: "GET"}).done(function(response) {
		// Creates a new img tag with gif and append 10 times
		for (var i = 0; i < 10; i++) {
			var parentDiv = $('<div>');
			parentDiv.addClass('gifDiv');
			var newGif = $('<img>');
			newGif.addClass('gifImage');
			newGif.attr('src', response.data[i].images.original_still.url);
			newGif.attr('data-still', response.data[i].images.original_still.url);
			newGif.attr('data-animate', response.data[i].images.original.url)
			newGif.attr('data-state', 'still');
			newGif.attr('height', '250');
			newGif.attr('width', '350');
			$('#gifs').append(parentDiv);
			$(parentDiv).append('<p>Rating: ' + response.data[i].rating + '</p>');
			$(parentDiv).append(newGif);
			
		}
	});
}

// function to display actor/actress buttons
function renderButtons() {
	$('#buttons').empty();
	// Creates new buttons based on the buttonsList array
	for (var i = 0; i < buttonsList.length; i++) {
		var newDiv = $('<button>');
		newDiv.addClass('gifbutton');
		newDiv.attr('data-person', buttonsList[i]);
		newDiv.text(buttonsList[i]);
		$('#buttons').append(newDiv);
	}
}

// function to change gif states on click
function changeState() {
	// Stores current state of gif
	var state = $(this).attr('data-state');
	// Determines if gif in still or animate state and changes it
	if (state == 'still') {
		var animate = $(this).attr("data-animate");
		$(this).attr('src', animate);
		$(this).attr('data-state', 'animate');
	} else if (state !== 'still') {
		var still = $(this).attr('data-still');
		$(this).attr('src', still);
		$(this).attr('data-state', 'still')
	}
};

// Display first buttons on document load
renderButtons();
// Displays gifs on actor/actress button click
$(document).on('click', '.gifbutton', displayActor);
// Changes gif state on gif image click
$(document).on('click', '.gifImage', changeState);