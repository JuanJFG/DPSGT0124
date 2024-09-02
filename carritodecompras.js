// script.js

document.addEventListener('DOMContentLoaded', function () {
    const cart = [];
    const cartItemsContainer = document.querySelector('.cart-items');
    const checkoutBtn = document.getElementById('checkout-btn');

    // Ejemplo de productos (deberías generarlos dinámicamente en una app real)
    const products = [
        { id: 1, category: 'Men', name: 'Balenciaga Incognito Oversized Zip-Up Hoodie', price: 2990, img: 'https://www.mrporter.com/variants/images/1647597345316273/in/w560_q60.jpg' },
        { id: 2, category: 'Men', name: 'Loro Piana Varallo Honeycomb-Knit Sweater', price: 2000, img: 'https://www.mrporter.com/variants/images/1647597351952952/in/w560_q60.jpg' },
        { id: 3, category: 'Men', name: 'Polo Ralph Lauren Jarrett Slim-Fit Trousers', price: 450, img: 'https://www.mrporter.com/variants/images/1647597342644598/in/w960_q60.jpg' },
        { id: 4, category: 'Men', name: 'Stone Island Straight-Leg Cargo Trousers', price: 220, img: 'https://www.mrporter.com/variants/images/1647597344690451/in/w960_q60.jpg' },
        { id: 5, category: 'Men', name: 'Fear of God Striped Full-Grain Leather Bomber Jacket', price: 3680, img: 'https://www.mrporter.com/variants/images/1647597330250028/in/w960_q60.jpg' },
        { id: 6, category: 'Men', name: 'Fear of God Striped Logo-Appliquéd Wool-Gabardine Blazer', price: 1420, img: 'https://www.mrporter.com/variants/images/1647597337668210/in/w960_q60.jpg' },
        { id: 7, category: 'Women', name: 'Jane Post Iconic Princess Leopard Slicker Coat', price: 400, img: 'https://cdn.saksfifthavenue.com/is/image/saks/0400020576754_LEOPARD?wid=484&hei=646&qlt=90&resMode=sharp2&op_usm=0.9,1.0,8,0' },
        { id: 8, category: 'Women', name: 'Moncler Short Down Jacket', price: 1700, img: 'https://cdn.saksfifthavenue.com/is/image/saks/0400021831800_WHITE?wid=484&hei=646&qlt=90&resMode=sharp2&op_usm=0.9,1.0,8,0' },
        { id: 9, category: 'Women', name: 'Alice+Olivia Breann Denim Vegan Leather Blazer ', price: 4550, img: 'https://cdn.saksfifthavenue.com/is/image/saks/0400021421548_DARKRINSE?wid=484&hei=646&qlt=90&resMode=sharp2&op_usm=0.9,1.0,8,0' },
        { id: 10, category: 'Women', name: 'Mac Duggal Beaded Square Neck Column Gown', price: 950, img: 'https://cdn.saksfifthavenue.com/is/image/saks/0400021355895_BLACKGOLD?wid=484&hei=646&qlt=90&resMode=sharp2&op_usm=0.9,1.0,8,0' },
        { id: 11, category: 'Women', name: 'Dolce&Gabbana Brocade Jacquard One-Button Blazer', price: 5450, img: 'https://cdn.saksfifthavenue.com/is/image/saks/0400020925396_BIANCOOTTICO?wid=484&hei=646&qlt=90&resMode=sharp2&op_usm=0.9,1.0,8,0' },
        { id: 12, category: 'Women', name: 'Toccin Brandy Houndstooth Belted Coat', price: 1110, img: 'https://cdn.saksfifthavenue.com/is/image/saks/0400021738584_JETOPTIC?wid=484&hei=646&qlt=90&resMode=sharp2&op_usm=0.9,1.0,8,0' },
        { id: 13, category: 'Perfume', name: 'Guilty Intense by Gucci |Woman ', price: 180, img: 'https://luxuryperfume.com/cdn/shop/products/12824_f7c327b7-b5d3-4563-89a5-15f2b877df59_1024x1024.jpg?v=1635467192' },
        { id: 14, category: 'Perfume', name: 'Sauvage by Christian Dior |Man', price: 190, img: 'https://luxuryperfume.com/cdn/shop/products/TES104_98e992ec-a0f5-4f27-bd93-540a994ece0e_1024x1024.jpg?v=1571172390' },
        { id: 15, category: 'Perfume', name: 'Eros by Versace |Woman', price: 200, img: 'https://luxuryperfume.com/cdn/shop/products/15209_c2245953-3034-419b-9678-ff0598e99d52_1024x1024.jpg?v=1635467474' },
        { id: 16, category: 'Perfume', name: 'Dolce Gabbana Intenso by Dolce & Gabbana |Man', price: 135, img: 'https://luxuryperfume.com/cdn/shop/products/14553_5ffc55e0-25dd-42f4-8b6f-a9775ab9b8be_1024x1024.jpg?v=1635467048' },
        { id: 17, category: 'Perfume', name: 'Euphoria Intense by Calvin Klein |Man', price: 115, img: 'https://luxuryperfume.com/cdn/shop/products/6181_1024x1024.jpg?v=1571165333' },
        { id: 18, category: 'Perfume', name: 'Good Girl by C H |Woman', price: 220, img: 'https://luxuryperfume.com/cdn/shop/products/16370_93281d15-7ed1-41d1-b70b-e4cbe51fe0e6_1024x1024.jpg?v=1571171013' },
    ];

    // Cargar productos en la página
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'col-md-4 product-card';
        productCard.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h5>${product.name}</h5>
            <p>$${product.price}</p>
            <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;
        document.querySelector(`#${product.category.toLowerCase()} .row`).appendChild(productCard);
    });

    // Añadir producto al carrito
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            const productId = parseInt(this.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
            cart.push(product);
            renderCart();
            // Mostrar el modal del carrito automáticamente al añadir un producto
            $('#cartModal').modal('show');
        });
    });

    // Renderizar items del carrito separados por categoría
    function renderCart() {
        const categories = {
            'Men': [],
            'Women': [],
            'Perfume': []
        };

        // Organizar productos del carrito por categoría
        cart.forEach(item => {
            categories[item.category].push(item);
        });

        cartItemsContainer.innerHTML = '';

        // Crear contenedores por categoría y añadir productos
        for (const [category, items] of Object.entries(categories)) {
            if (items.length > 0) {
                const categoryDiv = document.createElement('div');
                categoryDiv.className = 'category-section';
                categoryDiv.innerHTML = `<h5>${category}</h5>`;
                const itemsDiv = document.createElement('div');
                itemsDiv.className = 'category-items';

                items.forEach((item, index) => {
                    const itemDiv = document.createElement('div');
                    itemDiv.className = 'cart-item d-flex justify-content-between align-items-center';
                    itemDiv.innerHTML = `
                        <span>${item.name} - $${item.price}</span>
                        <button class="btn btn-danger btn-sm remove-item" data-category="${category}" data-id="${item.id}">&times;</button>
                    `;
                    itemsDiv.appendChild(itemDiv);
                });

                categoryDiv.appendChild(itemsDiv);
                cartItemsContainer.appendChild(categoryDiv);
            }
        }

        // Añadir event listeners a los botones de eliminación
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function () {
                const itemId = parseInt(this.getAttribute('data-id'));
                const category = this.getAttribute('data-category');
                removeFromCart(category, itemId);
            });
        });
    }

    // Eliminar producto del carrito
    function removeFromCart(category, id) {
        // Encontrar el índice del producto en el carrito
        const itemIndex = cart.findIndex(item => item.category === category && item.id === id);
        if (itemIndex !== -1) {
            cart.splice(itemIndex, 1);  // Eliminar el elemento del array
            renderCart();  // Volver a renderizar el carrito
        }
    }

    // Generar PDF del carrito
    function generatePDF() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Título
        doc.setFontSize(18);
        doc.setFont('Arial', 'bold');
        doc.text("Invoice", 10, 20);

        // Información de la tienda
        doc.setFontSize(12);
        doc.setFont('Arial', 'normal');
        doc.text("Luxus", 10, 30);
        doc.text("Address: 998 Madison Avenue NY", 10, 35);
        doc.text("Phone: (123) 456-7890", 10, 40);

        // Línea horizontal
        doc.setDrawColor(0, 0, 0);
        doc.line(10, 45, 200, 45);

        // Tabla de productos
        doc.setFontSize(12);
        doc.text("Product", 10, 50);
        doc.text("Price", 160, 50);
        doc.line(10, 52, 200, 52);

        let y = 60;
        let total = 0;

        cart.forEach(item => {
            doc.text(item.name, 10, y);
            doc.text(`$${item.price.toFixed(2)}`, 160, y);
            y += 10;
            total += item.price;
        });

        // Total
        doc.setFontSize(14);
        doc.setFont('Arial', 'bold');
        doc.text("Total", 10, y);
        doc.text(`$${total.toFixed(2)}`, 160, y);

        // Guardar PDF
        doc.save('Receipt.pdf');
    }

    // Evento para el botón de checkout
    checkoutBtn.addEventListener('click', generatePDF);
});




