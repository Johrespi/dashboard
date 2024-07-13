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
    selectedVariable: keyof WeatherData;
}

export default function WeatherChart({ weatherData, selectedVariable }: WeatherChartProps) {
    const options = {
        title: `${selectedVariable.charAt(0).toUpperCase() + selectedVariable.slice(1)} vs Hora`,
        curveType: "function",
        legend: { position: "right" },
    };

    const data = [
        ["Hora", selectedVariable.charAt(0).toUpperCase() + selectedVariable.slice(1)],
        ...weatherData.map((item: WeatherData) => [
            item.time,
            item[selectedVariable]
        ])
    ];

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
    );
}

