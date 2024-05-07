import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function TiposConsulta({handleTipoconsulta}) {
  const [consulta, setConsulta] = React.useState('');

  const handleChange = (event) => {
    setConsulta(event.target.value);
    handleTipoconsulta(event.target.value)
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 150, boxShadow: 8, color: '#ec131b', marginLeft: 39, marginTop: 5}} error>
        <InputLabel id="demo-simple-select-helper-label" sx={{color: '#ec131b'}}>Consultas</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={consulta}
          label="Consultas"
          autoWidth
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>Tipos de consultas:</em>
          </MenuItem>
          <MenuItem value={"general"}>General</MenuItem>
          <MenuItem value={"fechaCorte"}>Fechas de cortes</MenuItem>
          <MenuItem value={"extractos"}>Extractos</MenuItem>
        </Select>
        
      </FormControl>
      
    </div>
  );
}
