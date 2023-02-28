import React, { useEffect, useState } from 'react';
import UserEntity from '../Entity/UserEntity';
import * as Yup from "yup";
import { FormComponent } from '../Utils/FormComponent';
import InputModel from '../Models/InputModel';

import "../Styles/Form.css";
import SessionService from '../Services/SessionService';
import UserService from '../Services/UserService';
import { AxiosResponse } from 'axios';
import ResponseEntity from '../Entity/ResponseEntity';

import swal from 'sweetalert';
import { useParams } from 'react-router-dom';

function UpdateProfile() {
  const [role, setRole] = useState("");

  const userId = useParams().id;

  const [userEntity, setUserEntity] = useState<UserEntity>({
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
  const [inputArray, setInputArray] = useState<Array<InputModel>>([]);

  useEffect(() => {
    const userService = new UserService();
    
    let response: Promise<AxiosResponse<any, any>> = Number.isInteger(parseInt(userId as string)) ? userService.getUserDetails(parseInt(userId as string)) : userService.getUserProfile();

    response.then((response: AxiosResponse<any, any>) => {
      setUserEntity({
        userId: response.data.userId,
        name: response.data.name,
        email: response.data.email,
        address: response.data.address,
        contact: response.data.contact,
        age: response.data.age,
        password: "",
        shopName: response.data.shopName,
        licenceNo: response.data.licenceNo,
        role: ""
      });

      setRole(response.data.role[0].name.toString());

    }).catch((error: any) => {
      console.log(error);
    })

  }, []);

  useEffect(() => {
    let inputs: Array<InputModel> = [];

    if(role === "ROLE_TRAINER"){
      console.log("Tainer");
      Object.entries(userEntity).forEach(([key, value]) => {
        inputs.push({
          id: inputs.length + 1,
          name: key.toString(),
          type: key === "email" ? "email" : key === "age" ? "number" : "text",
          value: value as (string | number),
          lable: `Enter Your ${key.toString().charAt(0).toUpperCase() + key.toString().substring(1, key.toString().length).toLowerCase()}: `,
          display: (key.toString() === "userId" || key.toString() === "role" || key.toString() === "password") ? false : true
        });
      });
    }else{
      console.log(role);
      Object.entries(userEntity).forEach(([key, value]) => {
        inputs.push({
          id: inputs.length + 1,
          name: key.toString(),
          type: key === "email" ? "email" : key === "age" ? "number" : "text",
          value: value as (string | number),
          lable: `Enter Your ${key.toString().charAt(0).toUpperCase() + key.toString().substring(1, key.toString().length).toLowerCase()}: `,
          display: (key.toString() === "userId" || key.toString() === "role" || key.toString() === "password" || key.toString() === "shopName" || key.toString() === "licenceNo") ? false : true
        });
      });
    }

    setInputArray(inputs);
    
  }, [role]);

  const updateProfileFormSchema = (role === "ROLE_ADMIN" || role === "ROLE_USER") ? Yup.object().shape({
    name: Yup.string().min(5, 'Name sould be min 5 letters').max(50, 'Name sould be max 50 letters').required('Name is Required'),
    email: Yup.string().email('Enter a Valid Email').required('Email is Required'),
    contact: Yup.string().min(10, 'Contact sould be 10 digits').max(10, 'Contact sould be 10 digits').required('Contact is Required'),
    age: Yup.number().min(18, 'Age required is 18').max(120, 'Age is not Valid').required('Age is Required'),
    address: Yup.string().min(5, 'Address sould be min 5 letters').max(500, 'Address sould be max 500 letters').required('Address is Required'),
  }) : Yup.object().shape({
    name: Yup.string().min(5, 'Name sould be min 5 letters').max(50, 'Name sould be max 50 letters').required('Name is Required'),
    email: Yup.string().email('Enter a Valid Email').required('Email is Required'),
    contact: Yup.string().min(10, 'Contact sould be 10 digits').max(10, 'Contact sould be 10 digits').required('Contact is Required'),
    age: Yup.number().min(18, 'Age required is 18').max(120, 'Age is not Valid').required('Age is Required'),
    address: Yup.string().min(5, 'Address sould be min 5 letters').max(500, 'Address sould be max 500 letters').required('Address is Required'),
    shopName: Yup.string().min(5, 'Shop Name sould be min 5 letters').max(50, 'Shop Name sould be max 50 letters').required('Shop Name is Required'),
    licenceNo: Yup.string().required('Liscence No is Required,')
  });

  const handleUpdateProfile = (data: Object) => {
    console.log(data);
    let userId: number | null = userEntity.userId;

    const userService = new UserService();
    let response: Promise<AxiosResponse<any, any>> = userService.updateProfile(userId as number, data);

    response.then((response) => {
      const success: ResponseEntity = {
        status: (response.status >= 200 && response.status <= 299) ? "SUCCESS" : "FAILED",
        success: (response.status >= 200 && response.status <= 299) ? true : false,
        error: (response.status >= 200 && response.status <= 299) ? {} : { error: "Something Wrong Happened" }
      }
      console.log(success);

      swal({
        title: success.status?.toString(),
        text: "Data Update Successful",
        icon: "success",
      }).then(() => window.location.href = (window.location.pathname === "/updateprofile") ? "/profile" : "/userlist");

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

  return (
    <div className="container-fluid">
      <div className="row" id="wrapper-form">
        <div className="col-sm-12 d-flex flex-column justify-content-center align-items-center">
          <FormComponent values={userEntity} inputArray={inputArray} validationSchema={updateProfileFormSchema} onFormSubmit={handleUpdateProfile} />
        </div>
      </div>
    </div>
  )
}

export default UpdateProfile