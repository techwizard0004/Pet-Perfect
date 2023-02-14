import UserEntity from "../Entity/UserEntity";
import httpClient, { AxiosResponse } from "axios";
import SessionService from "./SessionService";
import ResponseEntity from "../Entity/ResponseEntity";
const MAIN_URL = "http://localhost:8082/backend/api";

class UserService{
    signupUser(userEntity: object): Promise<AxiosResponse<any, any>>{
        let session = new SessionService();
        const token = session.getLoggedInUserToken();

        var config = {
            // headers: {
            //     authorization: "bearer " + token
            // }
        }

        return httpClient.post(MAIN_URL+"/public/register", userEntity, config);
    }

    authenticateUser(loginEntity: object): Promise<AxiosResponse<any, any>>{
        let session = new SessionService();
        const token = session.getLoggedInUserToken();

        var config = {
            // headers: {
            //     authorization: "bearer " + token
            // }
        }

        return httpClient.post(MAIN_URL+"/public/login", loginEntity, config);
    }
}

export default UserService;