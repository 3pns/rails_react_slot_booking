import axios, {isCancel, AxiosError} from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export default apiClient;
export { apiClient }