import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Dropdown({ handleStepUp, handleSubmitPlatform }) {
  const handleChange = (event) => {
    handleSubmitPlatform(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>Select Platform</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          label='Select Platform'
          onChange={handleChange}
        >
          <MenuItem value={'Amazon Prime-10'}>Amazon Prime</MenuItem>
          <MenuItem value={'Apple Tv-350'}>Apple Tv</MenuItem>
          <MenuItem value={'Disney +-337'}>Disney +</MenuItem>
          <MenuItem value={'HBO +-384'}>HBO +</MenuItem>
          <MenuItem value={'Netflix-8'}>Netflix</MenuItem>
          <MenuItem value={'Rakuten Tv-35'}>Rakuten TV</MenuItem>
          <MenuItem value={'Fubo Tv-257'}>Fubo TV</MenuItem>
          <MenuItem value={'Filmin-64'}>Filmin</MenuItem>
          <MenuItem value={'Pluto Tv-300'}>Pluto TV</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
