import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { LockIcon, PersonIcon, EditIcon, GridViewIcon } from "../common/icons";
import AdminService from "../../service/AdminService";
import { useSelector } from "react-redux";

function Sidebar() {
  const store = useSelector((state) => state.store.auth);

  const handleLogout = () => {
    AdminService.logout().then(() => {
      window.location = "/admin/auth";
    });
  };

  return (
    <SideBar>
      <div>
        <Avt>
          <img
            src={store?.user?.avatar}
            alt=""
            style={{
              borderRadius: "50%",
              border: "1px solid #ccc",
              width: 50,
              height: 50,
            }}
          />
          <p>{store.user.username}</p>
        </Avt>
      </div>
      <NavLink to="/" activeClassName="active">
        <Wrap>
          <GridViewIcon />
          <p>Tổng quan</p>
        </Wrap>
      </NavLink>
      <NavLink to="/users" activeClassName="active">
        <Wrap>
          <PersonIcon />
          <p>Người dùng</p>
        </Wrap>
      </NavLink>
      <NavLink to="/courses" activeClassName="active">
        <Wrap>
          <EditIcon />
          <p>Khoá học</p>
        </Wrap>
      </NavLink>
      <NavLink
        to="/admin/login"
        activeClassName="active"
        onClick={handleLogout}
      >
        <Wrap>
          <LockIcon />
          <p>Đăng xuất</p>
        </Wrap>
      </NavLink>
    </SideBar>
  );
}

const SideBar = styled.div`
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
  a {
    padding: 10px 1.5rem;
    background: linear-gradient(to left, #fff 50%, #039be5 50%) right;
    background: white;
    background-size: 200%;
    transition: 0.471s ease-out;
    color: black;
    text-decoration: none;
    p {
      font-size: 1.4rem;
    }
  }
  a:hover {
    cursor: pointer;
    background-color: #039be5;
    color: white;
    background-position: left;
  }
  a.active {
    background-color: #039be5;
    background-position: 0 0;
    color: #fff;
  }
`;

const Wrap = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 10px;
  align-items: center;
`;
const Avt = styled.div`
  padding: 5px 1.5rem;
  display: flex;
  flex-flow: row nowrap;
  gap: 10px;
  align-items: center;
  height: 3rem;
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 20px;
  img {
    height: 100%;
    border-radius: 100%;
  }
  p {
    font-weight: 600;
    padding: 0.3rem;
    border-radius: 5px;
  }
`;
export default Sidebar;
