// https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=94efcdd86dca01d07bbf7e34431dc607
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

interface Config {
    title?: String;
    subtitle?: String;
    value: Number;
}

export default function Indicator(config: Config) {
    return (
        <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'skyblue',
              opacity: 0.9, 
              background: 'linear-gradient(to right, skyblue, white)',
            }}
          >
            <Typography component="h2" variant="h6" color="black" gutterBottom>
                {config.title} 
            </Typography>
            <Typography component="p" variant="h4">
                {config.value.toString()}
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                {config.subtitle}
            </Typography>
        </Paper> 
    )
}