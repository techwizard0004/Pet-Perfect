import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react'
import UserEntity from '../Entity/UserEntity';
import SessionService from '../Services/SessionService';
import UserService from '../Services/UserService';
import { TableComponent } from '../Utils/TableComponent';
import "../Styles/Table.css";
import ListOutputModel from '../Models/ListOutputModel';

function UserLists() {
  const [userList, setUserList] = useState<Array<UserEntity>>([]);
  const [headers, setHeaders] = useState<any>([]);
  const [dataList, setDataList] = useState<any>([]);

  const session = new SessionService();
  if (session.isUserLoggedIn() !== true) {
    window.location.href = "/login";
  }
  else if (session.getLoggedInUserRole() !== "ROLE_ADMIN") {
    window.location.href = "/profile";
  }

  useEffect(() => {
    const userService = new UserService();
    let response: Promise<AxiosResponse<any, any>> = userService.getAllUsersList();

    response.then((response) => {
      let tempList: UserEntity[] = [];

      tempList = response.data as UserEntity[];
      setUserList(tempList);

    }).catch((error) => console.log(error));

  }, []);

  useEffect(() => {

    let tempHeader: any[] = [];
    let tempData: any[][] = [];

    userList.map(user => {
      let userData: any[] = [];
      Object.entries(user).map(([key, value]) => {
        if (key === "role") {
          userData.push(value[0].name);
        } else {
          userData.push(value);
        }
      });
      tempData.push(userData);
    });

    let userEntity: UserEntity = {
      userId: null,
      name: null,
      email: null,
      contact: null,
      address: null,
      age: null,
      password: null,
      shopName: null,
      licenceNo: null,
      role: null
    };

    Object.keys(userEntity).forEach(header => {
      if (header !== "password") {
        tempHeader.push(header.toString());
      }
    });
    setDataList(tempData);
    setHeaders(tempHeader);


  }, [userList]);


  const redirectCallbackMethod = (id: number) => {
    window.location.href = `/userdetails/${id}`

  }

  let tableContent: ListOutputModel = {
    headers: headers,
    dataList: dataList,
    redirectCallbackMethod: redirectCallbackMethod
  }

  return (
    <div className="container-fluid">
      <div className="row" id="wrapper-listpage">
        <div className="col-sm-12">
          <div className="table-responsive">
            <TableComponent tableContent={tableContent} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserLists