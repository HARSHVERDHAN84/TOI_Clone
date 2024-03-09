const cities = ["Delhi", "Mumbai", "Pune", "Surat", "Bangalore"];
const API_KEY = "12d4ea7c65f04fff9555d060f0e84631";//news api key
const url = "https://newsapi.org/v2/everything?q="; //news url
const weatherApiKey = "a51f2d9584c7373332f5d5669276c089";
const query = "India";

window.addEventListener('load', () => {
    
    fetchNews("India"); //  news for India
    getWeatherForDelhi(); // delhi weather
});

async function getWeatherForDelhi() {
    const city = "Delhi"; // Set the city to Delhi
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const temperature = data.main.temp;
        const weatherInfo = document.getElementById("weatherInfo");
        weatherInfo.textContent = `${city}: ${temperature}°C`;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

async function fetchNews(query) {
    try {
        const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
        const data = await res.json();
        displayNews(data.articles);

    } catch (error) {
        console.error('Error fetching news:', error);
    }
}

function displayNews(articles) {
    const gridLayout = document.getElementById('gridLayout');
    const middleContent = document.getElementById('middleContent');
    
    gridLayout.innerHTML = '';
    middleContent.innerHTML = '';

    articles.forEach(article => {
        if (!article.urlToImage) return;

        const template = document.getElementById('template-news-card');
        const clone = template.content.cloneNode(true);

        clone.querySelector('#news-img').src = article.urlToImage;
        clone.querySelector('#news-title').textContent =truncateText(article.title, 90);
        clone.querySelector('.card').addEventListener('click', () => {
            window.location.href = article.url; // Redirect to the article URL
        });

        gridLayout.appendChild(clone);
    });

     articles.forEach(article =>{
        if (!article.urlToImage) return;
        const template =  document.getElementById('middleContent-template');
        const clone = template.content.cloneNode(true);
        clone.querySelector('#middleContentImg').src = article.urlToImage;
        clone.querySelector('#middleContentText').textContent = truncateText(article.title, 100);

        clone.querySelector('#middleContentBlock').addEventListener('click', () =>{
            window.location.href =article.url;
        })

        middleContent.appendChild(clone);
        
     });
}

function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
        return text;
    } else {
        return text.slice(0, maxLength) + '...';
    }
}

function search() {
    const searchValue = document.getElementById('searchInput').value.trim();
    if (searchValue === '') {
        alert('Please enter a search term.');
        return;
    }
    fetchNews(searchValue);
}

document.addEventListener("DOMContentLoaded", async function () {
    const container = document.querySelector('.carousel-container');

    try {
        const response = await fetch(`${url}${query}&apiKey=${API_KEY}`);
        const data = await response.json();
        console.log(data);

        const articles = data.articles;
        console.log(articles);

        
        articles.forEach(article => {
            if (!article.urlToImage) return;
            const template = document.getElementById('carousel-item-template');
            const clone = template.content.cloneNode(true);

            const img = clone.querySelector('.carousel-img');
            const title = clone.querySelector('.bottom-left');

            img.src = article.urlToImage;
            img.alt = article.title;

            title.textContent = article.title;

            clone.querySelector('.carousel-item').addEventListener('click', () => {
                window.location.href = article.url; // Redirect to the article URL
            });

            container.appendChild(clone.querySelector('.carousel-item')); 
        });

        // Start carousel after all items are appended
        Carousel();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

function Carousel() {
    const container = document.querySelector('.carousel-container');
    const items = container.querySelectorAll('.carousel-item');
    const itemCount = items.length;
    let currIndex = 0;
    const intervalTime = 10000; 

    // Show the first item
    items[currIndex].classList.remove('hidden');

    function showItem(index) {
        // Show the item at the specified index
        items[index].classList.remove('hidden');
        // Hide the previouslly display item
        items[currIndex].classList.add('hidden');
        // Update the current index
        currIndex = index;
    }

    function nextSlide() {
        // Cal the index of the next item
        const nextIndex = (currIndex + 1) % itemCount;
        // Show the next item
        showItem(nextIndex);
    }

    

    // Set interval for automatic sliding after 10 sec
    setInterval(nextSlide, intervalTime);
}



