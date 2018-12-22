// Grab the articles as a json
/* $.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "<br />" + data[i].description + "</p>");
  }
}); */


// Whenever someone clicks an article's "NOTE" button
$(document).on("click", ".show-note", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the article
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      //Show notes modal
      $("#results-modal").modal("toggle");
      // The title of the article
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<br><label for='titleinput'>Note Title</label><input class='form-control' id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<br><label for='bodyinput'>Note</label><textarea class='form-control' rows='5' id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      //$("#notes").append("<br><button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});

// When you click the savenote button
$("#savenote").on("click", function() {
  // Grab the id associated with the article from the Save Note button
  var thisId = $(this).attr("data-id");
  //console.log(thisId);
  $("#results-modal").modal("toggle");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});

//When the 'SAVE' button on an article is pushed, send an ajax request to update the database to indicate the article is saved
$(".save-article").on("click", function(event) {
  var id = $(this).attr("data-id");
  console.log(id);
  
  /* var saved = {
    saved: true
  }; */

  // Send the PUT request.
  $.ajax("/saved/" + id, {
    type: "PUT",
    //data: saved
  }).then(
    function() {
      // Reload the page to get the updated list
      location.reload();
      alert("Article saved!");
    }
  );
});

//On-click event for deleting an article from the database
$(".delete-article").on("click", function(event) {
  var id = $(this).attr("data-id");
  console.log("deleted article", id);
  // Send the DELETE request.
  $.ajax("/delete/" + id, {
    type: "DELETE",
  }).then(
    function() {
      
      // Reload the page to get the updated list
      location.reload();
      alert("Article deleted.");
    }
  );
});
