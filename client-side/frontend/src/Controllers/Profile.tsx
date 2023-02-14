import React, { useEffect, useState } from 'react'
import UserEntity from '../Entity/UserEntity';
import "../Styles/Profile.css";
import UserLogo from "../Assets/user.png";

function Profile() {
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
        userRole: ""
    });

    useEffect(() => {
        setUserEntity({
            id: 1,
            name: "Soumik Sarkar",
            email: "soumik123@gmail.com",
            address: "290, Parsekar Cottage, Sahar Rd., Dhaka Johar, Mukherjee Nagar, Delhi, 560028",
            contact: "9023145924",
            age: 30,
            password: "",
            shopName: "",
            licenceNo: "",
            userRole: "ROLE_USER",
        })
    }, []);

    const handleLogoutButtonClick = () => {
        console.log("Logged Out Successfully");
    }

    return (
        <div className="container-fluid">
            <div className="row" id="wrapper-profile">
                <div className="col-sm-12 d-flex flex-column justify-content-center align-items-center">
                    <div className="card">
                        <div className="imghld d-flex justify-content-center">
                            <img src={UserLogo} alt="user" />
                        </div>
                        <div className="bdyhld">
                            {
                                Object.entries(userEntity).filter(([key, value]) => value != "").map(([key, value]) =>
                                    <h4><b>{key.toString().charAt(0).toUpperCase() + key.toString().substring(1, key.toString().length).toLowerCase()}</b>: {value}</h4>
                                )
                            }
                            <div className="btnhld d-flex btn-group-vertical flex-column justify-content-center align-items-center">
                                <a href="/updateprofile"><button>Update-Profile</button></a><br />
                                <button onClick={handleLogoutButtonClick}>Logout-Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile