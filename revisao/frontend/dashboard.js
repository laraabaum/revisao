async function loadProducts() {
    const response = await fetch('http://localhost:3030/products')
    const data = await response.json()
    const tbody = document.querySelector('tbody')
    tbody.innerHTML = ''

    data.products.forEach(product => {
        const row = document.createElement('tr')
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.quantity}</td>
            <td>${product.price}</td>
            <td>
              <button onclick="editProduct(${product.id})">Editar</button>
              <button onclick="deleteProduct(${product.id})">Deletar</button>
            </td>
        `;
        tbody.appendChild(row)
    });
}

document.querySelector('.product-form form').addEventListener('submit', async (e) => {
    e.preventDefault()

    const name = document.getElementById('product-name').value
    const quantity = document.getElementById('product-quantity').value
    const price = document.getElementById('product-price').value

    await fetch('http://localhost:3030/products', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name, quantity, price})
    })

    document.querySelector('.product-form form').reset()
    loadProducts()
})

// EDITAR
async function editProduct(id) {
    const name = prompt("Novo nome:")
    const quantity = prompt("Nova quantidade:")
    const price = prompt("Novo preço:")

    await fetch(`http://localhost:3030/products/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name, quantity, price})
    })

    loadProducts()
}

// DELETAR
async function deleteProduct(id) {
    await fetch(`http://localhost:3030/products/${id}`, {
        method: 'DELETE',
    })

    loadProducts()
}

loadProducts()