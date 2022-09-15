import { Doughnut } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from '@mui/material';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import PhoneIcon from '@mui/icons-material/Phone';
import TabletIcon from '@mui/icons-material/Tablet';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export const TrafficByDevice = (props) => {
  const theme = useTheme();

  const { id } = useRouter().query;

  const [dataLoaded, setDataLoaded] = useState(false);
  const [podData, setPodData] = useState({
      modelnumber: "",
      serialnumber: "",
      dailycookcount: 0,
      dailycooknotreadycount: 0,
      dailycookslowcount: 0,
      dailyeoctoolongcount: 0,
      dailyeoctoosooncount: 0
    });
  const [goodCooks, setGoodCooks] = useState(0);

  useEffect(() => {
    console.log("Loading Data");
    fetch("/api/load_data").then(res => {
      if (!res.ok) throw new Error(res.status);
      else setDataLoaded(true);
    });
  }, [id]);

  useEffect(() => {
    if (dataLoaded)
    {
      fetch("/api/pod").then(res => res.json()).then(data => {
        setPodData(data[0]);
        console.log(data[0]);
      });
    }
  }, [dataLoaded]);

  useEffect(() => {
    console.log("Computing Good Cooks");
    const badcooks = podData.dailycooknotreadycount + podData.dailycookslowcount + podData.dailyeoctoolongcount + podData.dailyeoctoosooncount;
    setGoodCooks(podData.dailycookcount - badcooks);
  }, [podData]);

  const data = {
    datasets: [
      /*{
        data: [63, 15, 22],
        backgroundColor: ['#3F51B5', '#e53935', '#FB8C00'],
        borderWidth: 8,
        borderColor: '#FFFFFF',
        hoverBorderColor: '#FFFFFF'
      }*/
      {
      data: [goodCooks, podData.dailycooknotreadycount, podData.dailycookslowcount, podData.dailyeoctoolongcount, podData.dailyeoctoosooncount],
      backgroundColor: ['#3F51B5', "#E53935", '#FB8C00', '#34FF33', '#F4FF33'],
      borderWidth: 8,
      borderColor: '#FFFFFF',
      hoverBorderColor: '#FFFFFF'
      }
    ],
    //labels: ['Desktop', 'Tablet', 'Mobile']
    labels: ['Good Cooks', "Cooks Not Ready", "Cook Slow", "EOC Too Long", "EOC Too Soon"]
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  const devices = [
    {
      title: 'Good Cooks',
      value: goodCooks,
      color: '#3F51B5'
    },
    {
      title: 'Cooks Not Ready',
      value: podData.dailycooknotreadycount,
      color: '#E53935'
    },
    {
      title: 'Cook Slow',
      value: podData.dailycookslowcount,
      color: '#FB8C00'
    },
    {
      title: "EOC Too Long",
      value: podData.dailyeoctoolongcount,
      color: "#34FF33"
    },
    {
      title: "EOC Too Soon",
      value: podData.dailyeoctoosooncount,
      color: "#F4FF33"
    }
  ];

  return (
    <Card {...props}>
      <CardHeader title="Cooking Statistics"
        subheader={`Model Number: ${podData.modelnumber}, Serial Number: ${podData.serialnumber}`}
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: 'relative'
          }}
        >
          <Doughnut
            data={data}
            options={options}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          {devices.map(({
            color,
            title,
            value
          }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: 'center'
              }}
            >
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h4"
              >
                {Math.round(100 * (value / podData.dailycookcount))}
                %
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
