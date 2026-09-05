// ========================================
// AUREX MOBILE BOTTOM NAVIGATION
// ========================================

(function () {

    // ----------------------------------------
    // CREATE NAVIGATION
    // ----------------------------------------

    var nav = document.createElement("nav");

    nav.className = "aurex-bottom-nav";

    nav.innerHTML = `

        <a href="index.html" class="aurex-nav-item" data-page="home">

            <span class="aurex-nav-icon">⌂</span>

            <span class="aurex-nav-label">
                Home
            </span>

        </a>


        <a href="products.html" class="aurex-nav-item" data-page="categories">

            <span class="aurex-nav-icon">▦</span>

            <span class="aurex-nav-label">
                Categories
            </span>

        </a>


        <a href="products.html" class="aurex-nav-item" data-page="search">

            <span class="aurex-nav-icon">⌕</span>

            <span class="aurex-nav-label">
                Search
            </span>

        </a>


        <a href="wishlist.html" class="aurex-nav-item" data-page="wishlist">

            <span class="aurex-nav-icon">♡</span>

            <span class="aurex-nav-label">
                Wishlist
            </span>

        </a>


        <a href="cart.html" class="aurex-nav-item" data-page="cart">

            <span class="aurex-nav-icon cart-icon">

                🛒

                <span
                    id="aurexCartBadge"
                    class="aurex-cart-badge">
                    0
                </span>

            </span>

            <span class="aurex-nav-label">
                Cart
            </span>

        </a>

    `;


    // ----------------------------------------
    // ADD TO PAGE
    // ----------------------------------------

    document.body.appendChild(nav);


    // ----------------------------------------
    // FIND CURRENT PAGE
    // ----------------------------------------

    var currentPage =
        window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();


    if (!currentPage) {

        currentPage = "index.html";

    }


    var navItems =
        nav.querySelectorAll(
            ".aurex-nav-item"
        );


    // ----------------------------------------
    // ACTIVE TAB
    // ----------------------------------------

    for (
        var i = 0;
        i < navItems.length;
        i++
    ) {

        var item =
            navItems[i];

        var page =
            item.getAttribute(
                "href"
            );


        if (
            currentPage === page
        ) {

            item.classList.add(
                "active"
            );

        }

    }


    // ----------------------------------------
    // CART BADGE
    // ----------------------------------------

    function updateCartBadge() {

        var badge =
            document.getElementById(
                "aurexCartBadge"
            );


        if (!badge) {

            return;

        }


        var cart = [];


        try {

            cart =
                JSON.parse(
                    localStorage.getItem(
                        "aurexCart"
                    ) || "[]"
                );


            if (
                !Array.isArray(cart)
            ) {

                cart = [];

            }

        } catch (error) {

            cart = [];

        }


        var totalQuantity = 0;


        for (
            var i = 0;
            i < cart.length;
            i++
        ) {

            totalQuantity +=
                Number(
                    cart[i].quantity || 1
                );

        }


        badge.textContent =
            totalQuantity;


        if (
            totalQuantity > 0
        ) {

            badge.style.display =
                "flex";

        } else {

            badge.style.display =
                "none";

        }

    }


    // ----------------------------------------
    // UPDATE CART
    // ----------------------------------------

    updateCartBadge();


    // Update if another page changes cart
    window.addEventListener(
        "storage",
        function () {

            updateCartBadge();

        }
    );


    // ----------------------------------------
    // SEARCH BUTTON
    // ----------------------------------------

    var searchItem =
        nav.querySelector(
            '[data-page="search"]'
        );


    if (searchItem) {

        searchItem.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                window.location.href =
                    "products.html";

            }
        );

    }

})();