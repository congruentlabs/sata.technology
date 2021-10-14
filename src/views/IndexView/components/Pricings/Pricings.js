import React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

const Pricing = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <Box>
      <Box marginBottom={4}>
        <Typography
          variant="h4"
          align={'center'}
          data-aos={'fade-up'}
          gutterBottom
          sx={{
            fontWeight: 700,
            marginTop: theme.spacing(1),
          }}
        >
          Pricing
        </Typography>
        <Typography
          variant="h6"
          align={'center'}
          color={'text.secondary'}
          data-aos={'fade-up'}
        >
          Start for free, only add on what you need.
        </Typography>
      </Box>
      <Grid container spacing={isMd ? 1 : 2}>
        <Grid item xs={12} md={6}>
          <Card data-aos={isMd ? 'fade-right' : 'fade-up'}>
            <CardContent sx={{ padding: { sm: 4 } }}>
              <Box marginBottom={4}>
                <Typography variant={'h4'} color="text.secondary" align={'center'}>
                  Signata Standard
                </Typography>
                <Typography
                  fontWeight={600}
                  variant={'h3'}
                  align={'center'}
                  gutterBottom
                >
                  $0
                </Typography>
              </Box>
              <Grid container spacing={1}>
                {[
                  'Unlimited Identities',
                  'Unlimited Wallets',
                  'Unlimited Devices',
                  'Unlimited Secure Notes',
                ].map((item, i) => (
                  <Grid item xs={12} sm={6} key={i}>
                    <Box
                      component={ListItem}
                      disableGutters
                      width={'auto'}
                      padding={0}
                    >
                      <Box
                        component={ListItemAvatar}
                        minWidth={'auto !important'}
                        marginRight={2}
                      >
                        <Box
                          component={Avatar}
                          bgcolor={theme.palette.secondary.main}
                          width={20}
                          height={20}
                        >
                          <svg
                            width={12}
                            height={12}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </Box>
                      </Box>
                      <ListItemText primary={item} />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: 'center' }}>
              <Button
                size={'large'}
                href="/app"
              >
                Open the Free App
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card data-aos={isMd ? 'fade-right' : 'fade-up'}>
            <CardContent sx={{ padding: { sm: 4 } }}>
              <Box marginBottom={4}>
                <Typography variant={'h4'} color="text.secondary" align={'center'}>
                  Cloud Backup
                </Typography>
                <Typography
                  fontWeight={600}
                  variant={'h3'}
                  align={'center'}
                  gutterBottom
                >
                  20 SATA / YEAR
                </Typography>
              </Box>
              <Grid container spacing={1}>
                {[
                  'Everything in Standard',
                  'Encrypted Data Backup',
                  'Zero-Knowledge Storage',
                  'Enhanced Support',
                ].map((item, i) => (
                  <Grid item xs={12} sm={6} key={i}>
                    <Box
                      component={ListItem}
                      disableGutters
                      width={'auto'}
                      padding={0}
                    >
                      <Box
                        component={ListItemAvatar}
                        minWidth={'auto !important'}
                        marginRight={2}
                      >
                        <Box
                          component={Avatar}
                          bgcolor={theme.palette.primary.main}
                          width={20}
                          height={20}
                        >
                          <svg
                            width={12}
                            height={12}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </Box>
                      </Box>
                      <ListItemText primary={item} />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: 'center' }}>
              <Button
                size={'large'}
                href="/app"
              >
                Purchase in the App
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Pricing;
