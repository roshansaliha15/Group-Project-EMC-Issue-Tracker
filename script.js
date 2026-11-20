
// STEP 1: Get the form element

let issueForm = document.getElementById("issueForm");


// STEP 2: Create a ticket ID counter

let ticketNumber = Number(localStorage.getItem("ticketNumber")) || 1001;


// STEP 3: Get existing tickets from LocalStorage and json parse edhukuna string store aagum values aa convert panradhuku use panrom

let tickets = JSON.parse(localStorage.getItem("tickets")) || [];


// STEP 4: Handle form submission

issueForm.addEventListener("submit", function(event) {

    // Prevent the page from refreshing
    event.preventDefault();

    // Get the values entered by the student
    let category = document.getElementById("issueCategory").value;

    let description = document.getElementById("issueDescription").value.trim();


    // STEP 5: Validate the inputs

    if (category === "" || description === "") {

        alert("Please fill in all the fields.");

    } else {

        // STEP 6: Create a ticket object

        let newTicket = {

            id: "EMC-" + ticketNumber,

            category: category,

            description: description,

            date: new Date().toLocaleDateString(),

            status: "Pending",

            remarks: ""

        };


        // STEP 7: Add the ticket to the array

        tickets.push(newTicket);


        // STEP 8: Save tickets in LocalStorage

        localStorage.setItem("tickets", JSON.stringify(tickets));

        localStorage.setItem("ticketNumber", ticketNumber + 1);


        // STEP 9: Display success message

        alert("Issue submitted successfully! Your Ticket ID is " + newTicket.id);


        // STEP 10: Clear the form

        issueForm.reset();

        ticketNumber++;


// STEP 11: Get the sidebar elements

let menuToggle = document.getElementById("menuToggle");

let sidebar = document.getElementById("sidebar");

let overlay = document.getElementById("overlay");


// STEP 12: Create a function to open and close the sidebar

function toggleSidebar() {

    sidebar.classList.toggle("open");

    overlay.classList.toggle("show");

}


// STEP 13: Open or close sidebar when menu button is clicked

menuToggle.addEventListener("click", toggleSidebar);


// STEP 14: Close sidebar when overlay is clicked

overlay.addEventListener("click", toggleSidebar);


    }

});
