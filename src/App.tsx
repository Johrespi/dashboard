import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import './App.css'
import Indicator from './components/Indicator';
import Summary from './components/Summary';
import BasicTable from './components/BasicTable';
import { Typography } from '@mui/material';
import WeatherChart from './components/WeatherChart';
import ControlPanel from './components/ControlPanel';


function App() {
	return (


		<Grid container spacing={5}>
			<Grid xs={12} md={4} lg={12}>
				<Typography variant="h4" component="h1" gutterBottom>
					<strong>Guayaquil Weather</strong>
				</Typography>
			</Grid>

			<Grid xs={12} md={4} lg={12}>
				<Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
			</Grid>
			<Grid xs={12} md={4} lg={12}>
				<Summary />
			</Grid>
			<Grid xs={12} md={6} lg={12} >
				<BasicTable />
			</Grid>
			<Grid xs={12} lg={2}>
				<ControlPanel />
			</Grid>
			<Grid xs={12} lg={10}>
				<WeatherChart></WeatherChart>
			</Grid>
		</Grid>

	);
}

export default App
