import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import styled from "styled-components";
import { AccountCircleIcon } from "../common/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  doGetUserList,
  doEditUserList,
  doUpdateRole,
  doDeleteUser,
} from "../../redux/actions";

function ViewUsers() {
  const [getUsers, setUsers] = useState([
    {
      username: "",
      email: "",
      phone: "",
      address: "",
      role: "",
      avatar: "",
      password: "",
    },
  ]);

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

  const handleUpdateUsers = async (event, data, role) => {
    dispatch(doUpdateRole(data.id, role));
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

  const handleDeleteUsers = (event, data) => {
    return new Promise((resolve, reject) => {
      console.log("data", data);
      setTimeout(resolve, 1000);
    });
  };

  const columns = [
    {
      title: "Avatar",
      field: "avatar",
      render: (rowData) =>
        rowData.avatar ? (
          <img
            src={rowData.avatar}
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              border: "1px solid #ccc",
            }}
          />
        ) : (
          <AccountCircleIcon
            style={{ width: 50, height: 50, borderRadius: "50%" }}
          />
        ),
      cellStyle: { width: 1 },
      editable: "never",
      cellStyle: { width: "5%" },
    },
    {
      title: "H??? t??n",
      field: "username",
      cellStyle: { width: "12%" },
    },
    {
      title: "?????a ch??? email",
      field: "email",
      editable: "never",
      cellStyle: { width: "18%" },
    },
    {
      title: "S??? ??i???n tho???i",
      field: "phone",

      cellStyle: { width: "12%" },
    },
    {
      title: "M???t kh???u",
      field: "password",
      render: (rowData) => <div> ********</div>,
      cellStyle: { width: "12%" },
    },
    {
      title: "N??i ??? hi???n t???i",
      field: "address",
      cellStyle: { width: "20%" },
    },
    {
      title: "Vai tr??",
      field: "role",
      lookup: {
        instructor: "Gi???ng vi??n",
        student: "H???c vi??n",
        pending: "??ang ch??? x??? l??",
        guest: "Ch??a ch???n vai tr??",
      },
      editable: "never",
      cellStyle: { width: "20%" },
    },
  ];

  const actions = [
    (rowData) => {
      switch (rowData.role) {
        case "instructor": {
          break;
        }
        case "student": {
          break;
        }
        case "pending": {
          return {
            icon: "face3Icon",
            tooltip: "Tr??? th??nh gi???ng vi??n",
            onClick: (event, rowData) =>
              handleUpdateUsers(event, rowData, "instructor"),
          };
        }
        case "guest": {
          return {
            icon: "face3Icon",
            tooltip: "Tr??? th??nh gi???ng vi??n",
            onClick: (event, rowData) =>
              handleUpdateUsers(event, rowData, "instructor"),
          };
        }
      }
      return null;
    },
    (rowData) => {
      switch (rowData.role) {
        case "instructor": {
          break;
        }
        case "student": {
          break;
        }
        case "pending": {
          break;
        }
        case "guest": {
          return {
            icon: "schoolIcon",
            tooltip: "Tr??? th??nh h???c sinh",
            onClick: (event, rowData) =>
              handleUpdateUsers(event, rowData, "student"),
          };
        }
      }
      return null;
    },
  ];

  const handleEditable = () => ({
    onRowDelete: (oldData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          const dataDelete = [...getUsers];
          const index = oldData.tableData.id;
          dispatch(doDeleteUser(oldData.id));
          dataDelete.splice(index, 1);
          setUsers([...dataDelete]);
          resolve();
        }, 0);
      }),
  });

  return (
    <Wrap>
      <MaterialTable
        title={"Danh s??ch ng?????i d??ng - " + getUsers.length + " ng?????i d??ng"}
        style={{ padding: 10 }}
        data={getUsers}
        columns={columns}
        actions={actions}
        cellEditable={{
          cellStyle: {},
          onCellEditApproved: handleEditRow,
        }}
        editable={handleEditable()}
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
