import React, { useEffect, useState } from 'react'
import LoginEntity from '../Entity/LoginEntity'
import InputModel from '../Models/InputModel';
import * as Yup from "yup";
import { FormComponent } from '../Utils/FormComponet';

function Login() {
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