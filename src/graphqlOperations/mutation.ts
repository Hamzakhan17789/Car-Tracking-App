import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      email
      access_token
    }
  }
`;
//Add Client form mutation querry
export const CLIENT_FORM = gql`
  mutation CreateClient($input: CreateClientInput!) {
    createClient(input: $input) {
      contactNumber
      id
    }
  }
`;
//Add Device form mutation querry
export const DEVICE_FORM = gql`
  mutation CreateDevice($input: CreateDeviceInput!) {
    CreateDevice(input: $input) {
      id
    }
  }
`;
//Add Sim/Network form mutation querry
export const SIM_FORM = gql`
  mutation CreateNetwork($input: CreateNetworkInput!) {
    createNetwork(input: $input) {
      network
    }
  }
`;
// Add Vehicle form mutation querry
export const VEHICLE_FORM = gql`
  mutation Mutation($input: CreateLocationInput!) {
    createLocation(input: $input) {
      id
    }
  }
`;

//Commands form
export const COMMANDS_FORM = gql`
  mutation Mutation($input: SendCommandInput!) {
    sendCommand(input: $input) {
      _id
      command
      hasReplied
      hasSended
      imei
      respond
    }
  }
`;

//GeoFence Form
export const GEOFENCE_FORM = gql`
  mutation Mutation($input: CreateGeofenceInput!) {
    createGeofence(input: $input) {
      id
      org {
        id
      }
      type
      xId
      name
      description
      area
      attributes
      calendarId
      status
    }
  }
`;

//Assigning Geofence to Vehicle
export const ASSIGN_GEOFENCE = gql`
  mutation Mutation($input: AssignGeofenceInput!) {
    assignGeofence(input: $input) {
      id
      org {
        id
      }
      type
      xId
      name
      description
      area
      attributes
      calendarId
      status
    }
  }
`;

//Unassined geofence from vehicle
export const UNASSIGNED_GEOFENCE = gql`
  mutation Mutation($input: AssignGeofenceInput!) {
    unassignGeofence(input: $input) {
      id
      org {
        id
      }
      type
      xId
      name
      description
      area
      attributes
      calendarId
      status
    }
  }
`;
