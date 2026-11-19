document.addEventListener("DOMContentLoaded", () => {
  // ========== ELEMENTS ==========
  const searchInput = document.getElementById("searchInput");
  const statusFilter = document.getElementById("statusFilter");
  const filterForm = document.getElementById("filterForm");
  const noResults = document.getElementById("noResults");
  const resultCount = document.getElementById("resultCount");
  const rows = Array.from(document.querySelectorAll("#issuesTable tbody .issue-row"));

  const menuToggle = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");

  // ========== HELPERS ==========
  // Removes spaces and hyphens so "1005", "emc1005" and "EMC-1005" all match
  const normalize = (text) => text.toLowerCase().replace(/[\s-]/g, "");

  // ========== FILTER LOGIC ==========
  function filterTable() {
    const query = normalize(searchInput.value.trim());
    const selectedStatus = statusFilter.value;
    let visibleCount = 0;

    rows.forEach((row) => {
      const ticketId = normalize(row.dataset.ticket);
      const rowStatus = row.dataset.status;

      const matchesSearch = ticketId.includes(query);
      const matchesStatus = selectedStatus === "all" || rowStatus === selectedStatus;

      if (matchesSearch && matchesStatus) {
        row.style.display = "";
        visibleCount++;
      } else {
        row.style.display = "none";
      }
    });

    // Show or hide the empty state
    noResults.style.display = visibleCount === 0 ? "table-row" : "none";

    // Update result counter
    resultCount.textContent = `Showing ${visibleCount} of ${rows.length} issue${rows.length !== 1 ? "s" : ""}`;
  }

  // ========== EVENT LISTENERS ==========
  // Live search while typing
  searchInput.addEventListener("input", filterTable);

  // Filter when status changes
  statusFilter.addEventListener("change", filterTable);

  // Search button / Enter key
  filterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    filterTable();
  });

  // Press Escape to clear the search box
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      searchInput.value = "";
      filterTable();
    }
  });

  // Open ticket details on row click (placeholder action)
  rows.forEach((row) => {
    row.style.cursor = "pointer";
    row.addEventListener("click", () => {
      console.log(`Opening details for ${row.dataset.ticket}`);
    });
  });

  // ========== MOBILE SIDEBAR ==========
  function toggleSidebar() {
    sidebar.classList.toggle("open");
    overlay.classList.toggle("show");
  }

  menuToggle.addEventListener("click", toggleSidebar);
  overlay.addEventListener("click", toggleSidebar);

  // Run once on load to set the initial count
  filterTable();
});