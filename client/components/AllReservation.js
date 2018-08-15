import React from 'react';
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
class AllHotels extends React.Component {
  render() {
    const FEED_QUERY = gql`
      {
        reservations{
         id
         name
         hotelName
         arrivalDate
         departureDate
       }
      }
    `;
    return (
       <Query query={FEED_QUERY}>
        {({ loading, error, data,refetch }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>
    
          const hotelsToRender = data.reservations
        console.log('hotelsToRender' + data.reservations);
          refetch();
          return (
            <div style={{'margin':'20px'}} >
              {hotelsToRender.map(this.createItem)}
            </div>
          )
        }}
      </Query>
    );
  }
  createItem(itemText, index) {
    return (
      <div key={index} style={{'margin':'20px'}}>{index+1}. Reservation for {itemText.name}
      <br/>
      <Link to={`/single/${itemText.id}`}>Click for Detail</Link>
      <br/><br/>
      <hr/>
      </div>
    );
  }
}
export default AllHotels;