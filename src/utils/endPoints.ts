/**
 * End Point API
 */

import {API_ENDPOINT} from "../../env";
export const END_TRIP_PHOTO = "https://end-trip-photo.s3.eu-west-3.amazonaws.com/";

/**
 * Microservices
 */

export const BASE_URL = API_ENDPOINT + "/v2";

//authentication -------------------------------------------------------------------------------------------------------
export const POST_AUTH_LOGIN = `${BASE_URL}/auth/login`;
//admin ----------------------------------------------------------------------------------------------------------------
export const GET_ADMIN_ME = `${BASE_URL}/admins/me`;
//List-cities ----------------------------------------------------------------------------------------------------------
export const GET_CITIES = `${BASE_URL}/cities/?order=DESC&orderby=name`;
export const GET_CITY_POLYGONS = `${BASE_URL}/cities/polygons`;
export const GET_CITY_RED_ZONES = `${BASE_URL}/cities/red-zones`;

//Spots ----------------------------------------------------------------------------------------------------------------
export const GET_SPOTS = `${BASE_URL}/spots/near-by`;
// Notifications -------------------------------------------------------------------------------------------------------
export const PUT_USER_DEVICE_TOKEN = `${BASE_URL}/notifications/update-token`;
//Events ---------------------------------------------------------------------------------------------------------------
export const POST_LOCKS_NOTIFICATION = `${BASE_URL}/event-log/lock-change`;
//Bikes ----------------------------------------------------------------------------------------------------------------
const BIKE_ENDPOINT = `${BASE_URL}/bikes`;
export const GET_BIKES_TECHNICIAN = `${BIKE_ENDPOINT}/technician`;
export const GET_BIKES_DETAILS = (id: number | string) => `${BIKE_ENDPOINT}/detail/${id}`;
export const GET_BIKES_POSITION = (bikeId: string | number) => `${BIKE_ENDPOINT}/positions/${bikeId}`;
export const POST_BIKES = `${BIKE_ENDPOINT}/`;
export const PUT_BIKES_LOCK = `${BIKE_ENDPOINT}/lock`;
export const PUT_BIKES_TRACKER = `${BIKE_ENDPOINT}/tracker`;
export const GET_BIKES_EKEY = (id: number | string) => `${BIKE_ENDPOINT}/ekeys/${id}`;
export const PUT_BIKES = `${BIKE_ENDPOINT}/`;
export const PUT_BIKES_ADDRESS = (id: number | string) => `${BIKE_ENDPOINT}/address/${id}`;
export const PUT_BIKES_POSITION = (id: number | string) => `${BIKE_ENDPOINT}/position/${id}`;
//Storage --------------------------------------------------------------------------------------------------------------
export const CREATE_PRESIGNED_URL = `${BASE_URL}/storage/create-presigned-url`;
//Reports --------------------------------------------------------------------------------------------------------------
const REPORT_ENDPOINT = `${BASE_URL}/reports`;
export const GET_LAST_REPORT = (id: number | string) => `${REPORT_ENDPOINT}/${id}`;
export const GET_HISTORY_BIKE_REPORT = (id: number | string) => `${REPORT_ENDPOINT}/history/bike/${id}`;
export const POST_REPORTS = `${REPORT_ENDPOINT}/`;

//Review ---------------------------------------------------------------------------------------------------------------
const REVIEW_ENDPOINT = `${BASE_URL}/reviews`;
export const GET_LAST_REVIEW = (bike_id: number | string) => `${REVIEW_ENDPOINT}/bike/${bike_id}`;

// Trips ---------------------------------------------------------------------------------------------------------------
const TRIPS_ENDPOINT = `${BASE_URL}/trips`;
export const GET_TRIP_DETAILS = (tripId: string | number) => `${TRIPS_ENDPOINT}/${tripId}/details`;
export const GET_TRIPS_END_COORDS = `${TRIPS_ENDPOINT}/end-coordinates`;


