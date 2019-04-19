import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import './styles.scss';

class FilterMenu extends React.Component {
  state = {
    year: 2018,
    crimeType: 'All',
  };

  constructor() {
    super();
    this.state = {
      year: 2018,
      crimeType: 'All',
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className='filter-menu'>
        <InputLabel htmlFor="year-label">Year</InputLabel>
        <Select
          value={this.state.year}
          onChange={this.handleChange}
          inputProps={{
            name: 'year',
            id: 'year-select',
          }}
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          <MenuItem value={2011}>2011</MenuItem>
          <MenuItem value={2012}>2012</MenuItem>
          <MenuItem value={2013}>2013</MenuItem>
          <MenuItem value={2014}>2014</MenuItem>
        </Select>

        <InputLabel htmlFor="crimeType-label">Crime type</InputLabel>
        <Select
          value={this.state.crimeType}
          onChange={this.handleChange}
          inputProps={{
            name: 'crimeType',
            id: 'crimeType-select',
          }}
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          <MenuItem value={'Murder'}>Murder</MenuItem>
          <MenuItem value={'Theft'}>Theft</MenuItem>
          <MenuItem value={'Hijack'}>Hijack</MenuItem>
          <MenuItem value={'Violence'}>Violence</MenuItem>
        </Select>
      </div>
    );
  }
}

export default FilterMenu;
