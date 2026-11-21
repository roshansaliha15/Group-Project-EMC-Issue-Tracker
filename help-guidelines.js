
// Get all FAQ questions
const questions = document.querySelectorAll(".faq-question");

// Get all FAQ items
const faqItems = document.querySelectorAll(".faq-item");

// Add click event to every question
questions.forEach(function(question) {

    question.addEventListener("click", function(event) {

        // Prevent default anchor behaviour
        event.preventDefault();

        // Get the FAQ item that was clicked
        const currentItem = question.parentElement;

        // Check whether the clicked question is already open
        const isOpen = currentItem.classList.contains("active");

        // Close all FAQ answers
        faqItems.forEach(function(item) {

            item.classList.remove("active");

            item.querySelector(".faq-answer").classList.remove("show");

        });

        // Open only the clicked question if it was previously closed
        if (!isOpen) {

            currentItem.classList.add("active");

            currentItem.querySelector(".faq-answer").classList.add("show");

        }

    });

});
