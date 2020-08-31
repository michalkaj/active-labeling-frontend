import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      key={`simple-tabpanel-${index}`}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} style={{height: "100%"}}>
          {children}
        </Box>
      )}
    </div>
  );
}
