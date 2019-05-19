import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import './styles.scss';

class FilterMenu extends React.Component {
  constructor() {
    super();
    this.state = {
      year: 2018,
      crimeTypes: [
        'All',
        'Murder',
        'Theft',
        'Hijack',
        'Violence'
      ],
      years: [
        'All',
        '2011',
        '2012',
        '2013',
        '2014'
      ],
      year: 'All',
      crimeType: 'All'
    };

    this.handleChange = this.handleChange.bind(this);
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
          {
            this.state.years.map(year => {
              return <MenuItem key={year} value={year}>{year}</MenuItem>;
            })
          }
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
          {
            this.state.crimeTypes.map(type => {
              return <MenuItem key={type} value={type}>{type}</MenuItem>;
            })
          }
        </Select>
      </div>
    );
  }
}

export default FilterMenu;
