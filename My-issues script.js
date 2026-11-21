
function filterIssues() {
    const searchValue = document.getElementById("searchInput").value.toLowerCase().trim();
    const statusValue = document.getElementById("statusFilter").value.toLowerCase();
    const rows = document.querySelectorAll("#issuesBody tr");
    const noResult = document.getElementById("noResult");

    let visibleCount = 0;

    rows.forEach((row) => {
        const ticketId = row.cells[0].textContent.toLowerCase();
        const statusText = row.cells[4].textContent.toLowerCase().trim();

        const matchesSearch = ticketId.includes(searchValue);
        const matchesStatus = statusValue === "all" || statusText === statusValue;

        if (matchesSearch && matchesStatus) {
            row.style.display = "";
            visibleCount++;
        } else {
            row.style.display = "none";
        }
    });

    noResult.style.display = visibleCount === 0 ? "block" : "none";
}

document.getElementById("searchBtn").addEventListener("click", filterIssues);

document.getElementById("searchInput").addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
        filterIssues();
    }
});

document.getElementById("statusFilter").addEventListener("change", filterIssues);