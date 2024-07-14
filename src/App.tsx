import { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import './App.css';
import Indicator from './components/Indicator';
import BasicTable from './components/BasicTable';
import WeatherChart from './components/WeatherChart';
import Summary from './components/Summary';
import ControlPanel from './components/ControlPanel';
import sun from '../src/assets/sun.png';
import cloudy from '../src/assets/cloudy.png';
import overcast from '../src/assets/overcast.png';
import temperature from '../src/assets/high-temperature.png';

interface WeatherData {
    time: string;
    precipitation: number;
    humidity: number;
    cloudiness: number;
}

interface SummaryData {
    temperature: number;
    feelsLike: number;
    pressure: number;
    cloudiness: number;
}


function App() {
    const [summaryData, setSummaryData] = useState<SummaryData>({
        temperature: 0,
        feelsLike: 0,
        pressure: 0,
        cloudiness: 0,
    });
    const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
    const [selectedVariable, setSelectedVariable] = useState<keyof WeatherData>('precipitation');

    const [indicators, setIndicators] = useState<JSX.Element[]>([]);
    const [dataTable, setDataTable] = useState<{ dateTime: string; windDirection: string }[]>([]);

    useEffect(() => {
        (async () => {
            let savedTextXML = localStorage.getItem("openWeatherMap")
            let expiringTime = localStorage.getItem("expiringTime")

            let hours = 1
            let delay = hours * 3600000
            let nowTime = (new Date()).getTime();

            if (expiringTime === null || nowTime > parseInt(expiringTime)) {
                let API_KEY = "94efcdd86dca01d07bbf7e34431dc607"
                let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`);
                savedTextXML = await response.text();

                localStorage.setItem("openWeatherMap", savedTextXML)
                localStorage.setItem("expiringTime", (nowTime + delay).toString())
            }

            if (savedTextXML != null) {
                const parser = new DOMParser();
                const xml = parser.parseFromString(savedTextXML, "application/xml");

                const dataToIndicators: any[] = [];
                let city = xml.getElementsByTagName("name")[0].innerHTML;
                dataToIndicators.push(["City", "", city]);

                let location = xml.getElementsByTagName("location")[1];
                let geobaseid = location.getAttribute("geobaseid");
                dataToIndicators.push(["Location GeoBase", "", geobaseid]);

                let latitude = location.getAttribute("latitude");
                dataToIndicators.push(["Latitude", "", latitude]);

                let longitude = location.getAttribute("longitude");
                dataToIndicators.push(["Longitude", "", longitude]);

                let indicatorsElements = dataToIndicators.map(
                    (element) => <Indicator title={element[0]} subtitle={element[1]} value={element[2]} />
                );

                setIndicators(indicatorsElements);

                const weatherDataArray: WeatherData[] = [];
                const summaryDataArray: SummaryData[] = [];

                Array.from(xml.getElementsByTagName("time")).forEach((timeElement, index) => {
                    let fromAttribute = timeElement.getAttribute("from");
                    let toAttribute = timeElement.getAttribute("to");

                    let dateTime =
                        (fromAttribute ? fromAttribute.split("T")[1] : "") +
                        " - " +
                        (toAttribute ? toAttribute.split("T")[1] : "");

                    let precipitation = parseFloat(timeElement.getElementsByTagName("precipitation")[0].getAttribute("probability") || "0");
                    let humidity = parseFloat(timeElement.getElementsByTagName("humidity")[0].getAttribute("value") || "0");
                    let cloudiness = parseFloat(timeElement.getElementsByTagName("clouds")[0].getAttribute("all") || "0");

                    weatherDataArray.push({
                        time: dateTime,
                        precipitation: precipitation,
                        humidity: humidity,
                        cloudiness: cloudiness
                    });

                    if (index === 0) {
                        let temperature = parseFloat(timeElement.getElementsByTagName("temperature")[0].getAttribute("value") || "0") - 273.15;
                        let feelsLike = parseFloat(timeElement.getElementsByTagName("feels_like")[0].getAttribute("value") || "0") - 273.15;
                        let pressure = parseFloat(timeElement.getElementsByTagName("pressure")[0].getAttribute("value") || "0");
                        let cloudinessValue = parseFloat(timeElement.getElementsByTagName("clouds")[0].getAttribute("all") || "0");

                        summaryDataArray.push({
                            temperature: temperature,
                            feelsLike: feelsLike,
                            pressure: pressure,
                            cloudiness: cloudinessValue
                        });
                    }
                });

                setWeatherData(weatherDataArray);
                setSummaryData(summaryDataArray[0]);

                let dataToShow = Array.from(xml.getElementsByTagName("time")).map((timeElement) => {
                    let fromAttribute = timeElement.getAttribute("from");
                    let toAttribute = timeElement.getAttribute("to");

                    let dateTime =
                        (fromAttribute ? fromAttribute.split("T")[1] : "") +
                        " - " +
                        (toAttribute ? toAttribute.split("T")[1] : "");

                    let windDirection = timeElement.getElementsByTagName("windDirection")[0].getAttribute("deg") + " " + timeElement.getElementsByTagName("windDirection")[0].getAttribute("code");

                    return { "dateTime": dateTime, "windDirection": windDirection }
                });

                dataToShow = dataToShow.slice(0, 10);
                setDataTable(dataToShow);
            }
        })()
    }, []);

    const selectImage = (cloudiness: number, temperature:number) => {
        if (cloudiness > 50) {
            return overcast;
        } else if (cloudiness >= 20 && temperature < 25) {
            return cloudy;
        } else {
            return sun;
        }
    }

    return (
        <div className='main'>
            <Grid container spacing={5}>
                <Grid xs={6} lg={12}>
                    {indicators[0]}
                </Grid>
                <Grid xs={6} lg={4} padding={4}>
                    {indicators[1]}
                </Grid>
                <Grid xs={6} lg={4} padding={4}>
                    {indicators[2]}
                </Grid>
                <Grid xs={6} lg={4} padding={4}>
                    {indicators[3]}
                </Grid>

                <Grid xs={6} lg={4}>
                    <Summary
                        title="Temperatura y Nubosidad"
                        value1={`${summaryData.temperature.toFixed(2)} °C`}
                        label1="Temperatura"
                        value2={`${summaryData.cloudiness.toFixed(2)} %`}
                        label2="Nubosidad"
                        image={selectImage(summaryData.cloudiness, summaryData.temperature)} // Elige la imagen según la nubosidad
                    />
                </Grid>
                <Grid xs={6} lg={4}>
                    <Summary
                        title="Sensación Térmica y Presión"
                        value1={`${summaryData.feelsLike.toFixed(2)} °C`}
                        label1="Sensación Térmica"
                        value2={`${summaryData.pressure.toFixed(2)} hPa`}
                        label2="Presión"
                        image={temperature} // Imagen para la sensación térmica
                    />
                </Grid>
				<Grid xs={4}>
                    <BasicTable input={dataTable} />
                </Grid>
                <Grid xs={6} lg={4}>
                    <ControlPanel
                        selectedVariable={selectedVariable}
                        setSelectedVariable={setSelectedVariable}
                    />
                </Grid>
                <Grid xs={8}>
                    <WeatherChart
                        weatherData={weatherData}
                        selectedVariable={selectedVariable}
                    />
                </Grid>

            </Grid>
        </div>
    )
}

export default App;
