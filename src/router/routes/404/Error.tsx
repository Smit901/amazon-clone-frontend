import { useNavigate } from 'react-router-dom';
// *** MUI
import { Box, Button, Typography } from '@mui/material';

function Error() {
  const navigate = useNavigate()
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '90vh'
      }}
    >
      <Typography variant="h1">
        404
      </Typography>
      <Typography variant="h6" sx={{mb: 3}}>
        The page you’re looking for doesn’t exist.
      </Typography>
      <Button variant="contained" onClick={()=> navigate("/home")}>Back Home</Button>
    </Box>
  );
}

export default Error;