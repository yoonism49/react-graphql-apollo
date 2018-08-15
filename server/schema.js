const _ = require('lodash');

const Reservations = require('../data/reservations');

import {
  GraphQLID,
  GraphQLInt,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull
} from 'graphql';

var uuid = require('uuid');

const ReservationType = new GraphQLObjectType({
  name: "Reservation",
  description: "This is a Reservation",
  fields: () => ({
    id: {type: GraphQLString},
    hotelName: {type: GraphQLString},
    name: {type: GraphQLString},
    arrivalDate: {type: GraphQLString},
    departureDate: {type: GraphQLString}
  })
});

// This is the Root Query
const ReservationQueryRootType = new GraphQLObjectType({
  name: 'ReservationSchema',
  description: "Reservation Schema Query Root",
  fields: () => ({
    reservations: {
      type: new GraphQLList(ReservationType),
      description: "List of all Reservation",
      resolve: function() {
        return Reservations
      }
    },
    reservation: {
      type: ReservationType,
      args:{
        id:{type:GraphQLString}
      },
      resolve(parentValue, args) {
          for(let i=0; i<Reservations.length; i++) {
              if(Reservations[i].id == args.id) {
                  return Reservations[i];
              }
          }
      }
    }
  })
});

// Mutations
const ReservationsMutations = new GraphQLObjectType({
  name: 'ReservationsMutations',
  fields: () => ({
    addReservation: {
      type: new GraphQLNonNull(ReservationType),
      description: "Add a new Reservation",
      args: {
        id:{type: GraphQLString},
        name: {type: GraphQLString},
        hotelName: {type: GraphQLString},
        arrivalDate: {type: GraphQLString, defaultValue:Date.now()},
        departureDate: {type: GraphQLString, defaultValue:Date.now()}
      },
      resolve(parent, {id,name,hotelName,arrivalDate,departureDate}) {
        if(Reservations.length >= 10) {
          Reservations.splice(2, 1);
        }
        Reservations.push({id,name,hotelName,arrivalDate,departureDate});
        return id;
      }
    }
  })
});

// Schema
const ReservationsSchema = new GraphQLSchema({
  name: "ReservationSchema",
  query: ReservationQueryRootType,
  mutation: ReservationsMutations
});
export default ReservationsSchema;