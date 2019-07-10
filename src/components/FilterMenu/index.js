import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

import './styles.scss';

class FilterMenu extends React.Component {
  constructor() {
    super();
    this.state = {
      primaryType: [
        'THEFT',
        'BATTERY',
        'CRIMINAL DAMAGE',
        'NARCOTICS',
        'ASSAULT',
        'OTHER OFFENSE',
        'BURGLARY',
        'MOTOR VEHICLE THEFT',
        'DECEPTIVE PRACTICE',
        'ROBBERY',
        'CRIMINAL TRESPASS',
        'WEAPONS VIOLATION'
      ],
      year: [
        '2002',
        '2001',
        '2003',
        '2004',
        '2005',
        '2006',
        '2007',
        '2008',
        '2009',
        '2010',
        '2011',
        '2012'
      ],
      description: [
        'SIMPLE',
        '$500 AND UNDER',
        'DOMESTIC BATTERY SIMPLE',
        'TO VEHICLE',
        'TO PROPERTY',
        'OVER $500',
        'POSS: CANNABIS 30GMS OR LESS',
        'FORCIBLE ENTRY',
        'AUTOMOBILE',
        'FROM BUILDING',
        'RETAIL THEFT',
        'TELEPHONE THREAT'
      ],
      locationDescription: [
        'STREET',
        'RESIDENCE',
        'APARTMENT',
        'SIDEWALK',
        'OTHER',
        'PARKING LOT/GARAGE(NON.RESID.)',
        'ALLEY',
        'SCHOOL, PUBLIC, BUILDING',
        'RESIDENCE-GARAGE',
        'SMALL RETAIL STORE',
        'RESIDENCE PORCH/HALLWAY',
        'VEHICLE NON-COMMERCIAL',
      ],
      arrest: [
        'True',
        'False'
      ],
      domestic: [
        'True',
        'False'
      ]
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
          className='filter-menu__select'
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
          className='filter-menu__select'
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
        <Button
          variant="contained"
          className='filter-menu__button'
          onClick={this.props.getCrimes}>
          Submit
        </Button>
      </div>
    );
  }
}

export default FilterMenu;
