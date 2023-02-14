import React from 'react';
import "../Styles/SignupRoute.css";

function SignupRoute() {
    return(
        <div className="container-fluid">
        <div className="row" id="wrapper-signuproute">
            <div className="col-sm-12 d-flex flex-column justify-content-center align-items-center">
                <div className="card">
                    <h3>Instructions: </h3>
                    <h6>1. If you have a Pet signup as User</h6>
                    <h6>2. If you are Pet Trainer signup as Trainer</h6>
                    <h6>3. After signup your data will be verfied by our Admin</h6>
                    <h6>4. When its's checked you will receive a email</h6>
                    <h6>5. Then you can login with your email and password</h6>
                    <h3>Signup As: </h3>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <a href="/signup/user"><button type="button">User</button></a>
                        <a href="/signup/trainer"><button type="button" className="mx-2">Trainer</button></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )

}
export default SignupRoute;