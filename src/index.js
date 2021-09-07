import process from 'process';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const UNITS = 'metric'
const [nodePath, scriptPath, city] = process.argv;
if (!city) {
  console.log('First argument must be city. E.g.: node index.js Hamburg');
  process.exit(1);
}

async function fetchWeatherData() {
  const url = process.env.API_ENDPOINT + `?q=${city}&units=${UNITS}&appid=${process.env.API_KEY}`;
  const response = await axios.get(url);
  return response.data;
}

function logData(data) {
  const template = `It is now ${data.main.temp} in ${data.name}.`;
  console.log(template);
}

fetchWeatherData('Hamburg').then(data => logData(data));