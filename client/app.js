import React from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo';
class TodoBanner extends React.Component {
  render() {
    return (
      <h3>TODO app with React and GraphQL </h3>
    );
  }
}

class TodoList extends React.Component {
  render() {
    const FEED_QUERY = gql`
     {
         id
         name
         hotelName
         arrivalDate
         departureDate
      }
    `;
    return (
       <Query query={FEED_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>
    
          const hotelsToRender = data.items
    
          return (
            <div>
              {hotelsToRender.map(this.createItem)}
            </div>
          )
        }}
      </Query>
    );
  }

  createItem(itemText, index) {
    return (
      <li key={index}>{itemText}</li>
    );
  }
}

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {item: ''};
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onFormSubmit(this.state.item);
    this.setState({item: ''});
    React.findDOMNode(this.refs.item).focus();
    return;
  }

  onChange(e) {
    this.setState({
      item: e.target.value
    })
  }

  render() {
    return (
      <Mutation
    mutation={gql`
      mutation addItem($item: String!){
        addItem(item: $item) 
      }
    `}
  >
    {(createPost, { loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      let item

      return (
        <form  onSubmit={e => {
          e.preventDefault();
          createPost({ variables: {
            item: this.state.item 
          }});
          this.setState({item: ''});
          React.findDOMNode(this.refs.item).focus();
        }}>
         <input 
          type='text' 
          ref='item' 
          onChange={this.onChange.bind(this)} 
          value={this.state.item}/>
          <input type='submit' value='Reserve'/>
        </form>
      );
    }}
  </Mutation>
    );
  }
}  

export default class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.model = this.props.model;
    // get the initial items from the server
    //this.setItems(this.model.getAll());
    // set the initial data as empty
    this.state = {items: []};
  }

  /*updateItems(newItem) {
    // Recive the items with optimistic updates
    // and register a callback to get items once updated the server

    const afterUpdated = itemsPromise => {
      this.setItems(itemsPromise);
    };
    const pendingItems = this.model.addItem(newItem, afterUpdated);
    this.setItems(pendingItems);
  }*/

  // accepts a promise which return items and 
  // make it as the state
  setItems(itemsPromise) {
    itemsPromise
      .then(items => {
        this.setState({
          items
        });
      })
  }

  render() {
    return (
      <div>
        <TodoBanner/>
        <TodoList/>
        <TodoForm/>
      </div>
    );
  }
}