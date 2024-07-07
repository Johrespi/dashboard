import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import './App.css'
import Indicator from './components/Indicator';
import Summary from './components/Summary';
import BasicTable from './components/BasicTable';
import { Typography } from '@mui/material';
import WeatherChart from './components/WeatherChart';
import ControlPanel from './components/ControlPanel';
import { useEffect, useState } from 'react';
import videoBG from './assets/videoBG.mp4'

// https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=94efcdd86dca01d07bbf7e34431dc607
function App() {

	{/* Variable de estado y función de actualización */ }

	let [indicators, setIndicators] = useState<JSX.Element[]>([])

	let [dataTable, setDataTable] = useState<{ dateTime: string; windDirection: string }[]>([]);

	{/* Hook: useEffect */ }


	useEffect(() => {

		(async () => {


			{/* Del LocalStorage, obtiene el valor de las claves openWeatherMap y expiringTime*/ }

			let savedTextXML = localStorage.getItem("openWeatherMap")
			let expiringTime = localStorage.getItem("expiringTime")

			{/* Diferencia de tiempo */ }
			let hours = 1
			let delay = hours * 3600000

			{/* Estampa de tiempo actual */ }
			let nowTime = (new Date()).getTime();

			{/* Realiza la petición asicrónica cuando: 
             (1) La estampa de tiempo de expiración (expiringTime) es nulo   
             (2) La estampa de tiempo actual es mayor al tiempo de expiración */}

			if (expiringTime === null || nowTime > parseInt(expiringTime)) {


				{/* Request */ }

				let API_KEY = "94efcdd86dca01d07bbf7e34431dc607"
				let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`);
				const savedTextXML = await response.text();

				{/* En el LocalStorage, almacena texto en la clave openWeatherMap y la estampa de tiempo de expiración */ }

				localStorage.setItem("openWeatherMap", savedTextXML)
				localStorage.setItem("expiringTime", (nowTime + delay).toString())

			}


			{/* XML Parser */ }

			if (savedTextXML != null) {

				const parser = new DOMParser();
				const xml = parser.parseFromString(savedTextXML, "application/xml");



				{/* Arreglo con los resultados */ }

				let dataToIndicators = new Array()

				{/* Análisis del XML */ }

				let city = xml.getElementsByTagName("name")[0].innerHTML
				dataToIndicators.push(["City", "name", city])


				let location = xml.getElementsByTagName("location")[1]

				let geobaseid = location.getAttribute("geobaseid")
				dataToIndicators.push(["Location", "geobaseid", geobaseid])

				let latitude = location.getAttribute("latitude")
				dataToIndicators.push(["Location", "Latitude", latitude])

				let longitude = location.getAttribute("longitude")
				dataToIndicators.push(["Location", "Longitude", longitude])

				console.log(dataToIndicators)

				{/* Renderice el arreglo de resultados en un arreglo de elementos Indicator */ }

				let indicatorsElements = Array.from(dataToIndicators).map(
					(element) => <Indicator title={element[0]} subtitle={element[1]} value={element[2]} />
				)

				{/* Actualización de la variable de estado mediante la función de actualización */ }

				setIndicators(indicatorsElements)

				{/* Arreglo con los resultados */ }


				let dataToShow = Array.from(xml.getElementsByTagName("time")).map((timeElement) => {


					let fromAttribute = timeElement.getAttribute("from");
					let toAttribute = timeElement.getAttribute("to");

					let dateTime =
						(fromAttribute ? fromAttribute.split("T")[1] : "") +
						" - " +
						(toAttribute ? toAttribute.split("T")[1] : "");


					let windDirection = timeElement.getElementsByTagName("windDirection")[0].getAttribute("deg") + " " + timeElement.getElementsByTagName("windDirection")[0].getAttribute("code")

					return { "dateTime": dateTime, "windDirection": windDirection }

				})

				dataToShow = dataToShow.slice(0, 10)

				{/* Actualización de la variable de estado mediante la función de actualización */ }

				setDataTable(dataToShow)

			}//


		})()



	}, [])


	return (
		<div className='main'>
			<Grid container spacing={5}>
				{indicators.map((indicator, index) => (
                    <Grid key={index} xs={6} lg={3}>
                        {indicator}
                    </Grid>
                ))}
					<Grid xs={6} lg={12}>
						{indicators[0]}
					</Grid>
					<Grid xs={12} md={4} lg={3}>
						<Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
					</Grid>
					<Grid xs={12} lg={2}>
						<ControlPanel />
					</Grid>
					<Grid xs={12} lg={10}>
						<WeatherChart />
					</Grid>
					<Grid xs={12} lg={12}>
						<BasicTable input={dataTable} />
					</Grid>
				</Grid>
		</div>
	);
}

export default App
