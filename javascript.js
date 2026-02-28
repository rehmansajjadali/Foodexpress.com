
        // Mobile Menu Toggle
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');

        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });

        // Cart Functionality
        let cartItems = 0;
        const cartCountElement = document.getElementById('cartCount');

        function addToCart() {
            cartItems++;
            cartCountElement.innerText = cartItems;
            cartCountElement.style.display = 'block';
            
            // Simple animation effect
            cartCountElement.style.transform = 'scale(1.5)';
            setTimeout(() => {
                cartCountElement.style.transform = 'scale(1)';
            }, 200);

            alert("Item added to cart!");
        }

        // Smooth Scrolling for Anchor Links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
        