import instance, { BaseResponse } from "../../lib/axios/config";
import { LoginRequest, RegisterRequest } from "./authRequest";
import { LoginResponse } from "./authResponse";

export function Register(request: RegisterRequest) {
    return instance.get(`/auth`)
        .then( (response) => { return response })
        .catch( (error) => { return error });
}

export function Login(request: LoginRequest): Promise<BaseResponse<LoginResponse>>  {
    return instance.post<BaseResponse<LoginResponse>>(`/auth/login`, request)
        .then( (response) => { return response })
        .catch( (error) => { return error });
}
