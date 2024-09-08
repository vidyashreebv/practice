let books = [];
let currentPage = 1;
const booksPerPage = 2;

window.onload = () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            books = data;
            displayBooks();
        });

    document.getElementById('search').addEventListener('input', filterBooks);
};

function displayBooks() {
    const start = (currentPage - 1) * booksPerPage;
    const end = start + booksPerPage;
    const bookList = books.slice(start, end);

    const bookContainer = document.getElementById('book-list');
    bookContainer.innerHTML = '';
    
    bookList.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('book');
        div.innerHTML = `<h3>${book.title}</h3><p>${book.author} (${book.year})</p>`;
        bookContainer.appendChild(div);
    });

    document.getElementById('prev').disabled = currentPage === 1;
    document.getElementById('next').disabled = end >= books.length;
}

function sortBooks() {
    books.sort((a, b) => a.title.localeCompare(b.title));
    displayBooks();
}

function filterBooks() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    books = books.filter(book => book.title.toLowerCase().includes(searchTerm));
    displayBooks();
}

function nextPage() {
    currentPage++;
    displayBooks();
}

function prevPage() {
    currentPage--;
    displayBooks();
}
