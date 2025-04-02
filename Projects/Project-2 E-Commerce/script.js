// script.js
$(document).ready(function() {
    loadPage('index.html'); // Load home page initially

    $('.nav-link').click(function(e) {
        e.preventDefault();
        let href = $(this).attr('href');
        loadPage(href);
    });

    $('#searchForm').submit(function(e) {
        e.preventDefault();
        let searchTerm = $('#searchInput').val();
        searchProducts(searchTerm);
    });
});

function loadPage(url) {
    $.ajax({
        url: url,
        success: function(data) {
            $('#content').html(data);
        },
        error: function() {
            $('#content').html('<p>Page not found.</p>');
        }
    });
}

function searchProducts(searchTerm) {
    // Simulate search functionality (replace with actual search logic)
    let searchResults = `<h2>Search Results for "${searchTerm}"</h2><p>No results found.</p>`;
    if (searchTerm === "product") {
        searchResults = `<h2>Search Results for "${searchTerm}"</h2><div class="product-card"><img src="placeholder.jpg" alt="Product"><p>Found Product!</p></div>`;
    }
    $('#content').html(searchResults);
}