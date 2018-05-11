const studentsPerPage = 10;
let students = [];
let defaultListArray = [];
let searchListArray = [];

$(".student-item").each(function() {
	var id = $(this)
	console.log(id);
	students.push(id);
  defaultListArray.push($(this).index());
});

// On load, displays the default list of students
$(document).ready(() => {
	showPage(1, defaultListArray);
	appendPageLinks(defaultListArray);
})

// Displays a "page" or "list" of students
function showPage(pageNumber, studentList) {
  console.log(studentList);
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

	$(".pagination a").on("click", function(e) {
		var txt = $(e.target).text();
    console.log(txt);
		showPage(txt, studentList);
		$(".pagination ul li a").removeClass("active");
		$(".pagination ul li a").eq(txt - 1).addClass("active");
	});
};

// Searches the list of students
function searchList() {
	searchListArray = [];
	let inputVal = $(".student-search input").val().toLowerCase();
	if (inputVal == "") {
    alert("no input detected.");
		showPage(1, defaultListArray);
		appendPageLinks(defaultListArray);
	} else {
		for (i = 0; i < students.length; i++) {
			let studentName = $(".student-item h3").eq(i).text();
			let studentEmail = $(".student-item .email").eq(i).text();
			if (studentName.includes(inputVal) || studentEmail.includes(inputVal)) {
				searchListArray.push($(".student-item").eq(i).index());
			};
		};
		if (searchListArray == "") {
			alert("Sorry, no results found.");
      showPage(1, defaultListArray);
      appendPageLinks(defaultListArray);
		} else {
      $(".pagination").empty();
			showPage(1, searchListArray);
			if (searchListArray.length > 10 == true) {
				appendPageLinks(searchListArray);
			};
		};
	};
};

// click event listener for the search button, executes searchList(). //
$(".search-button").on("click", searchList);

// Search input event listener for "enter" key
$(".search-input").keyup(function(event) {
	if (event.keyCode === 13) {
		$(".search-button").click();
	}
});
