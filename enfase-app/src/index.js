import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';

import MainPage from './components/MainPage';
import AddQuestion from'./components/AddQuestion';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter as Router, Link, Route} from 'react-router-dom'

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

//Conectando apolo com o graphql
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

//Componente que renderiza a barra de Navegação
function NavBar(){
  return (
    <div className="nav-bar">
      <div className="nav-bar-itens">
          <Link to={`/`}>Gerenciar</Link>
          <Link to={`/Adicionar`}>Adicionar</Link>
      </div>
      <div className="nav-bar-header">
        <strong>Gerenciador de Questões</strong>
      </div>
    </div>
  );
}

// ======================================
//renerizador princial, de acordo com oque foi selecionado
// na barra de navegação ele renderiza a pagina
ReactDOM.render(
  <ApolloProvider client={client}>
  	<div>
      <Router>
  			<NavBar />
  			<main>
  	      <Route exact path="/" component={MainPage} />
  	      <Route path="/Adicionar" component={AddQuestion} />
  	    </main>
      </Router>
    </div>,
  </ApolloProvider>,
	document.getElementById('root')
);

serviceWorker.unregister();