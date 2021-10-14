/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@mui/material/Box';

const Video = () => {
  return (
    <Box>
      <Box marginBottom={2}>
        <div style={{
          overflow: 'hidden',
          paddingBottom: '56.25%',
          position: 'relative',
          height: 0,
        }}>
          <iframe
            style={{ left: 0, top: 0, height: '100%', width: '100%', position: 'absolute' }}
            width="560"
            height="315"
            src="https://www.youtube-nocookie.com/embed/-OQ7HTkznrA?controls=0"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </Box>
    </Box>
  );
};

export default Video;
