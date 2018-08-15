import React from 'react';
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
class SingleReservations extends React.Component {
   constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    const FEED_QUERY = gql`
      {
          reservation(id: "${this.props.match.params.reservationId}") {
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
    
          const hotelsToRender = data.reservation
        console.log('hotelsToRender' + data.reservation);
          refetch();
          return (
            <div style={{'margin':'20px'}} >
              <div style={{'margin':'20px'}}>Reservation for {data.reservation.name}
                <br/>
                Hotel:{data.reservation.hotelName}
                <br/>
                arrival date:{data.reservation.arrivalDate}
                <br/>
                departure date:{data.reservation.departureDate}
                <br/><br/>
                <hr/>
              </div>
            </div>
          )
        }}
      </Query>
    );
  }
}
export default SingleReservations;