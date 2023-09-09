import React from 'react';

const BackgroundVideo = () => {
  const videoStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    zIndex: '-1',
  };

  const sourceStyle = {
    objectFit: 'cover',
  };

  return (
    <div style={videoStyle}>
      <video autoPlay muted loop style={sourceStyle}>
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default BackgroundVideo;
