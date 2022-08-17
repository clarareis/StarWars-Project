import PropTypes from 'prop-types';
import React, { useState } from 'react';
import AppContext from './AppContext';

export default function AppProvider({ children }) {
/*   const [user, setUser] = useState({
    meuEstado: '',
    chave: 'valor',
  }); */

  const [planets, setPlanets] = useState([]);

  return (
    <AppContext.Provider
      value={ {
        // user,
        // setUser,
        planets,
        setPlanets,
      } }
    >
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
