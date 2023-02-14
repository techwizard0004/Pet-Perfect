import React, { useEffect, useState } from 'react';
import UserEntity from '../Entity/UserEntity';
import * as Yup from "yup";
import { FormComponent } from '../Utils/FormComponet';
import InputModel from '../Models/InputModel';

import "../Styles/Form.css";
function UpdateProfile() {
  const role = "ROLE_TRAINER";
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
    userRole: "",
  });
  const [inputArray, setInputArray] = useState<Array<InputModel>>([]);

  useEffect(() => {
    setUserEntity({
      id: 2,
      name: "Samrat Ganguly",
      email: "samratg@gmail.com",
      address: "290, Parsekar Cottage, Sahar Rd., Dhaka Johar, Mukherjee Nagar, Delhi, 560028",
      contact: "9860213456",
      age: 20,
      password: "",
      shopName: "Samrat Pet Shop",
      licenceNo: "RGY09234",
      userRole: role,
    });

    let inputs: Array<InputModel> = [];
    Object.entries(userEntity).forEach(([key, value]) => {
      inputs.push({
        id: inputs.length + 1,
        name: key.toString(),
        type: key === "email" ? "email" : key === "age" ? "number" : key === "password" ? "password" : "text",
        value: value as (string | number),
        lable: `Enter Your ${key.toString().charAt(0).toUpperCase() + key.toString().substring(1, key.toString().length).toLowerCase()}: `,
        display: (key.toString() === "id" || key.toString() === "userRole" || key.toString() === "password") ? false : true
      });
    });

    setInputArray(inputs);

  }, []);

  const updateProfileFormSchema = Yup.object().shape({
    name: Yup.string().min(5, 'Name sould be min 5 letters').max(50, 'Name sould be max 50 letters').required('Name is Required'),
    email: Yup.string().email('Enter a Valid Email').required('Email is Required'),
    contact: Yup.string().min(10, 'Contact sould be 10 digits').max(10, 'Contact sould be 10 digits').required('Contact is Required'),
    age: Yup.number().min(18, 'Age required is 18').max(120, 'Age is not Valid').required('Age is Required'),
    address: Yup.string().min(5, 'Address sould be min 5 letters').max(500, 'Address sould be max 500 letters').required('Address is Required'),
    shopName: Yup.string().min(5, 'Shop Name sould be min 5 letters').max(50, 'Shop Name sould be max 50 letters').required('Shop Name is Required'),
    licenceNo: Yup.string().required('Liscence No is Required,')}
  );

  const handleUpdateProfile = (data: Object) => {
    console.log(data);
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