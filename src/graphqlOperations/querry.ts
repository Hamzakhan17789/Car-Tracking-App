import { gql } from "@apollo/client";

//Get All Clients querry
export const GET_ALL_CLIENTS = gql`
  query Query($page: Float, $limit: Float, $where: searchClient) {
    getAllClient(page: $page, limit: $limit, where: $where) {
      id
      firstName
      identity
      lastName
      contactNumber
      fatherName
      status
      org {
        id
      }
    }
  }
`;
//Get All Client search querry
export const GET_ALL_CLIENTS_SEARCH = gql`
  query Query($page: Float, $limit: Float, $where: searchClient) {
    getAllClient(page: $page, limit: $limit, where: $where) {
      id
      firstName
      identity
      lastName
      contactNumber
      fatherName
      status
      org {
        id
      }
    }
  }
`;

//Get All Devices querry
export const GET_ALL_DEVICES = gql`
  query Query($page: Float, $limit: Float, $where: DeviceType) {
    getAllDevice(page: $page, limit: $limit, where: $where) {
      imei
      id
      brand
      model
      serial
      status
      type
    }
  }
`;

//Get All Devices search querry
export const GET_ALL_DEVICES_SEARCH = gql`
  query Query($page: Float, $limit: Float, $where: DeviceType) {
    getAllDevice(page: $page, limit: $limit, where: $where) {
      imei
      id
      brand
      model
      serial
      status
      type
    }
  }
`;

//Get All Vehicles querry
export const GET_ALL_VEHICLES = gql`
  query Query($page: Float, $limit: Float, $where: searchLocation) {
    getAllLocation(page: $page, limit: $limit, where: $where) {
      chassis
      engine
      id
      identity
      model
      status
      type
      year
      brand
      device {
        imei
      }
    }
  }
`;

//Get All Vehicle search querry
export const GET_ALL_VEHICLES_SEARCH = gql`
  query Query($page: Float, $limit: Float, $where: searchLocation) {
    getAllLocation(page: $page, limit: $limit, where: $where) {
      chassis
      engine
      id
      identity
      model
      status
      type
      year
      brand
      device {
        imei
      }
    }
  }
`;
//Get all Networks
export const GET_ALL_NETWORK = gql`
  query GetAllNetwork($page: Float, $limit: Float, $where: searchNetworks) {
    getAllNetwork(page: $page, limit: $limit, where: $where) {
      network
      number
      status
      serialNo
      type
      id
    }
  }
`;
//Get All Networks Search
export const GET_ALL_NETWORK_SEARCH = gql`
  query GetAllNetwork($page: Float, $limit: Float, $where: searchNetworks) {
    getAllNetwork(page: $page, limit: $limit, where: $where) {
      network
      number
      status
      serialNo
      type
      id
    }
  }
`;
//Get own Org
export const GET_OWN_ORG = gql`
  query Query {
    getOwnOrg {
      id
    }
  }
`;
//Multi Query for dropdown in Location/vehicle Api(dropdown) to create relationship between client and device
export const GET_ALL_CLIENTS_AND_UNUSED_DEVICES = gql`
  query Query(
    $page: Float
    $limit: Float
    $where: searchClient
    $getAllDeviceWhere2: DeviceType
  ) {
    getAllClient(page: $page, limit: $limit, where: $where) {
      id
      contactNumber
    }
    getAllDevice(where: $getAllDeviceWhere2) {
      id
      imei
    }
  }
`;
//Get One Client
export const GET_ONE_CLIENT_DETAIL = gql`
query Query($where: searchClient) {
  getAllClient(where: $where) {
    id
    title
    firstName
    lastName
    fatherName
    contactNumber
    identity
    address
    city
    state
    country
    organization
    designation
    corporationType
    clientType
    clientSubType
    segment
    clientSubSegment
    secondaryName
    secondaryNumber
    emergencyName
    emergencyNumber
    password
    emergencyPassword
    securityQuestion
    securityAnswer
    specialInstruction
    status
   
  }
}
`;

//Get One Location Details
export const GET_ONE_LOCATION_DETAIL = gql`
query Query($where: searchLocation) {
  getAllLocation(where: $where) {
    id
    type
    subType
    brand
    model
    transmission
    year
    chassis
    engine
    identity
    address
    
    status
  }
}
`;

//Commands querry
export const GET_ALL_COMMANDS = gql`
  query Query( $locationId: Float) {
    getAllCommand( locationId: $locationId) {
      imei
      _id
      hasSended
      hasReplied
      createdAt
      command
      respond
    }
  }
`;
