import axios from "axios";
import { BASE_DEMO_URL, BASE_URL, IS_DEMO } from "../../config";
// import interceptor from "./interceptors";

export interface BaseResponse<T> {
  data: T;
  message: string;
  statusCode: number;
  error?: string;
}


const instance = axios.create({ baseURL: IS_DEMO ? BASE_DEMO_URL : BASE_URL });
// interceptor();

export default instance;
