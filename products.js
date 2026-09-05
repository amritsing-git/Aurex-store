const searchBox = document.getElementById("searchBox");
const productCards = document.querySelectorAll(".shop-card");
const categoryLinks = document.querySelectorAll(".category-scroll a");


// PRODUCT CARD CLICK
function setupProductLinks() {

    productCards.forEach(function(card) {

        const titleElement = card.querySelector("h3");

        if (!titleElement) return;

        const productName =
            titleElement.textContent.toLowerCase().trim();

        let productId = null;

        Object.keys(AUREX_PRODUCTS).forEach(function(key) {

            const product = AUREX_PRODUCTS[key];

            if (
                product.name.toLowerCase().trim() === productName
            ) {
                productId = product.id;
            }

        });

        if (!productId) return;

        card.dataset.productId = productId;

        card.style.cursor = "pointer";

        card.addEventListener("click", function(event) {

            if (
                event.target.closest("button") ||
                event.target.closest("a")
            ) {
                return;
            }

            window.location.href =
                "product.html?id=" +
                encodeURIComponent(productId);

        });

    });

}


// SEARCH + CATEGORY
function filterProducts() {

    const searchText =
        searchBox.value.toLowerCase().trim();

    productCards.forEach(function(card) {

        const titleElement = card.querySelector("h3");

        if (!titleElement) return;

        const productName =
            titleElement.textContent.toLowerCase();

        const productCategory =
            card.dataset.category || "";

        const selectedCategory =
            window.selectedCategory || "all";

        const matchesSearch =
            productName.includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            productCategory === selectedCategory;

        if (matchesSearch && matchesCategory) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }

    });

}


// SEARCH
if (searchBox) {

    searchBox.addEventListener("input", function() {
        filterProducts();
    });

}


// CATEGORY
categoryLinks.forEach(function(link) {

    link.addEventListener("click", function(event) {

        event.preventDefault();

        const category =
            link.textContent.toLowerCase().trim();

        window.selectedCategory = category;

        filterProducts();

    });

});


// DEFAULT
window.selectedCategory = "all";


// START
setupProductLinks();
filterProducts();