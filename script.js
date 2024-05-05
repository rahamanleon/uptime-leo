document.addEventListener("DOMContentLoaded", function() {
    // Load saved URLs from local storage
    var savedURLs = JSON.parse(localStorage.getItem("savedURLs")) || [];
    savedURLs.forEach(url => {
        addURLToList(url);
    });

    document.getElementById("addUrlButton").addEventListener("click", addURL);

    // Check URL status every 30 seconds
    setInterval(checkAllURLs, 30000);
});

function addURL() {
    var urlInput = document.getElementById("urlInput");
    var url = urlInput.value.trim();
    if (url === "") {
        alert("Please enter a valid URL.");
        return;
    }

    // Add URL to list
    addURLToList(url);

    // Save URL to local storage
    saveURL(url);

    // Clear input field
    urlInput.value = "";
}

function addURLToList(url) {
    // Create new list item
    var listItem = document.createElement("li");

    // Create link element
    var link = document.createElement("a");
    link.href = "#";
    link.textContent = url;
    listItem.appendChild(link);

    // Create status span
    var statusSpan = document.createElement("span");
    statusSpan.className = "status";
    listItem.appendChild(statusSpan);

    // Append list item to URL list
    document.getElementById("urlList").appendChild(listItem);

    // Check URL status when added
    checkURLStatus(url, statusSpan);
}

function saveURL(url) {
    // Get saved URLs from local storage
    var savedURLs = JSON.parse(localStorage.getItem("savedURLs")) || [];
    
    // Add new URL to saved URLs
    savedURLs.push(url);

    // Save updated URLs to local storage
    localStorage.setItem("savedURLs", JSON.stringify(savedURLs));
}

function checkAllURLs() {
    var listItems = document.querySelectorAll("#urlList li");
    listItems.forEach(function(listItem) {
        var link = listItem.querySelector("a");
        var statusSpan = listItem.querySelector(".status");
        var url = link.textContent;
        checkURLStatus(url, statusSpan);
    });
}

function checkURLStatus(url, statusSpan) {
    fetch(url)
    .then(response => {
        if (response.ok) {
            statusSpan.textContent = "Alive";
            statusSpan.className = "status alive";
        } else {
            statusSpan.textContent = "Down";
            statusSpan.className = "status down";
        }
    })
    .catch(error => {
        statusSpan.textContent = "Error";
        statusSpan.className = "status error";
        console.log('Error checking URL:', error);
    });
}
