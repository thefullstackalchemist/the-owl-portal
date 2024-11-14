import React, { useCallback, useMemo, useState } from "react";
import {
  TransactionOutlined,
  FileOutlined,
  PieChartOutlined,
  SettingOutlined,
  AccountBookOutlined,
  GroupOutlined,
  CoffeeOutlined,
  ShopOutlined,
  //   AccountBookOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Summary } from "../Summary";
import { Transactions } from "../Transactions";
import { Accounts } from "../Accounts";
import { Commodities } from "../Commodities";
import { Vendors } from "../Vendors";
import { Preferences } from "../Preferences";
import { Files } from "../Files";
// import logo from "./../../Assets/logo.jfif";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Dashboard", "dashboard", <PieChartOutlined />),
  getItem("Transactions", "transaction", <TransactionOutlined />),
  getItem("Data Hub", "hub", <GroupOutlined />, [
    getItem("Accounts", "hub_accounts", <AccountBookOutlined />),
    getItem("Commodities", "hub_commodities", <CoffeeOutlined />),
    getItem("Vendors", "hub_vendors", <ShopOutlined />),
  ]),
  getItem("Preferences", "preferences", <SettingOutlined />),
  getItem("Files", "files", <FileOutlined />),
];
export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [menuItem, setMenuItem] = useState("");
  const {
    token: {
      colorBgContainer,
      borderRadiusLG,
      colorPrimaryBg,
      colorPrimaryBorder,
      borderRadius,
      colorTextHeading,
    },
  } = theme.useToken();

  const handleNavigation = useCallback(
    (menuItem) => {
      setMenuItem(menuItem.key);
    },
    [setMenuItem]
  );

  const renderBody = useMemo(() => {
    if (menuItem === "dashboard") {
      return <Summary />;
    } else if (menuItem === "transaction") {
      return <Transactions />;
    } else if (menuItem === "hub_accounts") {
      return <Accounts />;
    } else if (menuItem === "hub_commodities") {
      return <Commodities />;
    } else if (menuItem === "hub_vendors") {
      return <Vendors />;
    } else if (menuItem === "preferences") {
      return <Preferences />;
    } else if (menuItem === "files") {
      return <Files />;
    }
  }, [menuItem]);

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            height: "2em",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "antiquewhite",
          }}
          className="demo-logo-vertical"
        >
          {/* <img
            src={logo}
            alt="Logo"
            height="100%"
            style={{ borderRadius: "1em" }}
          /> */}
          <AccountBookOutlined style={{ padding: "0.5em" }} />
          <h3 style={{ width: "100%" }}>OWL</h3>
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["hub_accounts"]}
          mode="inline"
          items={items}
          onClick={handleNavigation}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            background: colorPrimaryBg,
            border: "1px solid " + colorPrimaryBorder,
            padding: 24,
            borderRadius: borderRadiusLG,

            margin: "0 16px",
          }}
        />
        {renderBody}
        <Footer
          style={{
            background: colorPrimaryBg,
            border: "1px solid " + colorPrimaryBorder,
            borderRadius: borderRadiusLG,

            textAlign: "center",
          }}
        >
          <b>O</b>utstanding&nbsp;
          <b>W</b>ealth&nbsp;
          <b>L</b>edger&nbsp;
        </Footer>
      </Layout>
    </Layout>
  );
}
