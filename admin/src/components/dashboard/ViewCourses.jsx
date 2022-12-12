import React, { useState, useEffect } from "react";
import Material from "material-table";
import MaterialTable from "material-table";
import AdminService from "../../service/AdminService";
import { ClearIcon } from "../common/icons";
import styled from "styled-components";
import Toast from "../common/toast.jsx";
import showToast from "../common/toast.js";
import { useSelector, useDispatch } from "react-redux";
import { doGetCourseList } from "../../redux/actions";

function ViewCourses() {
  const [getCourses, setCourses] = useState([
    // {
    //   id: 2,
    //   categoryId: 3,
    //   instructorId: "19020226",
    //   name: "Khóa học Front-end căn bản (ReactJS - Bootstrap)",
    //   description:
    //     "Khóa học tiếp theo của khóa Web căn bản, dành cho các bạn theo thiên hướng Front-end",
    //   isPublished: 1,
    //   price: 102,
    //   image:
    //     "https://res.cloudinary.com/subarashis/image/upload/v1637942622/courses/csetvbz8bxpzzlkpy9nx.png",
    //   startCourseTime: null,
    //   endCourseTime: null,
    //   created_at: "2022-12-09T11:40:34.000Z",
    //   updated_at: "2022-12-09T11:40:34.000Z",
    //   instructorName: "Lê Trần Lâm Bình",
    //   email: "19020226@vnu.edu.vn",
    //   address: null,
    //   phone: "012345678",
    //   avatar:
    //     "https://s.gravatar.com/avatar/283488939cea6d19c39498511bebc63b?s=100&r=x&d=retro",
    // },
  ]);
  const dispatch = useDispatch();
  const store = useSelector((state) => state.store);

  const [toastList, setToastList] = useState([]);

  const columns = [
    {
      title: "Tên khóa học",
      field: "name",
      cellStyle: { width: "20%" },
    },
    {
      title: "Tên giảng viên",
      field: "instructorName",
      cellStyle: { width: "12%" },
      editable: "never",
    },
    {
      title: "Giá tiền",
      field: "price",
      cellStyle: { width: "10%" },
      render: (rowData) => (
        <Price>{rowData.price ? `${rowData.price}$` : "Miễn phí"}</Price>
      ),
    },
    {
      title: "Hình ảnh khoá học",
      field: "image",
      cellStyle: { width: "15%" },
      render: (rowData) =>
        rowData.image && (
          <Image>
            <img src={rowData.image} style={{ height: 50 }} />,
          </Image>
        ),
      editable: "never",
    },
    {
      title: "Trạng thái",
      field: "isPublished",
      cellStyle: { width: "10%" },
      render: (rowData) => (
        <Price>{rowData.isPublished ? "Đã xuất bản" : `Riêng tư`}</Price>
      ),
      lookup: { 1: "Xuất bản", 0: "Riêng tư" },
    },
  ];

  useEffect(() => {
    dispatch(doGetCourseList());
  }, []);

  useEffect(() => {
    if (store.courseList.courses?.length > 0) {
      setCourses(store.courseList.courses);
    }
  }, [store.courseList.courses]);

  const handleDeleteCourse = (data) => {
    AdminService.deleteCourse(data.id)
      .then((res) => {
        setToastList([showToast("success", "thông báo!", "Xoá thành công!")]);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <Wrap>
      <MaterialTable
        title={"Danh sách khóa học - " + getCourses?.length + " khoá học"}
        style={{ padding: 10 }}
        data={getCourses}
        columns={columns}
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
        editable={{
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                handleDeleteCourse(oldData);
                const dataDelete = [...getCourses];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setCourses([...dataDelete]);
                resolve();
              }, 1000);
            }),
          isEditable: (rowData) => {
            console.log({ rowData });
            return rowData.name === "price";
          },
        }}
        cellEditable={{
          cellStyle: {},
          onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
            return new Promise((resolve, reject) => {
              console.log("newValue: " + newValue);
              setTimeout(resolve, 4000);
            });
          },
        }}
      />
      <Toast toastList={toastList} />
    </Wrap>
  );
}

export default ViewCourses;

const Wrap = styled.div`
  background-color: white;
  width: 80vw;
  height: 90vh;
  overflow-y: auto;
  padding: 1rem 1rem;
`;

const Price = styled.div`
  background-color: white;
  padding: 2px 4px;
  margin-right: 10px;
  border-radius: 8px;
`;

const Image = styled.div`
  display: flex;
  justify-content: center;
`;
