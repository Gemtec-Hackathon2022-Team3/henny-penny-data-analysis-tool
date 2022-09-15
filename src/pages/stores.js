import Head from 'next/head';
import { Box, Container, Grid, Pagination } from '@mui/material';
// import { stores } from '../__mocks__/stores';
import { StoreListToolbar } from '../components/store/store-list-toolbar';
import { StoreCard } from '../components/store/store-card';
import { DashboardLayout } from '../components/dashboard-layout';
import { useState, useEffect } from 'react';

const Stores = () => { 
  const [stores, setStores] = useState([]);
  // db.select("*")
  //   .from("location")
  //   .then((location) => {
  //     if (location.length) {
  //       // res.json(location[0])
  //       console.log("location: ", location);
  //     } else {
  //       res.status(400).json("Not found");
  //     }
  //   })
  //   .catch((err) => res.status(400).json("error getting user"));

  useEffect(() => {
    fetch('/api/load_data')
    .then(response => response.json())
    .then(result => {
      console.log('stores: ', result);
    })
    // .catch((error) => {
    //   // reject(error);
    //   console.log('error: ', error);
    // });
  }, []);
  
  return (

<>
    <Head>
      <title>
        Stores
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <StoreListToolbar />
        <Box sx={{ pt: 3 }}>
          <Grid
            container
            spacing={3}
          >
            {stores.map((store) => (
              <Grid
                item
                key={store.id}
                lg={4}
                md={6}
                xs={12}
              >
                <StoreCard store={store} />
              </Grid>
            ))}
          </Grid>
        </Box>
        {/* <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 3
          }}
        >
          <Pagination
            color="primary"
            count={3}
            size="small"
          />
        </Box> */}
      </Container>
    </Box>
  </>
)};

Stores.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Stores;
