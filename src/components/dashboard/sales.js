import { Bar } from 'react-chartjs-2';
import { Box, Button, Card, CardContent, CardHeader, Divider, Typography, useTheme } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export const Sales = (props) => {
  const theme = useTheme();
  
  const { id } = useRouter().query;

  const [dataLoaded, setDataLoaded] = useState(false);  
  
  const [filterTimesData, setFilterTimeData] = useState({
    modelNumber: [],
    serialNumStrings: [],
    filterTimeAverages: [],
    mostRecentData: [[]],
    filterTypes: []
  });

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
      fetch("/api/filterTimes").then(res => res.json()).then(data => {
        console.log(data);
        setFilterTimeData(data);
      });
    }
  }, [dataLoaded]);

  const data = {
    datasets: [
      {
        backgroundColor: '#000000',
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: filterTimesData.mostRecentData[0],
        label: filterTimesData.serialNumStrings[0],
        maxBarThickness: 10
      },
      {
        backgroundColor: '#000000',
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: filterTimesData.mostRecentData[1],
        label: filterTimesData.serialNumStrings[1],
        maxBarThickness: 10
      },
      {
        backgroundColor: '#000000',
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: filterTimesData.mostRecentData[2],
        label: filterTimesData.serialNumStrings[2],
        maxBarThickness: 10
      },
      {
        backgroundColor: '#000000',
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: filterTimesData.mostRecentData[3],
        label: filterTimesData.serialNumStrings[3],
        maxBarThickness: 10
      },
      {
        backgroundColor: '#000000',
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: filterTimesData.mostRecentData[4],
        label: filterTimesData.serialNumStrings[4],
        maxBarThickness: 10
      },
      {
        backgroundColor: '#000000',
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: filterTimesData.mostRecentData[5],
        label: filterTimesData.serialNumStrings[5],
        maxBarThickness: 10
      },
      {
        backgroundColor: '#000000',
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: filterTimesData.mostRecentData[6],
        label: filterTimesData.serialNumStrings[6],
        maxBarThickness: 10
      },
      {
        backgroundColor: '#000000',
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: filterTimesData.mostRecentData[7],
        label: filterTimesData.serialNumStrings[7],
        maxBarThickness: 10
      },
      {
        backgroundColor: '#000000',
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: filterTimesData.mostRecentData[8],
        label: filterTimesData.serialNumStrings[8],
        maxBarThickness: 10
      },
      {
        backgroundColor: '#000000',
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: filterTimesData.mostRecentData[9],
        label: filterTimesData.serialNumStrings[9],
        maxBarThickness: 10
      },
      {
        backgroundColor: '#000000',
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: filterTimesData.mostRecentData[10],
        label: filterTimesData.serialNumStrings[10],
        maxBarThickness: 10
      },
      {
        backgroundColor: '#3F51B5',
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: filterTimesData.mostRecentData[11],
        label: filterTimesData.serialNumStrings[11],
        maxBarThickness: 10
      }
    ],
    labels: ['1', '2', '3', '4', '5', '6', '7']
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    xAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
          beginAtZero: true,
          min: 0
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: theme.palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: theme.palette.divider
        }
      }
    ],
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

  const graphLegend = [
    {
      title: 'PFE500 - Manual Filter',
      color: '#000000'
    },
    {
      title: 'CFE415 - Express Filter',
      color: '#3F51B5'
    },
  ]

  return (
    <Card {...props}>
      <CardHeader
        action={(
          <Button
            endIcon={<ArrowDropDownIcon fontSize="small" />}
            size="small"
          >
            Last 7 instances
          </Button>
        )}
        title="Filter Times"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: 'relative'
          }}
        >
          <Bar
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
          {graphLegend.map(({
            color,
            title
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
                ____
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon fontSize="small" />}
          size="small"
        >
          Overview
        </Button>
      </Box>
    </Card>
  );
};
