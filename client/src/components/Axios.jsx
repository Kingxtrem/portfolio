import axios from 'axios';

const baseUrl = "https://portfolio-kappa-three-34.vercel.app"
// const baseUrl = "http://localhost:5000"
const Axios = axios.create({
    baseURL: baseUrl
});
export default Axios;
