document.addEventListener("DOMContentLoaded", function () {

    // Select dashboard elements
    const searchInput = document.querySelector(".topbar input");
    const tableBody = document.querySelector(".table-wrapper tbody");
    const viewAllLink = document.querySelector(".section-heading a");

    // STEP 2: Read tickets saved by Report an Issue page
    function getTickets() {
        try {
            const data = JSON.parse(
                localStorage.getItem("tickets") || "[]"
            );

            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error("Unable to read tickets:", error);
            return [];
        }
    }

    // Display Recent Issues
    function displayTickets() {

        const tickets = getTickets();

        // Newest ticket first
        const recentTickets = [...tickets].reverse();

        tableBody.replaceChildren();

        recentTickets.forEach(function (ticket) {

            const row = document.createElement("tr");

            // Ticket ID
            const idCell = document.createElement("td");
            idCell.textContent = ticket.id || "";

            // Category
            const categoryCell = document.createElement("td");
            categoryCell.textContent = ticket.category || "";

            // Description
            const descriptionCell = document.createElement("td");
            descriptionCell.textContent = ticket.description || "";

            // Date
            const dateCell = document.createElement("td");
            dateCell.textContent = ticket.date || "";

            // Status
            const statusCell = document.createElement("td");
            const badge = document.createElement("span");

            const status = String(ticket.status || "Pending").trim();

            badge.classList.add("status");
            badge.textContent = status;

            if (status.toLowerCase() === "pending") {
                badge.classList.add("pending-badge");
            } else if (status.toLowerCase() === "in progress") {
                badge.classList.add("progress-badge");
            } else if (status.toLowerCase() === "resolved") {
                badge.classList.add("resolved-badge");
            }

            statusCell.appendChild(badge);

            // Add cells to row
            row.append(
                idCell,
                categoryCell,
                descriptionCell,
                dateCell,
                statusCell
            );

            tableBody.appendChild(row);
        });

        // Update statistics
        updateCounts(tickets);

        // Apply current search
        filterTickets();
    }

    //  Update statistics dynamically
    function updateCounts(tickets) {

        let pending = 0;
        let inProgress = 0;
        let resolved = 0;

        tickets.forEach(function (ticket) {

            const status = String(
                ticket.status || "Pending"
            ).trim().toLowerCase();

            if (status === "pending") {
                pending++;
            } else if (status === "in progress") {
                inProgress++;
            } else if (status === "resolved") {
                resolved++;
            }
        });

        document.querySelector(
            ".stat-card.total .stat-number"
        ).textContent = tickets.length;

        document.querySelector(
            ".stat-card.pending .stat-number"
        ).textContent = pending;

        document.querySelector(
            ".stat-card.progress .stat-number"
        ).textContent = inProgress;

        document.querySelector(
            ".stat-card.resolved .stat-number"
        ).textContent = resolved;
    }

    //  Search Ticket ID
    function filterTickets() {

        const query = searchInput.value
            .trim()
            .toLowerCase()
            .replace(/[\s-]/g, "");

        const rows = Array.from(tableBody.querySelectorAll("tr"));
        let visibleCount = 0;

        rows.forEach(function (row) {

            const ticketId = row.cells[0].textContent
                .toLowerCase()
                .replace(/[\s-]/g, "");

            const matches = ticketId.includes(query);

            row.style.display = matches ? "" : "none";

            if (matches) {
                visibleCount++;
            }
        });

        // Show message if no matching ticket
        let noResults = document.getElementById("dashboardNoResults");

        if (visibleCount === 0) {

            if (!noResults) {
                noResults = document.createElement("p");
                noResults.id = "dashboardNoResults";
                noResults.textContent = "No matching tickets found.";
                noResults.style.padding = "15px";
                noResults.style.textAlign = "center";

                document.querySelector(".table-wrapper")
                    .appendChild(noResults);
            }

        } else if (noResults) {
            noResults.remove();
        }
    }

    searchInput.addEventListener("input", filterTickets);

    // Open Ticket Details on Enter
    searchInput.addEventListener("keydown", function (event) {

        if (event.key !== "Enter") return;

        event.preventDefault();

        const query = searchInput.value
            .trim()
            .toLowerCase()
            .replace(/[\s-]/g, "");

        if (!query) return;

        const ticket = getTickets().find(function (item) {

            return String(item.id || "")
                .toLowerCase()
                .replace(/[\s-]/g, "") === query;
        });

        if (ticket) {

            // Replace with your teammate's actual page filename
            window.location.href =
                "ticket-details.html?id=" +
                encodeURIComponent(ticket.id);
        }
    });

    // View All
    viewAllLink.addEventListener("click", function (event) {

        event.preventDefault();

        searchInput.value = "";
        filterTickets();
    });

    // Refresh when tickets change in another tab
    window.addEventListener("storage", function (event) {

        if (event.key === "tickets" || event.key === null) {
            displayTickets();
        }
    });

    // Refresh when returning to the dashboard
    window.addEventListener("pageshow", displayTickets);

    // Initial dashboard load
    displayTickets();

});