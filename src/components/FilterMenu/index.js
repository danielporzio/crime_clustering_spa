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
      primaryTypes: [
        'All',
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
      years: [
        'All',
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
      descriptions: [
        'All',
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
      locationDescriptions: [
        'All',
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
      arrests: [
        'All',
        'True',
        'False'
      ],
      domestics: [
        'All',
        'True',
        'False'
      ],
      algorithmTypes: [
        'None',
        'DBSCAN',
        'HDBSCAN',
        'K-MEANS',
        'DBSCAN++'
      ]
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  prepareCrimeFilters = () => {
    const { primaryType, year, description, arrest, location, domestic, algorithmType } = this.state
    const params = {
      primary_type: primaryType,
      year: year,
      description: description,
      arrest: arrest,
      location_description: location,
      domestic: domestic,
      algorithm: algorithmType
    };
    const filteredParams = Object.keys(params).reduce( (previous, key) => {
      if (typeof params[key] !== 'undefined' && params[key] !== 'All') {
        previous[key] = params[key];
      }
      return previous;
    }, {});
    this.props.getCrimes(filteredParams);
  }

  render() {
    return (
      <div className='filter-menu'>
        <InputLabel htmlFor="year-label">Year</InputLabel>
        <Select
          className='filter-menu__select'
          value={this.state.year || 'All'}
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
          value={this.state.crimeType || 'All'}
          onChange={this.handleChange}
          inputProps={{
            name: 'crimeType',
            id: 'crimeType-select',
          }}
        >
          {
            this.state.primaryTypes.map(type => {
              return <MenuItem key={type} value={type}>{type}</MenuItem>;
            })
          }
        </Select>
        <InputLabel htmlFor="description-label">Description</InputLabel>
        <Select
          className='filter-menu__select'
          value={this.state.description || 'All'}
          onChange={this.handleChange}
          inputProps={{
            name: 'description',
            id: 'description-select',
          }}
        >
          {
            this.state.descriptions.map(description => {
              return <MenuItem key={description} value={description}>{description}</MenuItem>;
            })
          }
        </Select>
        <InputLabel htmlFor="locationDescriptions-label">Location</InputLabel>
        <Select
          className='filter-menu__select'
          value={this.state.location || 'All'}
          onChange={this.handleChange}
          inputProps={{
            name: 'location',
            id: 'location-select',
          }}
        >
          {
            this.state.locationDescriptions.map(location => {
              return <MenuItem key={location} value={location}>{location}</MenuItem>;
            })
          }
        </Select>
        <InputLabel htmlFor="arrests-label">Arrest</InputLabel>
        <Select
          className='filter-menu__select'
          value={this.state.arrest || 'All'}
          onChange={this.handleChange}
          inputProps={{
            name: 'arrest',
            id: 'arrest-select',
          }}
        >
          {
            this.state.arrests.map(arrest => {
              return <MenuItem key={arrest} value={arrest}>{arrest}</MenuItem>;
            })
          }
        </Select>
        <InputLabel htmlFor="domestics-label">Domestic</InputLabel>
        <Select
          className='filter-menu__select'
          value={this.state.domestic || 'All'}
          onChange={this.handleChange}
          inputProps={{
            name: 'domestic',
            id: 'domestic-select',
          }}
        >
          {
            this.state.domestics.map(domestic => {
              return <MenuItem key={domestic} value={domestic}>{domestic}</MenuItem>;
            })
          }
        </Select>
        <Select
          className='filter-menu__select'
          value={this.state.algorithmType || 'None'}
          onChange={this.handleChange}
          inputProps={{
            name: 'algorithmType',
            id: 'algorithmType-select',
          }}
        >
          {
            this.state.algorithmTypes.map(algorithmType => {
              return <MenuItem key={algorithmType} value={algorithmType}>{algorithmType}</MenuItem>;
            })
          }
        </Select>
        <Button
          variant="contained"
          className='filter-menu__button'
          onClick={this.prepareCrimeFilters}>
          Submit
        </Button>
      </div>
    );
  }
}

export default FilterMenu;
