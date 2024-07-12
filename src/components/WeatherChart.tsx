import { Chart } from "react-google-charts";
import Paper from '@mui/material/Paper';

interface WeatherData {
    time: string;
    precipitation: number;
    humidity: number;
    cloudiness: number;
}

interface WeatherChartProps {
    weatherData: WeatherData[];
}

export default function WeatherChart( { weatherData }: WeatherChartProps ) {

    {/* Configuración */}

    let options = {
        title: "Precipitación, Humedad y Nubosidad vs Hora",
        curveType: "function",
        legend: { position: "right" },
        
    }

    {/* Datos de las variables meteorológicas */}

    const data = [
        ["Hora", "Precipitación", "Humedad", "Nubosidad"],
        ...weatherData.map((item: WeatherData) => [
            item.time,
            item.precipitation,
            item.humidity,
            item.cloudiness
        ])
    ];

    {/* JSX */}

    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                background: 'linear-gradient(to right, #74ABDB, skyblue)',
                borderRadius: 5
            }}
        >
            <Chart
                chartType="LineChart"
                data={data}
                width="100%"
                height="400px"
                options={options}
                legendToggle
                
        />
        </Paper>
    )
}	