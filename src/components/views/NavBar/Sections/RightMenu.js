/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function RightMenu(props) {
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail" style={{ transitionTimingFunction:'ease-in-out' }}>
          <a href="/login">Signin</a>
        </Menu.Item>
        <Menu.Item key="app" style={{ transitionTimingFunction:'ease-in-out' }}>
          <a href="/register">Signup</a>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>
        <SubMenu title={<span>Menu</span>}>
          <MenuItemGroup title="Profile">
            <Menu.Item key="setting:1" style={{ transitionTimingFunction:'ease-in-out' }}><a href="/profile">User Profile</a></Menu.Item>
            <Menu.Item key="setting:2" style={{ transitionTimingFunction:'ease-in-out' }}><a href="/profile/edit">Edit Profile</a></Menu.Item>
          </MenuItemGroup>
        </SubMenu>
        <Menu.Item key="setting:1" style={{ transitionTimingFunction:'ease-in-out' }}>
          <a href='/video/search'>Search</a>
        </Menu.Item>
        <Menu.Item key="setting:2" style={{ transitionTimingFunction:'ease-in-out' }}>
          <a href='/video/upload'>Upload</a>
        </Menu.Item>
        <Menu.Item key="logout" style={{ transitionTimingFunction:'ease-in-out' }}>
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);