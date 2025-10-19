const addBookMarkBtn = document.getElementById("add-bookmark");
const bookmarkList = document.getElementById("bookmark-list");
const bookmarkNameInput = document.getElementById("bookmark-name");
const bookmarkUrlInput = document.getElementById("bookmark-url");

document.addEventListener("DOMContentLoaded", loadBookmarks);

addBookMarkBtn.addEventListener("click", function() {
    const name = bookmarkNameInput.value.trim();
    const url = bookmarkUrlInput.value.trim();

    if (!name || !url) {
        alert("Please enter both name and URL.");
        return;
    } else {
        if (!url.startsWith("https://") && !url.startsWith("http://")) {
            alert("Please Enter a Valid URL LINK");
            return;
        }
        bookmarkNameInput.value = "";
        bookmarkUrlInput.value = "";
        addBookMark(name, url);
        saveBookmark(name, url);
     }
});

function addBookMark (name, url) {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = url;
    link.textContent = name;
    link.target = "_blank";

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "REMOVE";

    removeBtn.addEventListener('click', function () {
        bookmarkList.removeChild(li);
        removeBookmarkFromStorage(name, url);
    });

    li.appendChild(link);
    li.appendChild(removeBtn);

    bookmarkList.appendChild(li);
}

function getBookmarkFromStorage () {
    const bookmarks = localStorage.getItem("book-marks");
    return bookmarks ? JSON.parse(bookmarks) : [];
}

function saveBookmark (name, url) {
    const bookmarks = getBookmarkFromStorage();
    bookmarks.push({name, url});

    localStorage.setItem("book-marks", JSON.stringify(bookmarks));
}

function loadBookmarks () {
    const bookmarks = getBookmarkFromStorage();
    bookmarks.forEach((bookmark) => addBookMark(bookmark.name, bookmark.url));
}

function removeBookmarkFromStorage (name, url) {
    let bookmark = getBookmarkFromStorage();

    bookmark = bookmark.filter((bookmark) => bookmark.name !== name || bookmark.url !== url)
    localStorage.setItem("book-marks", JSON.stringify(bookmark));
}