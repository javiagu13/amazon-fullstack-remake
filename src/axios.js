import axios from "axios";

const instance = axios.create({
    baseURL: 'http://127.0.0.1:5001/db-33fb1/us-central1/api' // THE API URL (cloud function)
});

export default instance;