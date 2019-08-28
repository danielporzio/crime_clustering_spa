/* eslint-disable camelcase */
import React from 'react';
import Button from '@material-ui/core/Button';
import { MultipleSelect, SingleSelect } from 'react-select-material-ui';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import './styles.scss';

const styles = {
  root: {
    margin: '0 0 10px 0 !important',
    width: '50% !important',
  },
  rootAlgorithm: {
    margin: '0 0 10px 0 !important',
  },
  genRoot: {
    margin: '0 0 10px 0 !important'
  },
  textField: {
    width: '90%',
  },
};

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
      useWeights: [
        'True',
        'False'
      ],
      algorithmTypes: [
        'None',
        'DBSCAN',
        'HDBSCAN',
        'K-MEANS',
        'K-MEAN-O',
        'WEIGHTED-MM-KMEANS'
      ],
      params: {}
    };
  }

  isAll = val => {
    return val === 'All';
  }

  handleChangeValues = (values, name) => {
    if (values[0] === 'All' && values.length > 1) {
      values.shift();
      this.setState({ [name]: values });
      return;
    }
    if (values.find(this.isAll) ) {
      this.setState({ [name]: ['All'] });
      return;
    }
    this.setState({ [name]: values });
  };

  handleChangeSingleValue = (value, name, param) => {
    if (param) {
      const { params } = this.state;
      const newParams = { ...params, [name]: value };
      this.setState({ params: newParams });
      return;
    }

    if (name === 'algorithmType') {
      this.setState({ [name]: value, params: {} });
      return;
    }
    if (name === 'minClusterWeight' || name === 'maxClusterWeight') {
      this.setState({ numberClusters: undefined });
    }
    if (name === 'numberClusters') {
      this.setState({ minClusterWeight: undefined, maxClusterWeight: undefined });
    }
    this.setState({ [name]: value });
  }

  prepareCrimeFilters = () => {
    const { crimeType, year, description, arrest, location, domestic, useWeight, algorithmType, params } = this.state;
    const paramsToSend = {
      primary_type: crimeType,
      year: year,
      description: description,
      arrest: arrest,
      location_description: location,
      domestic: domestic,
      algorithm: algorithmType,
      useWeights: useWeight,
      ...params
    };
    const filteredParams = Object.keys(paramsToSend).reduce( (previous, key) => {
      if (
        typeof paramsToSend[key] !== 'undefined' &&
        paramsToSend[key] !== 'All' &&
        paramsToSend[key][0] !== 'All' &&
        (paramsToSend[key].length > 0 || Object.keys(paramsToSend[key]).length > 0)
      ) {
        previous[key] = paramsToSend[key];
      }
      return previous;
    }, {});
    if (filteredParams.minClusterWeight || filteredParams.maxClusterWeight) {
      filteredParams['minMax'] = 'True';
    }
    this.props.getCrimes(filteredParams);
  }

  algorithmParams = () => {
    const { algorithmType, params } = this.state;
    const { classes } = this.props;
    switch (algorithmType) {
    case 'DBSCAN': {
      return (
        <>
          <TextField
            id='epsilon'
            label='Epsilon'
            className={classes.textField}
            value={params.epsilon || ''}
            onChange={e => this.handleChangeSingleValue(e.target.value, 'epsilon', 'params')}
            margin='normal'
          />
          <TextField
            id='minSamples'
            label='Min samples'
            className={classes.textField}
            value={params.minSamples || ''}
            onChange={e => this.handleChangeSingleValue(e.target.value, 'minSamples', 'params')}
            margin='normal'
          />
        </>
      );
    }
    case 'K-MEANS': {
      return  (
        <>
          <TextField
            id='numberClusters'
            disabled={!!params.maxClusterWeight || !!params.minClusterWeight}
            label='Number of clusters'
            className={classes.textField}
            value={params.numberClusters || ''}
            onChange={e => this.handleChangeSingleValue(e.target.value, 'numberClusters', 'params')}
            margin='normal'
          />
          <TextField
            id='minClusterWeight'
            disabled={!!params.numberClusters}
            label='Minimum weight'
            className={classes.textField}
            value={params.minClusterWeight || ''}
            onChange={e => this.handleChangeSingleValue(e.target.value, 'minClusterWeight', 'params')}
            margin='normal'
          />
          <TextField
            id='maxClusterWeight'
            disabled={!!params.numberClusters}
            label='Maximum weight'
            className={classes.textField}
            value={params.maxClusterWeight || ''}
            onChange={e => this.handleChangeSingleValue(e.target.value, 'maxClusterWeight', 'params')}
            margin='normal'
          />
        </>
      );
    }
    case 'WEIGHTED-MM-KMEANS': case 'K-MEAN-O': {
      return  (
        <>
          <TextField
            id='minClusterWeight'
            label='Minimum weight'
            className={classes.textField}
            value={params.minClusterWeight || ''}
            onChange={e => this.handleChangeSingleValue(e.target.value, 'minClusterWeight', 'params')}
            margin='normal'
          />
          <TextField
            id='maxClusterWeight'
            label='Maximum weight'
            className={classes.textField}
            value={params.maxClusterWeight || ''}
            onChange={e => this.handleChangeSingleValue(e.target.value, 'maxClusterWeight', 'params')}
            margin='normal'
          />
        </>
      );
    }
    case 'HDBSCAN': {
      return  (
        <>
          <TextField
            id='minClusterSize'
            label='Min cluster size'
            className={classes.textField}
            value={params.minClusterSize || ''}
            onChange={e => this.handleChangeSingleValue(e.target.value, 'minClusterSize', 'params')}
            margin='normal'
          />
          <TextField
            id='minSamples'
            label='Min samples'
            className={classes.textField}
            value={params.minSamples || ''}
            onChange={e => this.handleChangeSingleValue(e.target.value, 'minSamples', 'params')}
            margin='normal'
          />
        </>
      );
    }
    default: {
      return null;
    }
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className='filter-menu'>
        <MultipleSelect
          label='Year'
          values={this.state.year}
          options={this.state.years}
          onChange={e => this.handleChangeValues(e, 'year')}
          SelectProps={{
            isCreatable: false,
            msgNoOptionsAvailable: 'All years are selected',
            msgNoOptionsMatchFilter: 'No year matches the filter'
          }}
          classes={{
            root: classes.genRoot
          }}
        />
        <MultipleSelect
          label='Crime type'
          values={this.state.crimeType}
          options={this.state.primaryTypes}
          onChange={e => this.handleChangeValues(e, 'crimeType')}
          SelectProps={{
            isCreatable: false,
            msgNoOptionsAvailable: 'All types are selected',
            msgNoOptionsMatchFilter: 'No type matches the filter'
          }}
          classes={{
            root: classes.genRoot
          }}
        />
        <MultipleSelect
          label='Description'
          values={this.state.description}
          options={this.state.descriptions}
          onChange={e => this.handleChangeValues(e, 'description')}
          SelectProps={{
            isCreatable: false,
            msgNoOptionsAvailable: 'All descriptions are selected',
            msgNoOptionsMatchFilter: 'No descripton matches the filter'
          }}
          classes={{
            root: classes.genRoot
          }}
        />
        <MultipleSelect
          label='Location'
          values={this.state.location}
          options={this.state.locationDescriptions}
          onChange={e => this.handleChangeValues(e, 'location')}
          SelectProps={{
            isCreatable: false,
            msgNoOptionsAvailable: 'All locations are selected',
            msgNoOptionsMatchFilter: 'No location matches the filter'
          }}
          classes={{
            root: classes.genRoot
          }}
        />
        <SingleSelect
          label='Arrest'
          value={this.state.arrest}
          placeholder='Arrest'
          options={this.state.arrests}
          onChange={e => this.handleChangeSingleValue(e, 'arrest')}
          classes={{
            root: classes.root
          }}
        />
        <SingleSelect
          label='Domestic'
          value={this.state.domestic}
          placeholder='Domestic'
          options={this.state.domestics}
          onChange={e => this.handleChangeSingleValue(e, 'domestic')}
          classes={{
            root: classes.root
          }}
        />
        <SingleSelect
          label='Algorithm type'
          value={this.state.algorithmType}
          placeholder='Algorithm type'
          options={this.state.algorithmTypes}
          onChange={e => this.handleChangeSingleValue(e, 'algorithmType')}
          classes={{
            root: classes.rootAlgorithm
          }}
        />
        {this.algorithmParams()}
        <SingleSelect
          label='Use Weights'
          value={this.state.useWeight}
          placeholder='False'
          options={this.state.useWeights}
          onChange={e => this.handleChangeSingleValue(e, 'useWeight')}
          classes={{
            root: classes.rootAlgorithm
          }}
        />
        <Button
          variant='contained'
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
