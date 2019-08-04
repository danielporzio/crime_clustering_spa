import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import { MultipleSelect, SingleSelect } from "react-select-material-ui";
import { withStyles } from "@material-ui/core/styles"
import './styles.scss';

const styles = {
  root: {
    margin: "0px !important",
    width: "50% !important"
  },
  rootAlgorithm: {
    margin: "0px !important"
  }
}

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

  isAll = (val) => {
    return val === "All"
  }

  handleChangeValues = (values, name) => {
    if (values[0] === "All" && values.length > 1) {
      values.shift()
      this.setState({ [name]: values });
      return;
    }
    if (values.find(this.isAll) ) {
      this.setState({ [name]: ["All"] });
      return;
    }
    this.setState({ [name]: values });
  };

  handleChangeSingleValue = (value, name) => {
    this.setState({ [name]: value });
  }

  prepareCrimeFilters = () => {
    const { crimeType, year, description, arrest, location, domestic, algorithmType } = this.state
    const params = {
      primary_type: crimeType,
      year: year,
      description: description,
      arrest: arrest,
      location_description: location,
      domestic: domestic,
      algorithm: algorithmType
    };
    const filteredParams = Object.keys(params).reduce( (previous, key) => {
      if (
        typeof params[key] !== 'undefined' &&
        params[key] !== 'All' &&
        params[key][0] !== 'All' &&
        params[key].length > 0
      ) {
        previous[key] = params[key];
      }
      return previous;
    }, {});
    this.props.getCrimes(filteredParams);
  }

  render() {
    const { classes } = this.props
    return (
      <div className='filter-menu'>
        <MultipleSelect
          label="Year"
          values={this.state.year}
          options={this.state.years}
          onChange={e => this.handleChangeValues(e, "year")}
          SelectProps={{
            isCreatable: false,
            msgNoOptionsAvailable: "All years are selected",
            msgNoOptionsMatchFilter: "No year matches the filter"
          }}
        />
        <MultipleSelect
          label="Crime type"
          values={this.state.crimeType}
          options={this.state.primaryTypes}
          onChange={e => this.handleChangeValues(e, "crimeType")}
          SelectProps={{
            isCreatable: false,
            msgNoOptionsAvailable: "All types are selected",
            msgNoOptionsMatchFilter: "No type matches the filter"
          }}
        />
        <MultipleSelect
          label="Description"
          values={this.state.description}
          options={this.state.descriptions}
          onChange={e => this.handleChangeValues(e, "description")}
          SelectProps={{
            isCreatable: false,
            msgNoOptionsAvailable: "All descriptions are selected",
            msgNoOptionsMatchFilter: "No descripton matches the filter"
          }}
        />
        <MultipleSelect
          label="Location"
          values={this.state.location}
          options={this.state.locationDescriptions}
          onChange={e => this.handleChangeValues(e, "location")}
          SelectProps={{
            isCreatable: false,
            msgNoOptionsAvailable: "All locations are selected",
            msgNoOptionsMatchFilter: "No location matches the filter"
          }}
        />
        <SingleSelect
          label="Arrest"
          value={this.state.arrest}
          placeholder="Arrest"
          options={this.state.arrests} 
          onChange={e => this.handleChangeSingleValue(e, "arrest")} 
          classes={{
            root: classes.root
          }}
        />
        <SingleSelect
          label="Domestic"
          value={this.state.domestic}
          placeholder="Domestic"
          options={this.state.domestics} 
          onChange={e => this.handleChangeSingleValue(e, "domestic")}
          classes={{
            root: classes.root
          }}
        />
        <SingleSelect
          label="Algorithm type"
          value={this.state.algorithmType}
          placeholder="Algorithm type"
          options={this.state.algorithmTypes} 
          onChange={e => this.handleChangeSingleValue(e, "algorithmType")}
          classes={{
            root: classes.rootAlgorithm
          }} 
        />
        <Button
          variant="contained"
          className='filter-menu__button'
          onClick={this.prepareCrimeFilters}
        >
          Submit
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(FilterMenu);
