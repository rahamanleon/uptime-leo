document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("addUrlButton").addEventListener("click", addURL);
});

function addURL() {
    var urlInput = document.getElementById("urlInput");
    var url = urlInput.value.trim();
    if (url === "") {
        alert("Please enter a valid URL.");
        return;
    }

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

    // Clear input field
    urlInput.value = "";

    // Add event listener to link for checking URL status
    link.addEventListener("click", function() {
        checkURLStatus(url, statusSpan);
    });

    // Check URL status when added
    checkURLStatus(url, statusSpan);
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
