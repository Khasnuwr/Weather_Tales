async function get_weather() {
    var city_name = document.getElementById("city_name").value;
    var url = `https://api.weatherapi.com/v1/current.json?key=054db5df479645c7a7d61956241610&q=${city_name}`;


    // Display the loading spinner
    show_loading_spinner();


    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Create or select a container for the weather card
        let cardContainer = document.getElementById("weather-card");
        if (!cardContainer) {
            cardContainer = document.createElement("div");
            cardContainer.id = "weather-card";
            document.body.appendChild(cardContainer);
        }

        // Clearing any existing contents inside the container div
        cardContainer.innerHTML = "";

        // Populating new weather data into the card container
        cardContainer.innerHTML = `
            <p>City: ${data.location.name}</p>
            <p>Country: ${data.location.country}</p>
            <p>Temperature(C): ${data.current.temp_c}</p>
            <p>Temperature(F): ${data.current.temp_f}</p>
            <img src="https:${data.current.condition.icon}" alt="${data.current.condition.text}" />
            <p>${data.current.condition.text}</p>
        `;
        // initializing link querying rel=icon
        link = document.querySelector("link[rel~='icon']");
        // checking weather link rel=icon existed or not
        if (!link){
        	// if not existed then creat one with rel=icon
        	link = document.createElement("link");
        	link.rel = 'icon';
        	// and append it to the head
        	document.head.appendChild(link);
        }
        // change the `href` to the fetched data
        link.href = `https:${data.current.condition.icon}`;

        document.title = `${data.location.name} | ${data.current.condition.text}`;
    } catch (error) {
        console.error('Error:', error);
        show_error_popup(error.message + ' 😟');
    } finally {
        // hiding the loading spinner when done rendering the data 
        hide_loading_spinner();
    }
}

function show_error_popup(message) {
    let popup = document.getElementById("error-popup");
    if (!popup) {
        popup = document.createElement("div");
        popup.id = "error-popup";
        popup.className = "error-popup";
        document.body.appendChild(popup);
    }

    popup.textContent = message;
    popup.classList.add("show");

    // Automatically hides the popup after 3 seconds
    setTimeout(() => {
        popup.classList.remove("show");
    }, 3000);
}

function show_loading_spinner() {
    let spinner = document.getElementById("loading-spinner");
    if (!spinner) {
        spinner = document.createElement("div");
        spinner.id = "loading-spinner";
        spinner.className = "loading-spinner";
        document.body.appendChild(spinner);
    }
    spinner.style.display = "block";
}

function hide_loading_spinner() {
    const spinner = document.getElementById("loading-spinner");
    if (spinner) {
        spinner.style.display = "none";
    }
}
