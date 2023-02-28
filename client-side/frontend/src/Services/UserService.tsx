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
        
        return httpClient.get(MAIN_URL+"/user/profile", config);
    }

    getAllUsersList(): Promise<AxiosResponse<any, any>>{
        let session = new SessionService();
        const token = session.getLoggedInUserToken();

        let config = {
            headers: {
                authorization: "Bearer " + token
            }
        }

        return httpClient.get(MAIN_URL+"/user/get-all", config);
    }

    getUserDetails(userId: number): Promise<AxiosResponse<any, any>>{
        let session = new SessionService();
        const token = session.getLoggedInUserToken();

        let config = {
            headers: {
                authorization: "Bearer " + token
            }
        }

        return httpClient.get(`${MAIN_URL}/user/details-id?id=${userId}`, config);
    }

    activateUser(userId: number): Promise<AxiosResponse<any, any>>{
        let session = new SessionService();
        const token = session.getLoggedInUserToken();

        let config = {
            headers: {
                authorization: "Bearer " + token
            }
        }

        return httpClient.put(`${MAIN_URL}/user/activate?id=${userId}`, null, config);
    }

    deActivateUser(userId: number): Promise<AxiosResponse<any, any>>{
        let session = new SessionService();
        const token = session.getLoggedInUserToken();

        let config = {
            headers: {
                authorization: "Bearer " + token
            }
        }

        return httpClient.put(`${MAIN_URL}/user/deactivate?id=${userId}`, null, config);
    }

    isUserActiveOrDeactive(userId: number): Promise<AxiosResponse<any, any>>{
        let session = new SessionService();
        const token = session.getLoggedInUserToken();

        let config = {
            headers: {
                authorization: "Bearer " + token
            }
        }

        return httpClient.get(`${MAIN_URL}/user/is-active-or-deactive?id=${userId}`, config);
    }

    updateProfile(userId: number, userEntity: Object){
        let session = new SessionService();
        const token = session.getLoggedInUserToken();

        let config = {
            headers: {
                authorization: "Bearer " + token
            }
        }

        return httpClient.put(`${MAIN_URL}/user/profile/update?id=${userId}`, userEntity, config);
    }
}

export default UserService;