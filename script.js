
// STEP 1: Get the form element
let issueForm = document.getElementById("issueForm");

// STEP 2: Get existing tickets from LocalStorage
let tickets = JSON.parse(localStorage.getItem("tickets")) || [];

// STEP 3: Find the highest existing ticket number
let highestTicketNumber = tickets.reduce((highest, ticket) => {
    let match = String(ticket.id).match(/^EMC-(\d+)$/i);

    if (match) {
        return Math.max(highest, Number(match[1]));
    }

    return highest;
}, 1000);

// STEP 4: Get the saved counter
let savedTicketNumber = Number(localStorage.getItem("ticketNumber")) || 1001;

// Choose the next unused ticket number
let ticketNumber = Math.max(savedTicketNumber, highestTicketNumber + 1, 1001);

// STEP 5: Handle form submission
issueForm.addEventListener("submit", function(event) {

    event.preventDefault();

    // Get values entered by the student
    let category = document.getElementById("issueCategory").value;
    let description = document.getElementById("issueDescription").value.trim();

    // STEP 6: Validate inputs
    if (category === "" || description === "") {

        alert("Please fill in all the fields.");

    } else {

        // STEP 7: Create a ticket object
        let newTicket = {
            id: "EMC-" + ticketNumber,
            category: category,
            description: description,
            date: new Date().toLocaleDateString(),
            status: "Pending",
            remarks: ""
        };

        // STEP 8: Add the ticket to the array
        tickets.push(newTicket);

        // STEP 9: Save tickets in LocalStorage
        localStorage.setItem("tickets", JSON.stringify(tickets));
        localStorage.setItem("ticketNumber", ticketNumber + 1);

        // STEP 10: Display success message
        alert("Issue submitted successfully! Your Ticket ID is " + newTicket.id);

        // STEP 11: Clear the form
        issueForm.reset();

        ticketNumber++;
    }
});

// STEP 12: Get sidebar elements
let menuToggle = document.getElementById("menuToggle");
let sidebar = document.getElementById("sidebar");
let overlay = document.getElementById("overlay");

// STEP 13: Create sidebar toggle function
function toggleSidebar() {
    sidebar.classList.toggle("open");
    overlay.classList.toggle("show");
}

// STEP 14: Handle sidebar clicks
if (menuToggle && sidebar && overlay) {
    menuToggle.addEventListener("click", toggleSidebar);
    overlay.addEventListener("click", toggleSidebar);
}
