/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';

const OpenSource = () => {
  return (
    <Box>
      <Box marginBottom={2}>
        <Typography variant={'h4'} sx={{ fontWeight: 700 }} align={'center'}>
          Open Source Software for the transparency the world needs.
        </Typography>
        <Typography
          variant="h6"
          component="p"
          color="text.secondary"
          align={'center'}
        >
          Our identities and online privacy are under attack. Join the Open Source identity revolution.
        </Typography>
        <Box marginTop={2} display={'flex'} justifyContent={'center'}>
          <Button
            color={'primary'}
            variant={'contained'}
            size={'large'}
            startIcon={<GitHubIcon />}
          >
            Check out our Github
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default OpenSource;
