import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

import clearSkyImage from '../assets/sun.png';
import cloudyImage from '../assets/cloudy.png';
import overcastImage from '../assets/overcast.png';

interface SummaryData {
  temperature: number;
  feelsLike: number;
  pressure: number;
  cloudiness: number;
}

interface SummaryProps {
  summaryData: SummaryData;
}

const getImage = (cloudiness: number) => {
  if (cloudiness < 20) {
    return clearSkyImage;
  } else if (cloudiness < 80) {
    return cloudyImage;
  } else {
    return overcastImage;
  }
}

export default function Summary({ summaryData }: SummaryProps) {
  const { temperature, feelsLike, pressure, cloudiness } = summaryData;

  return (
    <Card sx={{ maxWidth: 345, backgroundColor: 'white', borderRadius: 10 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="350"
          image={getImage(cloudiness) }
          alt="Weather"
        />
        <CardContent>
          <Typography gutterBottom component="h2" variant="h6" color="primary">
            Resumen del Clima
          </Typography>
          <Typography component="p" variant="h6">
            Temperatura: {temperature.toFixed(2)} °C
          </Typography>
          <Typography component="p" variant="h6">
            Sensación Térmica: {feelsLike.toFixed(2)} °C
          </Typography>
          <Typography component="p" variant="h6">
            Presión: {pressure} hPa
          </Typography>
          <Typography component="p" variant="h6">
            Nubosidad: {cloudiness} %
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}