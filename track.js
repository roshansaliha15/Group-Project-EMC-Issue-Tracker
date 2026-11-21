
let trackForm = document.getElementById("trackForm");

let ticketResult = document.getElementById("ticketResult");

trackForm.addEventListener("submit", function(event) {

    event.preventDefault();

    let ticketId = document.getElementById("ticketId").value.trim().toUpperCase();

    let tickets = JSON.parse(localStorage.getItem("tickets")) || [];

    let foundTicket = tickets.find(function(ticket) {
        return ticket.id.toUpperCase() === ticketId;
    });

    ticketResult.innerHTML = "";

    if (foundTicket) {

        let resultBox = document.createElement("div");

        let heading = document.createElement("h3");
        heading.textContent = "Ticket Details";

        let id = document.createElement("p");
        id.textContent = "Ticket ID: " + foundTicket.id;

        let category = document.createElement("p");
        category.textContent = "Category: " + foundTicket.category;

        let description = document.createElement("p");
        description.textContent = "Description: " + foundTicket.description;

        let date = document.createElement("p");
        date.textContent = "Date: " + foundTicket.date;

        let status = document.createElement("p");
        status.textContent = "Status: " + foundTicket.status;

        let remarks = document.createElement("p");
        remarks.textContent = "Remarks: " + foundTicket.remarks;

        resultBox.appendChild(heading);
        resultBox.appendChild(id);
        resultBox.appendChild(category);
        resultBox.appendChild(description);
        resultBox.appendChild(date);
        resultBox.appendChild(status);
        resultBox.appendChild(remarks);

        ticketResult.appendChild(resultBox);

    } else {

        let error = document.createElement("p");

        error.textContent = "Ticket not found! Please enter a valid Ticket ID.";

        ticketResult.appendChild(error);

    }

});


// MOBILE SIDEBAR

let menuToggle = document.getElementById("menuToggle");
let sidebar = document.getElementById("sidebar");
let overlay = document.getElementById("overlay");

function toggleSidebar() {
    sidebar.classList.toggle("open");
    overlay.classList.toggle("show");
}

menuToggle.addEventListener("click", toggleSidebar);
overlay.addEventListener("click", toggleSidebar);
