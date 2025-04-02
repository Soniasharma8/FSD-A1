document.addEventListener('DOMContentLoaded', function() {
    const buyButton = document.querySelector('.buy');
    const cartBody = document.querySelector('#cart tbody');
    const totalInput = document.querySelector('#total');
    const priceBuyInput = document.querySelector('#price-buy');
    const searchBuyButton = document.querySelector('.search-buy');
    const productNameBuyInput = document.querySelector('#product-name-buy');
    const productIdBuyInput = document.querySelector('#product-id-buy');

    let products = [];
    let cartItems = [];

    // Search product in buy section
    searchBuyButton.addEventListener('click', function() {
        const productId = productIdBuyInput.value;
        const foundProduct = products.find(product => product.productId === productId);
        if (foundProduct) {
            productNameBuyInput.value = foundProduct.productName;
            priceBuyInput.value = foundProduct.price;
        } else {
            alert("Product not found");
            productNameBuyInput.value = '';
            priceBuyInput.value = '';
        }
    });

    // Buy button functionality
    buyButton.addEventListener('click', function() {
        const productInvoice = productInvoiceBuyInput.value;
        const productId = productIdBuyInput.value;
        const productName = productNameBuyInput.value;
        const price = parseFloat(priceBuyInput.value);
        const qty = parseInt(document.querySelector('#qty-buy').value);

        if (productInvoice && productDate && productId && productCustomer && productName && !isNaN(price) && !isNaN(qty)) {
            const item = { productInvoice,productDate,productCustomer,productId, productName, price, qty };
            cartItems.push(item);
            updateCart();
            // Clear buy product section
            productIdBuyInput.value = '';
            productNameBuyInput.value = '';
            priceBuyInput.value = '';
            document.querySelector('#qty-buy').value = '';
        } else {
            alert('Please fill in all fields correctly.');
        }
    });

    // Update cart function
    function updateCart() {
        cartBody.innerHTML = '';
        let total = 0;
        cartItems.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
               
                <td>${item.productInvoice}</td>
                <td>${item.productDate}</td>
                <td>${item.productCustomer}</td>
                <td>${item.productId}</td>
                <td>${item.productName}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>${item.qty}</td>
            `;
            cartBody.appendChild(row);
            total += item.price * item.qty;
        });
        totalInput.value = total.toFixed(2);
    }

    // Save product functionality
    document.querySelector('.save').addEventListener('click', function() {
        const productId = document.querySelector('#product-id').value;
        const productName = document.querySelector('#product-name').value;
        const price = parseFloat(document.querySelector('#price').value);

        if (productId && productName && !isNaN(price)) {
            const product = { productId, productName, price };
            products.push(product);
            alert("Product saved!");
        } else {
            alert("Please fill all fields");
        }
    });

    // Checkout functionality
   
   document.querySelector('.checkout').addEventListener('click', function() {
    const totalInput = document.querySelector('#total');
    let total = parseFloat(totalInput.value);
    const gstPercentage = 0; // Hardcoded GST percentage

    if (!isNaN(total)) {
        // Check if GST has already been added
        if (!totalInput.dataset.gstAdded) {
            const gstAmount = (total * gstPercentage) / 100;
            total += gstAmount;
            totalInput.value = total.toFixed(2);
            totalInput.dataset.gstAdded = 'true'; // Mark GST as added
        }
    } else {
        alert("Total is invalid");
    }
});

    // Clear button functionality
    document.querySelector('.clear').addEventListener('click', function() {
        document.querySelector('#product-id').value = '';
        document.querySelector('#product-name').value = '';
        document.querySelector('#price').value = '';
        document.querySelector('#qty').value = '';
    });

    // Delete button functionality
    document.querySelector('.delete').addEventListener('click', function() {
        const productIdToDelete = document.querySelector('#product-id').value;
        products = products.filter(product => product.productId !== productIdToDelete);
        alert('Product deleted!');
    });

    // Search button functionality in Edit Product section
    document.querySelector('.search').addEventListener('click', function() {
        const productIdToSearch = document.querySelector('#product-id').value;
        const foundProduct = products.find(product => product.productId === productIdToSearch);
        if (foundProduct) {
            document.querySelector('#product-name').value = foundProduct.productName;
            document.querySelector('#price').value = foundProduct.price;
        } else {
            alert('Product not found');
        }
    });

    // Delete all button functionality
    document.querySelector('.delete-all').addEventListener('click', function() {
        products = [];
        alert('All products deleted!');
    });
});


    // Generate Invoice button functionality
 
    document.querySelector('.generate-invoice').addEventListener('click', function() {
        const invoiceNumber = document.querySelector('#i-no').value;
        const invoiceDate = document.querySelector('#no-date').value;
        const customerName = document.querySelector('#customer').value;
        const cartItems = cartItems;

        if (invoiceNumber && invoiceDate && customerName && cartItems.length > 0) {
            let invoiceContent = `
                <h2>Invoice</h2>
                <p>Invoice Number: ${invoiceNumber}</p>
                <p>Invoice Date: ${invoiceDate}</p>
                <p>Customer: ${customerName}</p>
                <table>
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            let grandTotal = 0;
            cartItems.forEach(item => {
                const subtotal = item.price * item.qty;
                grandTotal += subtotal;
                invoiceContent += `
                    <tr>
                        <td>${item.productId}</td>
                        <td>${item.productName}</td>
                        <td>${item.price.toFixed(2)}</td>
                        <td>${item.qty}</td>
                        <td>${subtotal.toFixed(2)}</td>
                    </tr>
                `;
            });

            invoiceContent += `
                    </tbody>
                </table>
                <p>Grand Total: ₹${grandTotal.toFixed(2)}</p>
            `;

            // Open a new window or tab with the invoice content
            const invoiceWindow = window.open('', '_blank');
            invoiceWindow.document.write(invoiceContent);
            invoiceWindow.document.close();
        } else {
            alert('Please fill in Invoice Number, Invoice Date, Customer, and add items to the cart.');
        }
    });


  
