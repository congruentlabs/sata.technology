import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { Link } from '@mui/material';

const mock = [
  {
    name: 'Timothy Quinn',
    title: 'Co-Founder & Product Manager',
    avatar: 'tim.jpg',
    href: 'https://www.linkedin.com/in/timothy-quinn/',
  },
  {
    name: 'Benjamin Burrough',
    title: 'Co-Founder & Technical Lead',
    avatar: 'ben.jpg',
    href: 'https://www.linkedin.com/in/benjamin-burrough-86642120b/',
  },
];

const Reviews = () => {
  const theme = useTheme();

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
          Project Leadership
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {mock.map((item, i) => (
          <Grid item xs={12} sm={6} key={i}>
            <Box sx={{ paddingBottom: 2 }}>
              <ListItem
                component="div"
                disableGutters
                sx={{ padding: 0 }}
              >
                <ListItemAvatar sx={{ marginRight: 3 }}>
                  <Avatar
                    src={item.avatar}
                    variant={'rounded'}
                    sx={{ width: 100, height: 100, borderRadius: 4 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  sx={{ margin: 0 }}
                  primary={(<Link underline="none" color="secondary" href={item.href} target="_blank">{item.name}</Link>)}
                  secondary={item.title}
                />
              </ListItem>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Reviews;
