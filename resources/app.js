// Collection Of All Book Objects
let myLibrary = [];

function Book(title, author, genre, read) {
	this.title = title;
	this.author = author;
	this.genre = genre;
	this.read = read;
	this.getKeys = function () {
		return [this.title, this.author, this.genre];
	};
	this.setRead = function (readStatus) {
		this.read = readStatus;
	};
}

function addBookToLibrary(Book) {
	myLibrary.push(Book);
}

// Generate and display books into HTML
function generateLibrary(bookCollection) {
	// Always cleans the display area, and uses our collection to render our books.
	const root = document.getElementById("root");
	root.innerHTML = "";

	for (let i = 0; i < bookCollection.length; i++) {
		const curBookCard = document.createElement("div");
		curBookCard.classList.add("book");

		bookCollection[i].getKeys().map((key) => {
			const bookLine = document.createElement("p");
			bookLine.textContent = key;
			bookLine.classList.add("bookLine");
			curBookCard.appendChild(bookLine);
		});

		// Add has read button
		const hasReadBtn = document.createElement("button");
		if (bookCollection[i].read) {
			hasReadBtn.textContent = "Have Read";
			hasReadBtn.style.backgroundColor = "green";
		} else {
			hasReadBtn.textContent = "Not Read";
			hasReadBtn.style.backgroundColor = "red";
		}
		hasReadBtn.addEventListener("click", (e) => {
			toggleRead(e.target.parentElement.childNodes[0]);
			if (hasReadBtn.textContent === "Have Read") {
				hasReadBtn.textContent = "Not Read";
				hasReadBtn.style.backgroundColor = "red";
			} else {
				hasReadBtn.textContent = "Have Read";
				hasReadBtn.style.backgroundColor = "green";
			}
		});
		hasReadBtn.classList.add("toggleRead-btn");
		hasReadBtn.classList.add("book-btn");
		curBookCard.appendChild(hasReadBtn);

		// Add Remove Button
		const removeButton = document.createElement("button");
		removeButton.textContent = "Remove Book";
		removeButton.classList.add("book-btn");
		removeButton.addEventListener("click", (e) => {
			removeFromCollection(e.target.parentElement.childNodes[0]);
		});
		curBookCard.appendChild(removeButton);

		root.appendChild(curBookCard);
	}
}

function toggleRead(bookTitle) {
	for (let i = 0; i < myLibrary.length; i++) {
		if (myLibrary[i].title === bookTitle.textContent) {
			myLibrary[i].setRead(!myLibrary[i].read);
		}
	}
}

function removeFromCollection(bookTitle) {
	let indexToRemove = 0;
	for (let i = 0; i < myLibrary.length; i++) {
		if (myLibrary[i].title === bookTitle) {
			indexToRemove = i;
		}
	}
	myLibrary.splice(indexToRemove, 1);
	generateLibrary(myLibrary);
}

// Add toggle interactivity
const addBookBtn = document.getElementById("addBookContainer");
addBookBtn.addEventListener("click", () => {
	toggleAddBookDisplay();
});

function toggleAddBookDisplay() {
	const form = document.getElementById("submitNewBook");
	if (form.style.display === "none" || form.style.display === "") {
		form.style.display = "block";
	} else {
		form.style.display = "none";
	}
}

// Add base database
const favBook = new Book(
	"Think Rich, Grow Rich",
	"Napoleon Hill",
	"self-help",
	true
);
addBookToLibrary(favBook);
const moneyBook = new Book(
	"Richest Man In Babylon",
	"Hill",
	"personal finance",
	true
);
addBookToLibrary(moneyBook);

// Initiate Generate Library
generateLibrary(myLibrary);

// Page Interactivity
const submitNewBook = document.getElementById("submitNewBook");
submitNewBook.addEventListener("submit", (e) => {
	e.preventDefault();
	const newBook = new Book(
		e.target.title.value,
		e.target.author.value,
		e.target.genre.value,
		e.target.read.checked
	);
	addBookToLibrary(newBook);

	// Re-generate library from collection
	generateLibrary(myLibrary);
	submitNewBook.reset();
	toggleAddBookDisplay();
});
