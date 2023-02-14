import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import UserEntity from '../Entity/UserEntity';
import * as Yup from "yup";
import { FormComponent } from '../Utils/FormComponet';
import InputModel from '../Models/InputModel';
import "../Styles/Form.css";
import SessionService from '../Services/SessionService';
import UserService from '../Services/UserService';
import ResponseEntity from '../Entity/ResponseEntity';
import swal from 'sweetalert';
import { AxiosResponse } from 'axios';

function Signup() {
  const session = new SessionService();
  if(session.isUserLoggedIn()){
    window.location.href = "/profile";
  }

  const role = useParams().role;
  const [userEntity, setUserEntity] = useState<UserEntity>({
    id: 0,
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
    setUserEntity({
      id: 0,
      name: "",
      email: "",
      address: "",
      contact: "",
      age: 0,
      password: "",
      shopName: "",
      licenceNo: "",
      role: role === "user" ? "ROLE_USER" : "ROLE_TRAINER",
    });

    let inputs: Array<InputModel> = [];
    Object.entries(userEntity).forEach(([key, value]) => {
      inputs.push({
        id: inputs.length + 1,
        name: key.toString(),
        type: key === "email" ? "email" : key === "age" ? "number" : key === "password" ? "password" : "text",
        value: value as (string | number),
        lable: `Enter Your ${key.toString().charAt(0).toUpperCase() + key.toString().substring(1, key.toString().length).toLowerCase()}: `,
        display: (key.toString() === "id" || key.toString() === "role") ? false : key === "shopName" && role === "user" ? false : key.toString() === "licenceNo" && role === "user" ? false : true
      });
    });

    setInputArray(inputs);

  }, []);

  const signupFormSchema = role === "user" ? Yup.object().shape({
    name: Yup.string().min(5, 'Name sould be min 5 letters').max(50, 'Name sould be max 50 letters').required('Name is Required'),
    email: Yup.string().email('Enter a Valid Email').required('Email is Required'),
    contact: Yup.string().min(10, 'Contact sould be 10 digits').max(10, 'Contact sould be 10 digits').required('Contact is Required'),
    age: Yup.number().min(18, 'Age required is 18').max(120, 'Age is not Valid').required('Age is Required'),
    address: Yup.string().min(5, 'Address sould be min 5 letters').max(500, 'Address sould be max 500 letters').required('Address is Required'),
    password: Yup.string().required('Password is Reqired').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&_])(?=.{8,15})/, 'Must Contain 8 to 15 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'),
  }) : Yup.object().shape({
    name: Yup.string().min(5, 'Name sould be min 5 letters').max(50, 'Name sould be max 50 letters').required('Name is Required'),
    email: Yup.string().email('Enter a Valid Email').required('Email is Required'),
    contact: Yup.string().min(10, 'Contact sould be 10 digits').max(10, 'Contact sould be 10 digits').required('Contact is Required'),
    age: Yup.number().min(18, 'Age required is 18').max(120, 'Age is not Valid').required('Age is Required'),
    address: Yup.string().min(5, 'Address sould be min 5 letters').max(500, 'Address sould be max 500 letters').required('Address is Required'),
    password: Yup.string().required('Password is Reqired').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&_])(?=.{8,15})/, 'Must Contain 8 to 15 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'),
    shopName: Yup.string().min(5, 'Shop Name sould be min 5 letters').max(50, 'Shop Name sould be max 50 letters').required('Shop Name is Required'),
    licenceNo: Yup.string().required('Liscence No is Required,')
  });

  const handleSignupUser = (data: Object) => {
    console.log(data);

    const userService = new UserService();
    let response: Promise<AxiosResponse<any, any>> = userService.signupUser(data);


    response.then((response) => {
      const success: ResponseEntity = {
        status: (response.status >= 200 && response.status<=299) ? "SUCCESS" : "FAILED",
        success: (response.status >= 200 && response.status<=299) ? true: false,
        error: (response.status >= 200 && response.status<=299) ? {} : {error: "Something Wrong Happened"}
      }
      console.log(success);
      
      swal({
        title: success.status?.toString(),
        text: "Signup Successful",
        icon: "success",
      }).then(() => window.location.href = "/login");
      
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
          <FormComponent values={userEntity} inputArray={inputArray} validationSchema={signupFormSchema} onFormSubmit={handleSignupUser} />
        </div>
      </div>
    </div>
  )
}

export default Signup