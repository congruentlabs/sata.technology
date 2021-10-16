import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import AppBar from '@mui/material/AppBar';
import Slide from '@mui/material/Slide';

import Container from 'components/Container';
import { Topbar, Footer } from './components';

const HideOnScroll = ({ children }) => {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

HideOnScroll.propTypes = {
  children: PropTypes.node.isRequired,
};

const Main = ({ children }) => {
  const theme = useTheme();

  return (
    <Box>
      <HideOnScroll>
        <AppBar
          position={'fixed'}
          sx={{
            backgroundColor: theme.palette.background.paper,
          }}
          elevation={1}
        >
          <Container paddingY={{ xs: 1, sm: 1.5 }}>
            <Topbar />
          </Container>
        </AppBar>
      </HideOnScroll>
      <main>
        <Box height={{ xs: 58, sm: 66 }} />
        {children}
        <Divider />
      </main>
      <Container paddingY={4}>
        <Footer />
      </Container>
    </Box>
  );
};

Main.propTypes = {
  children: PropTypes.node,
};

export default Main;
