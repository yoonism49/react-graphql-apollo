import React from 'react';
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import AllReservation from './components/AllReservation';
import NewReservation from './components/NewReservation';
import SingleReservations from './components/SingleReservations';
import Navigation from './components/Navigation';

const httpLink = createHttpLink({
  uri: 'http://localhost:3002/graphql'
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

// render the main react component
ReactDOM.render(
  <ApolloProvider client={client}>
   <BrowserRouter>
        <Navigation>
          <Switch>
            <Route exact path='/' component={ AllReservation } />
            <Route exact path='/newresevation' component={ NewReservation } />
            <Route exact path='/single/:reservationId' component={ SingleReservations } />
          </Switch>
        </Navigation>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
)
registerServiceWorker()

