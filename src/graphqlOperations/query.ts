import { gql } from "@apollo/client";

export const GET_CLIENT_DATA = gql`
  query GetAllClient($where: searchClient, $page: Float, $limit: Float) {
    getAllClient(where: $where, page: $page, limit: $limit) {
      contactNumber
      firstName
      title
    }
  }
`;

export const GET_ONE_CLIENT = gql`
  query GetOneClient($getOneClientId: Int!) {
    getOneClient(id: $getOneClientId) {
      contactNumber
      firstName
      lastName
    }
  }
`;

export const GET_CLIENT_DATA_SEARCH_LOCATION = gql`
  query GetAllBySearchLocation(
    $page: Float
    $limit: Float
    $search: String
    $where: searchClient
  ) {
    getAllBySearchLocation(page: $page, limit: $limit, search: $search) {
      brand
      chassis
      device {
        imei
      }
      year
      engine
      id
      model
    }
    getAllClient(where: $where) {
      firstName
      id
    }
  }
`;

// MULTI QUERY WITH CLIENT, VEHICLE , DEVICE
export const GET_CLIENT_VEHICLE_DEVICE_DATA = gql`
  query Query($where: searchClient, $contactNumber: String, $orgId: Float) {
    getAllBySearchLocation(orgId: $orgId, contactNumber: $contactNumber) {
      brand
      chassis
      id
      geo_location
      engine
      year
      device {
        imei
        network {
          number
        }
      }
    }
    getAllClient(where: $where) {
      firstName
      contactNumber
      identity
      city
    }
  }
`;

// export const GET_ALL_BY_SEARCH_LOCATION = gql`
// query GetAllBySearchLocation(  $contactNumber: String, $orgId: Float) {
//   getAllBySearchLocation( contactNumber: $contactNumber, orgId: $orgId) {
//     id
//     geo_location {
//       gps {
//         longitude
//         latitude
//       }
//       Ignition
//       timestamp
//       Movement
//       Data_Mode
//       Sleep_Mode
//       Ext_Voltage
//       Speed
//       Battery_Voltage
//       Battery_Current
//       GSM_Operator
//       Trip_Odometer
//       Total_Odometer

//     }

//     device {
//       imei
//       id
//       network {
//         number
//       }
//     }

//     brand
//     model
//     transmission
//     year
//     chassis
//     engine
//     identity
//     address
//     status
//     client {
//       title
//       firstName
//       contactNumber
//     }
//   }

// }
// `

export const GET_ALL_BY_SEARCH_LOCATION = gql`
  query GetAllBySearchLocation($contactNumber: String, $orgId: Float) {
    getAllBySearchLocation(contactNumber: $contactNumber, orgId: $orgId) {
      id
      xDeviceId
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
      geo_location {
        gps {
          longitude
          latitude
        }
        Ignition
        timestamp
        Movement
        Data_Mode
        Sleep_Mode
        Ext_Voltage
        Speed
        Battery_Voltage
        Battery_Current
        GSM_Operator
        Trip_Odometer
        Total_Odometer
      }
      device {
        id

        network {
          id
          type
          ip
          network
          serialNo
          number
          Package
          purchasedDate
          status
        }
        type
        brand
        model
        serial
        serverPort
        imei
        password
        installBy
        installLocation
        installDate
        vendor
        purchaseDate
        status
      }
      client {
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
  }
`;

export const GET_JOURNEY = gql`
  query GetJourney($date: String, $locationId: Float) {
    getJourney(date: $date, locationId: $locationId) {
      startTime
      avgSpeed
      durationMin
      maxSpeed
      endTime
      gps {
        longitude
        latitude
      }
    }
  }
`;

export const GET_VEHICLE_COORDINATES = gql`
  query FindCoordinate($locationId: Float) {
    findCoordinate(locationId: $locationId) {
      gps {
        longitude
        latitude
        altitude
        angle
        speed
        satellites
      }
      Ignition
      timestamp
    }
  }
`;

export const GET_CLIENT_VEHICLE = gql`
  query GetAllBySearchLocation($orgId: Float, $clientId: Float) {
    getAllBySearchLocation(orgId: $orgId, clientId: $clientId) {
      id
      brand
      model
      year
      chassis
      engine

      geo_location {
        gps {
          longitude
          latitude
        }
      }
    }
  }
`;

export const GET_VEHICLE_COORDINATES_FROM_SEARCH_LOCATION = gql`
  query GetAllBySearchLocation($orgId: Float, $clientId: Float) {
    getAllBySearchLocation(orgId: $orgId, clientId: $clientId) {
      id
      geo_location {
        gps {
          longitude
          latitude
          altitude
          angle
          speed
          satellites
        }
        attributes
        Ignition
        timestamp
        Movement
        Data_Mode
        Sleep_Mode
        Ext_Voltage
        Speed
        Battery_Voltage
        Battery_Current
        GSM_Operator
        Trip_Odometer
        Total_Odometer
      }
    }
  }
`;

export const GET_ALL_EVENTS = gql`
  query GetAllEvents(
    $from: String
    $to: String
    $locationId: Float
    $type: String
  ) {
    getAllEvents(from: $from, to: $to, locationId: $locationId, type: $type) {
      type
      eventTime
      deviceId
      positionId
      geofenceId
      maintenanceId
      attributes
    }
  }
`;

export const GET_ALL_TRIPS = gql`
  query GetAllTrip($from: String, $to: String, $locationId: Float) {
    getAllTrip(from: $from, to: $to, locationId: $locationId) {
      averageSpeed
      deviceId
      deviceName
      distance
      driverName
      driverUniqueId
      duration
      endAddress
      endLat
      endLon
      endOdometer
      endPositionId
      endTime
      maxSpeed
      spentFuel
      startAddress
      startLat
      startLon
      startOdometer
      startPositionId
      startTime
    }
  }
`;
export const GET_ALL_ROUTES = gql`
  query GetAllRoute($from: String, $to: String, $locationId: Float) {
    getAllRoute(from: $from, to: $to, locationId: $locationId) {
      id
      attributes
      deviceId
      protocol
      serverTime
      deviceTime
      fixTime
      outdated
      valid
      latitude
      longitude
      altitude
      speed
      course
      address
      accuracy
      network
    }
  }
`;
export const GET_ALL_ROUTE = gql`
  query GetAllRoute($from: String, $to: String, $locationId: Float) {
    getAllRoute(from: $from, to: $to, locationId: $locationId) {
      id
      attributes
      deviceId
      protocol
      serverTime
      deviceTime
      fixTime
      outdated
      valid
      latitude
      longitude
      altitude
      speed
      course
      address
      accuracy
      network
    }
  }
`;

//Multi Querry for Routes and Trips

export const GET_ALL_ROUTES_AND_TRIPS = gql`
  query GetAllRoute(
    $from: String
    $to: String
    $locationId: Float
    $getAllTripFrom2: String
    $getAllTripTo2: String
    $getAllTripLocationId2: Float
  ) {
    getAllRoute(from: $from, to: $to, locationId: $locationId) {
      id
      attributes
      deviceId
      protocol
      serverTime
      deviceTime
      fixTime
      outdated
      valid
      latitude
      longitude
      altitude
      speed
      course
      address
      accuracy
      network
    }
    getAllTrip(
      from: $getAllTripFrom2
      to: $getAllTripTo2
      locationId: $getAllTripLocationId2
    ) {
      averageSpeed
      deviceId
      deviceName
      distance
      driverName
      driverUniqueId
      duration
      endAddress
      endLat
      endLon
      endOdometer
      endPositionId
      endTime
      maxSpeed
      spentFuel
      startAddress
      startLat
      startLon
      startOdometer
      startPositionId
      startTime
    }
  }
`;

export const GET_ALL_GEOFENCES = gql`
  query Query($page: Float, $limit: Float) {
    getGeofences(page: $page, limit: $limit) {
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

export const GET_GEOFENCES_BY_LOCATION_ID = gql`
  query Query($locationId: Float) {
    getGeofencesByLocationId(locationId: $locationId) {
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
