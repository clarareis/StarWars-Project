import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import getAPI from '../services/api_request';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [api, setApi] = useState([]);
  const [apiFilter, setApiFilter] = useState([]);
  const [namePlanet, setNamePlanet] = useState('');
  const [number, setNumber] = useState(0);
  const [optionsParameters, setOptionsParameters] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  const [storeFilter, setStoreFilter] = useState({
    parameters: optionsParameters[0],
    operators: 'maior que',
    number: 0,
  });
  const [storeAppliedFilters, setStoreAppliedFilters] = useState([]);

  const handleStoreFilter = ({ value, name }) => {
    setStoreFilter({ ...storeFilter, [name]: value });
  };

  const removeAll = () => {
    setStoreAppliedFilters([]);
    setApiFilter(api);
    setOptionsParameters(['population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water']);
  };

  const fetchApi = async () => {
    const newPlanets = await getAPI();
    setApi(newPlanets);
  };

  useEffect(() => { fetchApi(); }, []);

  const removeOption = () => {
    setOptionsParameters(optionsParameters
      .filter((element) => element !== storeFilter.parameters));
  };

  const addFilterToStore = () => {
    const magicNumberOfOneSecond = 100;
    setStoreAppliedFilters([...storeAppliedFilters, storeFilter]);
    setTimeout(() => {
      removeOption();
      setStoreFilter({
        ...storeFilter, parameters: optionsParameters[1],
      });
    }, magicNumberOfOneSecond);
  };

  const returnFilterDeleted = (parameter) => {
    setOptionsParameters([...optionsParameters, parameter]);
  };

  const arrayBase = (isRemove) => {
    if (isRemove === 'isRemove') return api;
    if (apiFilter.length === 0) {
      return api;
    }
    return apiFilter;
  };

  const apllyFilters = (isRemove) => {
    const dataFilter = arrayBase(isRemove);
    console.log(dataFilter);
    storeAppliedFilters.forEach(async (filter) => {
      const addFilter = await dataFilter.filter((planets) => {
        if (filter.operators === 'maior que') {
          return +planets[filter.parameters] > +filter.number;
        } if (filter.operators === 'menor que') {
          return +planets[filter.parameters] < +filter.number;
        }
        return +filter.number === +planets[filter.parameters];
      });
      setApiFilter(addFilter);
    });
  };
  const removeAFilter = (filter) => {
    const magicNumber = 300;
    setStoreAppliedFilters(storeAppliedFilters
      .filter((element) => element.parameters !== filter.parameters));
    returnFilterDeleted(filter.parameters);
    setApiFilter(api);
    setTimeout(() => {
      apllyFilters();
    }, magicNumber);
  };

  useEffect(() => {
    apllyFilters();
  }, [storeAppliedFilters]);

  return (
    <AppContext.Provider
      value={ { api,
        setApi,
        namePlanet,
        setNamePlanet,
        number,
        setNumber,
        optionsParameters,
        setOptionsParameters,
        storeFilter,
        setStoreFilter,
        storeAppliedFilters,
        setStoreAppliedFilters,
        removeOption,
        addFilterToStore,
        removeAFilter,
        apiFilter,
        handleStoreFilter,
        removeAll } }
    >
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
