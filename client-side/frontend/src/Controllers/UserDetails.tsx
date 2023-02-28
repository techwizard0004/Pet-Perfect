import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ResponseEntity from '../Entity/ResponseEntity';
import UserEntity from '../Entity/UserEntity';
import UserService from '../Services/UserService';
import swal from 'sweetalert';
import CardCallbackModel from '../Models/CardCallbackModel';
import CardComponent from '../Utils/CardComponent';
import "../Styles/Card.css";


function UserDetails() {
    const userId: number = parseInt(useParams().id as string);
    const [userEntity, setuserEntity] = useState<UserEntity>({
        userId: 0,
        name: "",
        email: "",
        address: "",
        contact: "",
        age: 0,
        password: "",
        shopName: "",
        licenceNo: "",
        role: "",
    });
    const [active, setActive] = useState<string>("");


    useEffect(() => {
        const userService = new UserService();
        let response: Promise<AxiosResponse<any, any>> = userService.getUserDetails(userId);

        response.then((response) => {
            let tempUser: UserEntity = response.data;
            let roles: any[] = tempUser.role as Array<Object>;

            setuserEntity({
                userId: tempUser.userId,
                name: tempUser.name,
                email: tempUser.email,
                address: tempUser.address,
                contact: tempUser.contact,
                age: tempUser.age,
                password: "",
                shopName: tempUser.shopName,
                licenceNo: tempUser.licenceNo,
                role: roles[0].name
            });
        }).catch((error) => console.log(error));

        response = userService.isUserActiveOrDeactive(userId);
        response.then((response) => {
            setActive(response.data as string);
        }).catch((error) => console.log(error));

    }, []);

    const updateUserData = () => {
        window.location.href = `/updateuser/${userId}`;
    }

    const activateOrDeactivateUser = () => {
        const userService = new UserService();
        let response: Promise<AxiosResponse<any, any>> = active === "ACTIVE" ? userService.deActivateUser(userId) : userService.activateUser(userId);

        response.then((response) => {
            const success: ResponseEntity = {
                status: (response.status >= 200 && response.status <= 299) ? "SUCCESS" : "FAILED",
                success: (response.status >= 200 && response.status <= 299) ? true : false,
                error: (response.status >= 200 && response.status <= 299) ? {} : { error: "Something Wrong Happened" }
            }
            console.log(success);

            swal({
                title: success.status?.toString(),
                text: "Status Change Successful",
                icon: "success",
            }).then(() => window.location.href = "/userlist");

        }).catch((error) => {

            const faliure: ResponseEntity = {
                status: "FAILED",
                success: false,
                error: error.response.data.error.message
            }
            console.log(error);

            swal({
                title: faliure.status?.toString(),
                text: faliure.error as string,
                icon: "warning",
            });
        });
    }

    let callBackMethods: CardCallbackModel = {
        updateMethodName: "Update User",
        updateCallbackMethod: () => updateUserData(),
        removeMethodName: active === "ACTIVE" ? "Deactive-User" : "Active-User",
        removeCallbackMethod: () => activateOrDeactivateUser()
    }


    return (
        <div className="container-fluid">
            <div className="row" id="wrapper-card">
                <div className="col-sm-12 d-flex flex-column justify-content-center align-items-center">
                    <CardComponent displayEntity={userEntity as Object} callBackMethods={callBackMethods} />
                </div>
            </div>
        </div>
    )
}

export default UserDetails