const url = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f00c38e0279b7bc85480c3fe775d518c';

$(document).ready(function () {
	weatherFn('Noida'); // Default city on load
});

async function weatherFn(cName) {
	const tempUrl = `${url}?q=${cName}&appid=${apiKey}&units=metric`;

	try {
		const res = await fetch(tempUrl);
		const data = await res.json();

		if (res.ok) {
			weatherShowFn(data);
		} else {
			showError("City not found. Please try again.");
		}
	} catch (error) {
		console.error('Error fetching weather data:', error);
		showError("Something went wrong. Try again later.");
	}
}

function weatherShowFn(data) {
	const sunriseTime = moment.unix(data.sys.sunrise).format("h:mm A");
	const sunsetTime = moment.unix(data.sys.sunset).format("h:mm A");

	$('#city-name').text(`${data.name}, ${data.sys.country}`);
	$('#date').text(moment().format('MMMM Do YYYY, h:mm:ss a'));
	$('#temperature').html(`${Math.round(data.main.temp)}°C`);
	$('#description').text(data.weather[0].description);
	$('#wind-speed').html(`<span>Wind:</span> ${data.wind.speed} m/s`);
	$('#feels-like').html(`<span>Feels Like:</span> ${Math.round(data.main.feels_like)}°C`);
	$('#humidity').html(`<span>Humidity:</span> ${data.main.humidity}%`);
	$('#temp-range').html(`<span>Min/Max:</span> ${data.main.temp_min}°C / ${data.main.temp_max}°C`);
	$('#sunrise').html(`<span>Sunrise:</span> ${sunriseTime}`);
	$('#sunset').html(`<span>Sunset:</span> ${sunsetTime}`);
	$('#weather-icon').attr(
		'src',
		`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
	);
	$('#weather-info').fadeIn();
}

function showError(msg) {
	$('#weather-info').hide();
	alert(msg);
}
