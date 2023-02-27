import UserEntity from "../Entity/UserEntity";
import httpClient, { AxiosResponse } from "axios";
import SessionService from "./SessionService";
import ResponseEntity from "../Entity/ResponseEntity";
const MAIN_URL = "http://localhost:8082/backend/api";

class UserService{
    signupUser(userEntity: object): Promise<AxiosResponse<any, any>>{
        let session = new SessionService();
        const token = session.getLoggedInUserToken();

        let config = {
           
        }

        return httpClient.post(MAIN_URL+"/public/register", userEntity, config);
    }

    authenticateUser(loginEntity: object): Promise<AxiosResponse<any, any>>{
        let session = new SessionService();
        const token = session.getLoggedInUserToken();

        let config = {
            
        }

        return httpClient.post(MAIN_URL+"/public/login", loginEntity, config);
    }

    getUserProfile(): Promise<AxiosResponse<any, any>>{
        let session = new SessionService();
        const token = session.getLoggedInUserToken();

        let config = {
            headers: {
                authorization: "Bearer " + token
            }
        }

        console.log(config);
        return httpClient.get(MAIN_URL+"/user/profile", config);
    }
}

export default UserService;