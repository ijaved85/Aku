const semesterItems = $(".semester-item");
const iframeContainer = $("#iframe-container");
let currSemester;

$("#Search").hide();
$(".noData").hide();
$(".student-table").hide();
$(".searchBar").hide();

semesterItems.on("click", function (event) {
	// Remove active class from all semester items
	semesterItems.removeClass("active");
	// Add active class to the clicked semester item
	$(this).addClass("active");

	// Get the text of the clicked semester item
	const selectedSemesterText = $(this).text();
	currSemester = selectedSemesterText;
	if (selectedSemesterText === "I" || selectedSemesterText === "II") {
		$(".data").show();
		$(".noData").hide();
		$("#Search").show();
	} else if (selectedSemesterText === "III") {
		$(".data").hide();
		$(".noData").show();
		$("#Search").hide();
		$(".semMess").text("Result Not Declared!");
	} else {
		$(".data").hide();
		$(".noData").show();
		$("#Search").hide();
		$(".semMess").text("Exam Not Conducted!");
	}
});

$(document).ready(() => {
	$('input[name="opt"]').on("change", event => {
		iframeContainer.html("");
		if ($(event.target).attr("id") === "searOpt1") {
			$(".student-table").show();
			$(".searchBar").hide();
		} else if ($(event.target).attr("id") === "searOpt2") {
			$(".student-table").hide();
			$(".searchBar").show();
		}
	});
});

const students = [
	{ name: "John Doe", regNumber: "01", roll: "01" },
	{ name: "Jane Doe", regNumber: "02", roll: "02" },
	{ name: "Bob Smith", regNumber: "03", roll: "03" },
	{ name: "Alice Johnson", regNumber: "04", roll: "04" },
	{ name: "Mike Brown", regNumber: "05", roll: "05" },
	{ name: "Emily Davis", regNumber: "06", roll: "06" },
	{ name: "Tom Harris", regNumber: "07", roll: "07" },
	{ name: "Sophia Lee", regNumber: "08", roll: "08" },
	{ name: "Oliver Martin", regNumber: "09", roll: "09" },
	{ name: "Ava Taylor", regNumber: "10", roll: 10 },
	{ name: "Isabella White", regNumber: "11", roll: 11 },
	{ name: "Ethan Hall", regNumber: "12", roll: 12 },
	{ name: "Liam Brooks", regNumber: "13", roll: 13 },
	{ name: "Charlot Thompson", regNumber: "14", roll: 14 },
	{ name: "Noah Jenkins", regNumber: "15", roll: 15 },
	{ name: "Abigail Russell", regNumber: "16", roll: 16 },
	{ name: "Logan Sanchez", regNumber: "17", roll: 17 },
	{ name: "Harper Garcia", regNumber: "18", roll: 18 },
	{ name: "Elijah Martinez", regNumber: "19", roll: 19 },
	{ name: "Avery Rodriguez", regNumber: "20", roll: 20 },
	{ name: "Jackson Lewis", regNumber: "21", roll: 21 },
	{ name: "Lily Walker", regNumber: "22", roll: 22 },
	{ name: "William Allen", regNumber: "23", roll: 23 },
	{ name: "Madison Young", regNumber: "24", roll: 24 },
	{ name: "Alexander Hnandez", regNumber: "25", roll: 25 },
	{ name: "Sofia Patel", regNumber: "26", roll: 26 },
	{ name: "Gabriel Lee", regNumber: "27", roll: 27 },
	{ name: "Julia Kim", regNumber: "28", roll: 28 },
	{ name: "Michael Davis", regNumber: "29", roll: 29 },
	{ name: "Emily Chen", regNumber: "30", roll: 30 },
	{ name: "Daniel Brown", regNumber: "31", roll: 31 },
	{ name: "Sarah Taylor", regNumber: "32", roll: 32 },
	{ name: "Joseph White", regNumber: "33", roll: 33 },
	{ name: "Jessica Martin", regNumber: "34", roll: 34 },
	{ name: "Kevin Hall", regNumber: "35", roll: 35 },
	{ name: "Lauren Brooks", regNumber: "36", roll: 36 },
	{ name: "Matthew Thompson", regNumber: "37", roll: 37 },
	{ name: "Amanda Jenkins", regNumber: "38", roll: 38 },
	{ name: "Brian Russell", regNumber: "39", roll: 39 },
	{ name: "Nicole Sanchez", regNumber: "40", roll: 40 },
	{ name: "Christophe Garcia", regNumber: "41", roll: 41 },
	{ name: "Rebecca Martinez", regNumber: "42", roll: 42 },
	{ name: "Andrew Rodriguez", regNumber: "43", roll: 43 },
	{ name: "Hannah Lewis", regNumber: "44", roll: 44 },
	{ name: "Tyler Walker", regNumber: "45", roll: 45 },
	{ name: "Elizabeth Allen", regNumber: "46", roll: 46 },
	{ name: "Joshua Young", regNumber: "47", roll: 47 },
	{ name: "Megan Hernandez", regNumber: "48", roll: 48 },
	{ name: "Ryan Patel", regNumber: "49", roll: 49 }
	//	{ name: "Kayla Lee", regNumber: "S050", roll: 50 }
];

// Function to populate student data
const populateStudentData = pageNumber => {
	const $studentData = $("#student-data");
	$studentData.empty();
	const startIndex = (pageNumber - 1) * 10;
	const endIndex = startIndex + 10;
	for (let i = startIndex; i < endIndex; i++) {
		if (i >= students.length) break;
		const student = students[i];
		const $row = $(`<tr onclick='result("${student.regNumber}")'>`).html(`
      <td>2022BP${student.roll}</td>
      <td>${student.name}</td>
      <td>221091890${student.regNumber}</td>
    `);
		$studentData.append($row);
	}
};

// Function to handle pagination link clicks
const handlePaginationClick = event => {
	const currentPage = $(event.target).text();
	populateStudentData(currentPage);
	// Remove active class from all links
	$(".pagination a").removeClass("active");
	// Add active class to the current link
	$(event.target).addClass("active");
};

// Function to generate pagination links
const generatePaginationLinks = () => {
	const $pagination = $(".pagination");
	$pagination.empty();
	const totalPages = Math.ceil(students.length / 10);
	for (let i = 1; i <= totalPages; i++) {
		const $link = $("<a>").attr("href", "#").text(i);
		$link.on("click", handlePaginationClick);
		if (i === 1) {
			$link.addClass("active"); // Add active class to the first link
		}
		$pagination.append($link);
	}
};

// Initialize pagination
generatePaginationLinks();
populateStudentData(1);

$(".searchInput").on("input", e => {
	const inputValue = $(e.target).val();
	if (inputValue.length >= 2) {
		$(e.target).val(inputValue.slice(0, 2));

		const regNo = inputValue.slice(0, 2);
		result(regNo);
		//console.log(inputValue);
	}
	console.log($(window).height());
});


const result = regNo => {
  // Clear existing iframes
  iframeContainer.html("");
  let link;
  if (currSemester === "I") {
    link = `https://results.akuexam.net/ResultsBPharm1stSemPub2022.aspx?Sem=I&RegNo=221091890${regNo}`;
    fheight = "580";
  } else if (currSemester === "II") {
    link = `https://results.akuexam.net/ResultsBPharm2ndSemPub2023.aspx?Sem=II&RegNo=221091890${regNo}`;
    fheight = "615";
  }

  const iframe = $("<iframe>")
    .attr({
      src: link,
      frameborder: 0,
      width: "100%",
      id: "mainIframe",
      height: $(window).height() - fheight
    })
    .css({
      overflowY: "hidden"
    })
    .attr("scrolling", "no");

  iframeContainer.append(iframe);

  // Add event listener to download div
  $(".download").on("click", takeScreenshot);
};
/*
const takeScreenshot = () => {
  const iframe = $("#mainIframe")[0];
  html2canvas(iframe, {
    useCORS: true,
    logging: true,
    proxy: "https://html2canvas.hertzen.com/proxy"
  }).then(canvas => {
    console.log("Canvas generated:", canvas);
    setTimeout(() => { // Add a small delay to ensure canvas is fully loaded
      canvas.toBlob(blob => {
        const url = URL.createObjectURL(new Blob([blob], { type: 'application/pdf' })); // Set MIME type explicitly
        const a = document.createElement("a");
        a.href = url;
        a.download = "screenshot.pdf";
        console.log("Anchor element:", a);
        console.log("Anchor element href:", a.href);
        console.log("Triggering anchor element click...");
        a.click();
        console.log("Anchor element click triggered.");
      }, 100); // Add a small delay
    });
  });
};*/


const takeScreenshot = () => {
  const iframe = $("#mainIframe")[0];
  const iframeContent = iframe.contentDocument || iframe.contentWindow.document;
  const iframeBody = iframeContent.body;
  html2canvas(iframeBody, {
    useCORS: true,
    logging: true,
    proxy: "https://your-proxy-server.com/proxy"
  }).then(canvas => {
    console.log("Canvas generated:", canvas);
    setTimeout(() => { 
      canvas.toBlob(blob => {
        const url = URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));
        const a = document.createElement("a");
        a.href = url;
        a.download = "screenshot.pdf";
        console.log("Anchor element:", a);
        console.log("Anchor element href:", a.href);
        console.log("Triggering anchor element click...");
        a.click();
        console.log("Anchor element click triggered.");
      }, 100);
    });
  });
};