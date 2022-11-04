const productTableBody = document.querySelector('#productsTable tbody');
const resultTable = document.querySelector('#resultTable');

const canRemove = () => {
    return productTableBody.querySelectorAll('tr').length > 1;
};

const removeCallback = (e) => {
    if (!canRemove()) {
        return;
    }

    const btn = e.target;
    const tr = btn.closest('tr');
    tr.remove();
};

const clearRowDanger = (row) => {
    row.classList.remove('table-danger');
};

const clearRow = (row) => {
    clearRowDanger(row);
    row.querySelectorAll('input').forEach((input) => {
        input.value = null;
        input.checked = false;
    });
}

const parseProduct = (tr) => {
    const title = tr.querySelector('.row-title').value;
    const amount = parseInt(tr.querySelector('.row-amount').value);
    const price = parseFloat(tr.querySelector('.row-price').value);
    const noTax = tr.querySelector('.row-notax').checked;
    const imported = tr.querySelector('.row-imported').checked;

    if (title.length === 0) {
        return null;
    }

    if (!(amount > 0)) {
        return null;
    }

    if (!(price > 0)) {
        return null;
    }

    return new Product(title, amount, price, noTax, imported);
};

const renderResultTable = (calculator) => {
    const products = calculator.products;

    if (products.length === 0) {
        resultTable.classList.add('d-none');
        return;
    } else {
        resultTable.classList.remove('d-none');
    }

    const tbody = resultTable.querySelector('tbody');

    const prototypeRow = tbody.querySelector('tr').cloneNode(true);
    tbody.innerHTML = '';

    products.forEach((product) => {
        const row = prototypeRow.cloneNode(true);

        row.querySelector('.result-title').innerHTML = product.title;
        row.querySelector('.result-amount').innerHTML = product.amount;
        row.querySelector('.result-price').innerHTML = product.priceWithTax().toFixed(2);

        tbody.insertAdjacentElement('beforeend', row);
    });

    resultTable.querySelector('.result-total').innerHTML = calculator.totalPrice().toFixed(2);
    resultTable.querySelector('.result-tax').innerHTML = calculator.taxValue().toFixed(2);
};

document.querySelector('#addRow').addEventListener('click', () => {
    const cloned = productTableBody.querySelector('tr').cloneNode(true);
    clearRow(cloned);

    productTableBody.insertAdjacentElement('beforeend', cloned);
    productTableBody.querySelectorAll('.product-remove').forEach((btn) => btn.addEventListener('click', removeCallback));
});
productTableBody.querySelectorAll('.product-remove').forEach((btn) => btn.addEventListener('click', removeCallback));

document.querySelector('#submit').addEventListener('click', () => {
    const calculator = new Calculator();

    productTableBody.querySelectorAll('tr').forEach((tr) => {
        clearRowDanger(tr);
        const product = parseProduct(tr);

        if (product) {
            calculator.addProduct(product);
        } else {
            tr.classList.add("table-danger");
        }
    });

    renderResultTable(calculator);
});
