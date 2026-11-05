
// Initial destinations
let destinations = [
    { city: "Paris", budget: 300, category: "City" },
    { city: "Rome", budget: 250, category: "City" },
    { city: "Maldives", budget: 800, category: "Beach" }
];

// Attractions for each city
let cityPlaces = {
    Paris: ["Eiffel Tower", "Louvre Museum", "Notre-Dame Cathedral"],
    Rome: ["Colosseum", "Trevi Fountain", "Pantheon"],
    Maldives: ["Maafushi Island", "Banana Reef", "Vaadhoo Island"]
};

// Comments for each city
let cityComments = {
    Paris: [],
    Rome: [],
    Maldives: []
};

let selectedCity = "";


// Show destinations and apply filters
function showDestinations() {
    let list = document.getElementById("destinationList");
    let category = document.getElementById("filterCategory").value;
    let budget = document.getElementById("filterBudget").value;

    list.innerHTML = "";

    let filtered = destinations.filter(function(destination) {
        let categoryMatch = category === "All" || destination.category === category;
        let budgetMatch = budget === "" || destination.budget <= Number(budget);

        return categoryMatch && budgetMatch;
    });

    filtered.forEach(function(destination) {
        list.innerHTML += "<li>" + destination.city +
            " - Budget: " + destination.budget +
            " - Category: " + destination.category + "</li>";
    });

    document.getElementById("count").innerText =
        "Number of destinations: " + filtered.length;
}


// Add a new destination
function addDestination() {
    let city = document.getElementById("city").value.trim();
    let budget = Number(document.getElementById("budget").value);
    let category = document.getElementById("category").value;

    if (city === "" || budget <= 0) {
        alert("Please enter a city and a valid budget!");
        return;
    }

    let exists = destinations.some(function(destination) {
        return destination.city.toLowerCase() === city.toLowerCase();
    });

    if (exists) {
        alert("This city already exists!");
        return;
    }

    destinations.push({
        city: city,
        budget: budget,
        category: category
    });

    cityPlaces[city] = [];
    cityComments[city] = [];

    document.getElementById("city").value = "";
    document.getElementById("budget").value = "";

    showDestinations();
    showGallery();
    showCityButtons();

    alert("Destination added!");
}


// Show all destinations in the gallery
function showGallery() {
    let gallery = document.getElementById("galleryList");

    gallery.innerHTML = "";

    destinations.forEach(function(destination) {
        let city = destination.city;

        let card = document.createElement("div");
        card.className = "gallery-card";

        let title = document.createElement("h3");
        title.innerText = city;

        let image = document.createElement("img");
        image.src = "https://placehold.co/250x150?text=" + encodeURIComponent(city);
        image.alt = city;

        let likeButton = document.createElement("button");
        likeButton.innerText = "Like";

        let likeCount = document.createElement("span");
        likeCount.innerText = " 0";

        let dislikeButton = document.createElement("button");
        dislikeButton.innerText = "Dislike";

        let dislikeCount = document.createElement("span");
        dislikeCount.innerText = " 0";

        likeButton.onclick = function() {
            likeCount.innerText = " " + (Number(likeCount.innerText) + 1);
        };

        dislikeButton.onclick = function() {
            dislikeCount.innerText = " " + (Number(dislikeCount.innerText) + 1);
        };

        card.appendChild(title);
        card.appendChild(image);
        card.appendChild(document.createElement("br"));
        card.appendChild(likeButton);
        card.appendChild(likeCount);
        card.appendChild(dislikeButton);
        card.appendChild(dislikeCount);

        gallery.appendChild(card);
    });
}


// Show buttons for all cities in the blog
function showCityButtons() {
    let buttons = document.getElementById("cityButtons");

    buttons.innerHTML = "";

    destinations.forEach(function(destination) {
        let button = document.createElement("button");

        button.innerText = destination.city;

        button.onclick = function() {
            showCity(destination.city);
        };

        buttons.appendChild(button);
    });
}


// Show attractions and comments for the selected city
function showCity(city) {
    selectedCity = city;

    document.getElementById("cityName").innerText =
        "Top 10 places in " + city;

    let places = document.getElementById("places");
    places.innerHTML = "";

    cityPlaces[city].forEach(function(place) {
        let item = document.createElement("li");
        item.innerText = place;
        places.appendChild(item);
    });

    showComments();
}


// Add an attraction to the selected city
function addPlace() {
    let place = document.getElementById("newPlace").value.trim();

    if (selectedCity === "") {
        alert("Please select a city first!");
        return;
    }

    if (place === "") {
        alert("Please enter a place!");
        return;
    }

    if (cityPlaces[selectedCity].length >= 10) {
        alert("You can only add 10 places!");
        return;
    }

    cityPlaces[selectedCity].push(place);

    document.getElementById("newPlace").value = "";

    showCity(selectedCity);
}


// Show comments for the selected city
function showComments() {
    let comments = document.getElementById("comments");

    comments.innerHTML = "";

    cityComments[selectedCity].forEach(function(comment) {
        comments.innerHTML +=
            "<div class='comment'><strong>" +
            comment.name + "</strong>: " + comment.text + "</div>";
    });
}


// Add a comment
function addComment() {
    if (selectedCity === "") {
        alert("Please select a city first!");
        return;
    }

    let name = document.getElementById("visitor").value.trim();
    let comment = document.getElementById("commentText").value.trim();

    if (name === "" || comment === "") {
        alert("Please enter your name and comment!");
        return;
    }

    cityComments[selectedCity].push({
        name: name,
        text: comment
    });

    document.getElementById("visitor").value = "";
    document.getElementById("commentText").value = "";

    showComments();
}


// Submit the survey
function submitSurvey() {
    let name = document.getElementById("visitorName").value;
    let opinion = document.querySelector('input[name="opinion"]:checked');
    let comments = document.getElementById("surveyComments");
    if (name.trim() === "" || opinion === null) {
        alert("Please enter your name and select an answer!");
        return;
    }

    alert("Thank you for completing the survey, " + name + "!");

    document.getElementById("visitorName").value = "";
    opinion.checked = false;
    comments.value = "";
}


// Display everything when the page loads
showDestinations();
showGallery();
showCityButtons();
