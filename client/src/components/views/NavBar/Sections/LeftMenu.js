import React from 'react';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="a" style={{ transitionTimingFunction:'ease-in-out' }}>
        <a href="/">Home</a>
      </Menu.Item>
      <Menu.Item key="b" style={{ transitionTimingFunction:'ease-in-out' }}>
        <a href="/following">Following</a>
      </Menu.Item>
      <Menu.Item key="c" style={{ transitionTimingFunction:'ease-in-out' }}>
        <a href="/trending">Popular</a>
      </Menu.Item>
    </Menu>
  )
}

export default LeftMenu