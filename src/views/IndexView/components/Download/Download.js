import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LaunchIcon from '@mui/icons-material/Launch';

const Application = () => {
  return (
    <Box>
      <Box marginBottom={4}>
        <Typography
          variant="h4"
          data-aos={'fade-up'}
          gutterBottom
          sx={{
            fontWeight: 700,
          }}
        >
          Get Signata, and join the identity revolution.
        </Typography>
        <Typography variant="h6" color={'text.secondary'} data-aos={'fade-up'}>
          Open the App to start today.
        </Typography>
      </Box>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        flexDirection={{ xs: 'column', sm: 'row' }}
      >
        <Box display="flex" marginTop={{ xs: 2, md: 0 }}>
          <Button
            variant="contained"
            color="primary"
            href="/app"
            size="large"
            startIcon={<LaunchIcon />}
          >
            Open the App
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Application;
