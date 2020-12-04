import axios from 'axios';

/** Base url to make requests to the database */
const instance = axios.create({
    baseURL: "http://localhost:8000/",
});

export default instance;