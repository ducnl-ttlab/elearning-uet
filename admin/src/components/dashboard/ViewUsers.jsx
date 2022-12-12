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
import { doGetUserList, doEditUserList } from "../../redux/actions";

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
      setUsers([
        ...store.userList.users.map((item) => {
          return {
            ...item,
            address: (item.address && item.address) || " ",
          };
        }),
      ]);
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
  const handleEditRow = (newValue, oldValue, rowData, columnDef) => {
    let body = {
      [columnDef.field]: newValue,
    };

    return new Promise((resolve, reject) => {
      dispatch(doEditUserList(rowData.id, body));
      setTimeout(resolve, 0);
    });
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
            editable: "never",
            cellStyle: { width: "10%" },
          },
          {
            title: "Họ tên",
            field: "username",
            cellStyle: { width: "12%" },
          },
          {
            title: "Địa chỉ email",
            field: "email",
            editable: "never",
            cellStyle: { width: "18%" },
          },
          {
            title: "Số điện thoại",
            field: "phone",

            cellStyle: { width: "12%" },
          },
          {
            title: "Nơi ở hiện tại",
            field: "address",
            cellStyle: { width: "20%" },
          },
          {
            title: "Vai trò",
            field: "role",
            lookup: { instructor: "Giảng viên", student: "Học viên" },
            editable: "never",
            cellStyle: { width: "12%" },
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
        cellEditable={{
          cellStyle: {},
          onCellEditApproved: handleEditRow,
        }}
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
