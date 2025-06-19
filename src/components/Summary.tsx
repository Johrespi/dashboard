import React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';


interface SummaryProps {
    title: string;
    value1: string;
    label1: string;
    value2: string;
    label2: string;
    image: string;
}

const Summary: React.FC<SummaryProps> = ({ title, value1, label1, value2, label2, image }) => {
    return (
        <Card sx={{ maxWidth: 345, background: 'linear-gradient(to right, #74ABDB, skyblue)', marginLeft: 15, borderRadius: 10}}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="380"
                    image={image}
                    alt={title}
                />
                <CardContent>
                    <Typography gutterBottom component="h2" variant="h6" color="primary">
                        {title}
                    </Typography>
                    <Typography component="p" variant="h4">
                        {value1}
                    </Typography>
                    <Typography color="text.secondary" sx={{ flex: 1 }}>
                        {label1}
                    </Typography>
                    <Typography component="p" variant="h4">
                        {value2}
                    </Typography>
                    <Typography color="text.secondary" sx={{ flex: 1 }}>
                        {label2}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default Summary;