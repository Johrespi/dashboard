// https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=94efcdd86dca01d07bbf7e34431dc607
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Image from '../assets/bandera.png';

interface Config {
    title?: String;
    subtitle?: String;
    value: Number;
}

export default function Indicator(config: Config) {
    return (
        <Paper
            sx={{
              p: 1,
              display: 'flex',
              flexDirection: 'column',

              opacity: 0.9, 
              backgroundColor: 'transparent',
              backgroundImage: `url(${Image})`,

              backgroundSize: '100px 85px', // Ajusta el tamaño de la imagen de fondo (ancho x alto)
              backgroundPosition: 'center', // Ajusta la posición de la imagen
              borderRadius: 100,
            }}
          >
            <Typography component="h2" variant="h1" color="black" gutterBottom sx={{ fontWeight: 'bold', fontFamily: 'Open Sans', fontSize: '24px'}}>
                {config.title} 
            </Typography>
            <Typography component="p" variant="h6"  sx={{ fontWeight: 'bold', fontFamily: 'Open Sans', fontSize: '30px'}}>
                {config.value.toString()}
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                {config.subtitle}
            </Typography>
        </Paper> 
    )
}