import React from 'react';
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import uuid from 'uuid';
class NewReservation extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {name: '', hotelName:'', arrivalDate:'',departureDate:'',reserved: false};
  }

  handleSubmit(e) {
    e.preventDefault();
    //this.props.onFormSubmit(this.state.name);
    this.setState({name: ''});
    React.findDOMNode(this.refs.name).focus();
    return;
  }

  onChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  render() {
    return (

      <Mutation
    mutation={gql`
      mutation addReservation($id: String!,$name: String!, $hotelName: String!, $arrivalDate: String!,$departureDate: String!){
        addReservation(id: $id, name: $name,hotelName: $hotelName,arrivalDate: $arrivalDate,departureDate: $departureDate) 
        {
          id
          name
          hotelName
          arrivalDate
          departureDate
        }
      }
    `}
  >
    {(addReservation, { loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      let name
      const nid=uuid.v1();
      return (
        
        <form  onSubmit={e => {
          e.preventDefault();
          console.log('onSubmit');
          addReservation({ variables: {
            id:nid, name: this.state.name , hotelName:this.state.hotelName, arrivalDate: this.state.arrivalDate, departureDate: this.state.departureDate
          }});
          this.setState({item: '', reserved:true});
          return 'dsfdasf';
        }}>
        <br/>
          <br/>
          
         Name :    <input 
          type='text' 
          ref='name'
          name='name' 
          onChange={this.onChange.bind(this)} 
          value={this.state.name}
          style={{display:this.state.reserved?'none':'block'}} 
          />
         Hotel Name :  <input 
          type='text' 
          ref='hotelName' 
          name='hotelName' 
          onChange={this.onChange.bind(this)} 
          value={this.state.hotelName}
          style={{display:this.state.reserved?'none':'block'}} 
          />
         Arrival Date  <input 
          type='text' 
          name='arrivalDate'
          ref='arrivalDate' 
          onChange={this.onChange.bind(this)} 
          value={this.state.arrivalDate}
          style={{display:this.state.reserved?'none':'block'}} 
          />
         Departure Date <input 
          type='text' 
          name='departureDate'
          ref='departureDate' 
          onChange={this.onChange.bind(this)} 
          value={this.state.departureDate}
          style={{display:this.state.reserved?'none':'block'}} 
          />
          <br/>
          <br/>
          <input type='submit' value='Reserve'
          style={{display:this.state.reserved?'none':'block'}} />
          <div style={{display:this.state.reserved?'block':'none', marginTop:'20px'}}>
          Your reservation is made!</div>
        </form>
      );
    }}
  </Mutation>
    );
  }
}  
export default NewReservation;