import { useRef } from 'react';
import { Select, MenuItem, SelectChangeEvent, FormControl, Typography, Box, Paper } from '@mui/material';

interface ControlPanelProps {
    selectedVariable: keyof WeatherData;
    setSelectedVariable: (variable: keyof WeatherData) => void;
}

interface WeatherData {
    time: string;
    precipitation: number;
    humidity: number;
    cloudiness: number;
}

export default function ControlPanel({ selectedVariable, setSelectedVariable }: ControlPanelProps) {
    const descriptionRef = useRef<HTMLDivElement>(null);

    const items = [
        { name: "🌧️ Precipitación 🌧️", description: "Cantidad de agua, en forma de lluvia, nieve o granizo, que cae sobre una superficie en un período específico.", value: "precipitation" },
        { name: "💦 Humedad 💦", description: "Cantidad de vapor de agua presente en el aire, generalmente expresada como un porcentaje.", value: "humidity" },
        { name: "☁️ Nubosidad ☁️", description: "Grado de cobertura del cielo por nubes, afectando la visibilidad y la cantidad de luz solar recibida.", value: "cloudiness" }
    ];

    const handleChange = (event: SelectChangeEvent<keyof WeatherData>) => {
        const selectedValue = event.target.value as keyof WeatherData;
        setSelectedVariable(selectedValue);       

        if (descriptionRef.current !== null) {
            const selectedItem = items.find(item => item.value === selectedValue);
            descriptionRef.current.innerHTML = selectedItem ? selectedItem.description : "";
        }
        
    };

    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                background: 'linear-gradient(to right, #74ABDB, skyblue)',
                borderRadius: 10,
                marginTop: 10,
                alignItems: 'center',
                textAlign: 'center',

               
            }}
        >
            <Typography mb={2} component="h3" variant="h6" color="black" sx={{ fontWeight: 'bold' }}>
                Variables Meteorológicas
            </Typography>

            <Box sx={{ minWidth: 120, background: 'white' }}>
                <FormControl fullWidth>
                    <Select
                        labelId="simple-select-label"
                        id="simple-select"
                        value={selectedVariable}
                        onChange={handleChange}
                        MenuProps={{
                            PaperProps: {
                                sx: {
                                    background: 'white',
                                },
                            },
                        }}
                    >
                        <MenuItem value="" disabled>Seleccione una variable</MenuItem>
                        {items.map((item) => (
                            <MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            <Typography ref={descriptionRef} mt={2} component="p" color="black">
                {items.find(item => item.value === selectedVariable)?.description}
            </Typography>
        </Paper>
    );
}