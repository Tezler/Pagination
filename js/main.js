const studentsPerPage = 10;
let students = [];
let defaultListArray = [];
let searchListArray = [];

// pushes the student items to an array as well as the index.
$(".student-item").each(function() {
	var xyz = $(this)
	students.push(xyz);
  defaultListArray.push($(this).index());
});

// On load, displays the default list of students by calling the 2 functions
$(document).ready(() => {
	showPage(1, defaultListArray);
	appendPageLinks(defaultListArray);
})

// Displays a "page" based on a list of students
// Only shows the first 10 items.
function showPage(pageNumber, studentList) {
	$(".student-item").each(function() {
		$(this).addClass("hide");
	});
	for (i = (pageNumber * 10) - 10; i < pageNumber * 10; i++) {
    $(".student-item").eq(studentList[i]).removeClass("hide");
	}
}

function appendPageLinks(studentList) {
	let pageCount = Math.ceil(studentList.length / studentsPerPage);
	$(".pagination").empty();
	$(".pagination").append("<ul class='pageLinks'>");
	for (i = 0; i < pageCount; i++) {
		$(".pageLinks").append("<li>" + '<a href="#">' + (i + 1));
	};
	$(".pageLinks a").eq(0).addClass("active")

	// Event listener for the page buttons.
	$(".pagination a").on("click", function(e) {
		var txt = $(e.target).text();
		showPage(txt, studentList);
		$(".pagination ul li a").removeClass("active");
		$(".pagination ul li a").eq(txt - 1).addClass("active");
	});
};

// Searches the list of students with 4 possible end results.
// If nothing is searched, will alert the user then continue to show the default list.
// If no results are found, alerts the user then continues to show the default list.
// if results are found, will display the appropriate results and run appendPageLinks if results exceed 10.
function searchList() {
	searchListArray = [];
	let inputVal = $(".student-search input").val().toLowerCase();
	if (inputVal == "") {
    alert("no input detected.");
		showPage(1, defaultListArray);
		appendPageLinks(defaultListArray);
	} else {

		/* Loops through the list of students checking to see if there is a match
		with what is being searched */
		for (i = 0; i < students.length; i++) {
			let studentName = $(".student-item h3").eq(i).text();
			let studentEmail = $(".student-item .email").eq(i).text();
			if (studentName.includes(inputVal) || studentEmail.includes(inputVal)) {
				searchListArray.push($(".student-item").eq(i).index());
			};
		};

		// Checks to see if the search returns no results.
		if (searchListArray == "") {
			alert("Sorry, no results found.");
      showPage(1, defaultListArray);
      appendPageLinks(defaultListArray);
		} else {

			// If results are found, removed the page links and runs the showPage function
			// If more than 10 results are found, appendPageLinks runs adding the page links
      $(".pagination").empty();
			showPage(1, searchListArray);
			if (searchListArray.length > 10 == true) {
				appendPageLinks(searchListArray);
			};
		};
	};
};

// click event listener for the search button, executes searchList().
$(".search-button").on("click", searchList);

// Search input event listener for "enter" key
$(".search-input").keyup(function(event) {
	if (event.keyCode === 13) {
		$(".search-button").click();
	}
});
