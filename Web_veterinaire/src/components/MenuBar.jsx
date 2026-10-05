
import { LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import { Button, Drawer, Layout, Menu, message } from "antd";
import dayjs from "dayjs";
import  { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/images/logo.jpeg";

const { Header } = Layout;

const MenuBar = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleLogout =  () => {
    logout();
    message.success("Déconnecté avec succès !");
    navigate("/login"); 
  };
  
  return (
    <Layout>
      <Header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          backgroundColor: "#f0f0f0",
          padding: "0 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 1000,
        }}
      >
        <Button
          type="text"
          icon={<MenuOutlined style={{ fontSize: "24px" }} />}
          onClick={toggleMenu}
        />

        <img
          src={logo}
          alt="VetProximité Logo"
          style={{ width: "60px", height: "60px" }}
        />

        <Button
          type="text"
          icon={<LogoutOutlined />}
          onClick={handleLogout} 
        />
      </Header>

      <Drawer
        placement="left"
        onClose={toggleMenu}
        visible={menuVisible}
        bodyStyle={{ padding: 0 }}
      >
        <Menu mode="inline" style={{ height: "100%" }} onClick={toggleMenu}>
          <Menu.Item key="1" >
            <Link to="/user-table">User</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/care-table">Care</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/animal-category-table">Animal Category</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/veterinarian-table">Veterinarian</Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to="/availability-table">Availability</Link>
          </Menu.Item>
          <Menu.Item key="6">
            <Link to="/on-call-table">OnCall</Link>
          </Menu.Item>
        </Menu>
      </Drawer>
    </Layout>
  );
};

export default MenuBar;


