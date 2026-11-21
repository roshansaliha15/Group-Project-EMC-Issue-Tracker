let issueForm = document.getElementById("issueForm");

let ticketNumber = Number(localStorage.getItem("ticketNumber")) || 1001;

let tickets = JSON.parse(localStorage.getItem("tickets")) || [];

issueForm.addEventListener("submit", function(event) {

    event.preventDefault();

    let category = document.getElementById("issueCategory").value;
    let description = document.getElementById("issueDescription").value.trim();

    if (category === "" || description === "") {

        alert("Please fill in all the fields.");

    } else {

        let newTicket = {
            id: "EMC-" + ticketNumber,
            category: category,
            description: description,
            date: new Date().toLocaleDateString(),
            status: "Pending",
            remarks: ""
        };

        tickets.push(newTicket);

        localStorage.setItem("tickets", JSON.stringify(tickets));
        localStorage.setItem("ticketNumber", ticketNumber + 1);

        alert("Issue submitted successfully! Your Ticket ID is " + newTicket.id);

        issueForm.reset();

        ticketNumber++;
    }
});

let menuToggle = document.getElementById("menuToggle");
let sidebar = document.getElementById("sidebar");
let overlay = document.getElementById("overlay");

function toggleSidebar() {
    sidebar.classList.toggle("open");
    overlay.classList.toggle("show");
}

menuToggle.addEventListener("click", toggleSidebar);
overlay.addEventListener("click", toggleSidebar);
