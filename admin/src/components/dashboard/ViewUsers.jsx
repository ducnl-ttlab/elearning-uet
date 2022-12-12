import React, { useState, useEffect } from "react";
import Material from "material-table";
import MaterialTable from "material-table";
import styled from "styled-components";
import AdminService from "../../service/AdminService";
import Popup from "../common/popup";
import Toast from "../common/toast.jsx";
import showToast from "../common/toast.js";
import {
  Warning,
  BuildIcon,
  ClearIcon,
  AccountCircleIcon,
} from "../common/icons";
import { useSelector, useDispatch } from "react-redux";
import { doGetUserList } from "../../redux/actions";

function ViewUsers() {
  const [getUsers, setUsers] = useState([
    {
      username: "",
      email: "",
      phone: "",
      address: "",
      role: "",
      avatar: "",
    },
  ]);
  const [toastList, setToastList] = useState([]);

  const dispatch = useDispatch();
  const store = useSelector((state) => state.store);

  useEffect(() => {
    dispatch(doGetUserList());
  }, []);

  useEffect(() => {
    if (store.userList.users.length > 1) {
      setUsers([...store.userList.users]);
    }
  }, [store.userList.users]);

  const handleUpdateUsers = async (event, data) => {
    setToastList([
      showToast(
        "success",
        "Thông báo!",
        "Người dùng này đã trở thành giảng viên!"
      ),
    ]);
    let index = getUsers.findIndex((v) => v.id === data.id);
    let newArr = [...getUsers];
    newArr[index].role = 1;
    setUsers(newArr);
  };

  return (
    <Wrap>
      <MaterialTable
        title={"Danh sách người dùng - " + getUsers.length + " người dùng"}
        style={{ padding: 10 }}
        data={getUsers}
        columns={[
          {
            title: "Avatar",
            field: "avatar",
            render: (rowData) =>
              rowData.avatar ? (
                <img
                  src={rowData.avatar}
                  style={{ width: 50, height: 50, borderRadius: "50%" }}
                />
              ) : (
                <AccountCircleIcon
                  style={{ width: 50, height: 50, borderRadius: "50%" }}
                />
              ),
            cellStyle: { width: 1 },
          },
          { title: "Họ tên", field: "username", width: "1%" },
          { title: "Địa chỉ email", field: "email" },
          { title: "Số điện thoại", field: "phone" },
          { title: "Nơi ở hiện tại", field: "address" },
          {
            title: "Vai trò",
            field: "role",
            lookup: { instructor: "Giảng viên", student: "Học viên" },
          },
        ]}
        actions={[
          (rowData) =>
            rowData.role === "guest" && {
              icon: "upgradeOutlinedIcon",
              tooltip: "Trở thành giảng viên",
              onClick: (event, rowData) => handleUpdateUsers(event, rowData),
            },
        ]}
        options={{
          actionsColumnIndex: -1,
          pageSize: 10,
          headerStyle: {
            backgroundColor: "#039be5",
            color: "#FFF",
          },
          rowStyle: {
            backgroundColor: "#EEE",
            padding: 5,
          },
        }}
      />
    </Wrap>
  );
}

export default ViewUsers;

const Wrap = styled.div`
  background-color: white;
  width: 80vw;
  height: 90vh;
  overflow-y: auto;
  padding: 1rem 1rem;
`;
