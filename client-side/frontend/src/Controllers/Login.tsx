import React, { useEffect, useState } from 'react'
import LoginEntity from '../Entity/LoginEntity'
import InputModel from '../Models/InputModel';
import * as Yup from "yup";
import { FormComponent } from '../Utils/FormComponent';
import SessionService from '../Services/SessionService';
import { AxiosResponse } from 'axios';
import swal from 'sweetalert';
import UserService from '../Services/UserService';
import ResponseEntity from '../Entity/ResponseEntity';

function Login() {
  const session = new SessionService();
  if(session.isUserLoggedIn()){
    window.location.href = "/profile";
  }
  
    const [loginEntity, setLoginEntity] = useState<LoginEntity>({
        email: "",
        password: ""
    });

    const [inputArray, setInputArray] = useState<Array<InputModel>>([]);
    
    useEffect(() => {
        let inputs: Array<InputModel> = [];
        Object.entries(loginEntity).forEach(([key, value]) => {
          inputs.push({
            id: inputs.length + 1,
            name: key.toString(),
            type: key === "email" ? "email" : "password",
            value: value as (string | number),
            lable: `Enter Your ${key.toString().charAt(0).toUpperCase() + key.toString().substring(1, key.toString().length).toLowerCase()}: `,
            display: true
          });
        });
    
        setInputArray(inputs);
    }, []);

    const loginFormSchema = Yup.object().shape({
        email: Yup.string().email('Enter a Valid Email').required('Email is Required'),
        password: Yup.string().required('Password is Reqired')
      });

      const handleLoginUser = (data: Object) => {
        console.log(data);
        const userService = new UserService();
    let response: Promise<AxiosResponse<any, any>> = userService.authenticateUser(data);


    response.then((response) => {
      const success: ResponseEntity = {
        status: (response.status >= 200 && response.status<=299) ? "SUCCESS" : "FAILED",
        success: (response.status >= 200 && response.status<=299) ? true: false,
        error: (response.status >= 200 && response.status<=299) ? {} : {error: "Something Wrong Happened"}
      }
      console.log(success);

      const session = new SessionService();
      if(response.data.authenticated === true){
        session.loginAndCreatSession(response.data.userId, response.data.role[0], response.data.token);
        swal({
          title: success.status?.toString(),
          text: "Login Successful",
          icon: "success",
        }).then(() => window.location.href = "/profile");
      }else{
        swal({
          title: "FAILED",
          text: "Something Wrong Happened",
          icon: "warning",
        });
      }
      
      
      
   }).catch((error) => {
       
       const faliure: ResponseEntity = {
          status: "FAILED",
          success: false,
          error: error.response.data.error.message === undefined ? "Bad Credentials" : error.response.data.error.message
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
            <FormComponent values={loginEntity} inputArray={inputArray} validationSchema={loginFormSchema} onFormSubmit={handleLoginUser} />
          </div>
        </div>
      </div>
    )
}

export default Login