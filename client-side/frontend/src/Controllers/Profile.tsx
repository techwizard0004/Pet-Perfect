import React, { useEffect, useState } from 'react'
import UserEntity from '../Entity/UserEntity';
import "../Styles/Profile.css";
import UserLogo from "../Assets/user.png";
import SessionService from '../Services/SessionService';

function Profile() {
    const session = new SessionService();
    if(session.isUserLoggedIn() !== true){
        window.location.href = "/login";
    }

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
        role: ""
    });

    useEffect(() => {
       
    }, []);

    const handleLogoutButtonClick = () => {
        const session = new SessionService();
        session.logoutAndDestroySession();
        console.log("Logged Out Successfully");

        window.location.href = "/home";
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