import React, { useState, useMemo } from "react";
import { useMediaQuery } from "react-responsive";
import MainLayouts from "./component/MainLayouts/MainLayouts";

import PublicRoute from "./hooks/PublicRoute";
import PrivateRoute from "./hooks/PrivateRoute";
import { LoginPage, PageNotFound, HomePage } from "./pages";
import HomeRoutes from "./util/HomeRoutes";
import { Layout, Menu } from "antd";

import { UserContext } from "./hooks/UserContext";
import { Route, Switch, Link, useLocation } from "react-router-dom";

import parse from "html-react-parser";
import { FullscreenOutlined, FullscreenExitOutlined } from "@ant-design/icons";
import wording from "./util/wording";

const { Header, Sider, Content } = Layout;

function replaceString(string) {
  let regex = string.replace("<br/>", "/");
  return regex;
}

function App(props) {
  // eslint-disable-next-line
  let location = useLocation();

  const [user, setUser] = useState(null);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  const isMiniMonitor = useMediaQuery({ query: "(min-width: 1024px)" });
  const isLaptop = useMediaQuery({ query: "(min-width: 1366px)" });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1600px)" });
  const isSmallMonitor = useMediaQuery({ query: "(min-width: 720px)" });

  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };
  function compare(values) {
    let data1 = JSON.parse(localStorage.getItem("group_menu"));
    for (var i in data1) {
      if (data1[i].menu.includes(values)) {
        return values;
      }
    }
  }

  return (
    <>
      <UserContext.Provider value={value}>
        <Switch>
          <PublicRoute component={LoginPage} path="/" exact />

          {/* {isSmallMonitor ? setCollapsed(true) : setCollapsed(false)} */}
          <PrivateRoute>
            <MainLayouts isHeader={true} isFooter={true}>
              <Layout>
                <Sider
                  trigger={null}
                  collapsible
                  collapsed={collapsed}
                  breakpoint="xl"
                  // collapsedWidth="0"
                  onBreakpoint={(broken) => {
                    setCollapsed(broken);
                  }}
                  onCollapse={(collapsed, type) => {
                    console.log("on collapse", collapsed, type);
                  }}
                >
                  <Menu
                    mode="inline"
                    style={{ marginTop: "5px", height: "100vh" }}
                  >
                    {HomeRoutes.sub_menu
                      .filter((menu) => compare(menu.menu_id))
                      .map((menu, idx) => {
                        return (
                          <>
                            <Menu.Item
                              key={idx.toString()}
                              icon={menu.icon}
                              style={{
                                fontSize: "18px",
                                height: "51px",
                                lineHeight: "80%",
                              }}
                            >
                              {parse(menu.wording)}
                              <Link to={menu.path} />
                            </Menu.Item>
                          </>
                        );
                      })}
                  </Menu>
                </Sider>
                <Layout className="site-layout">
                  <div style={{ display: "flex" }}>
                    <div
                      style={{
                        marginLeft: "0px",
                        marginTop: "20px",
                        width: "30px",
                      }}
                    >
                      {React.createElement(
                        collapsed ? FullscreenOutlined : FullscreenExitOutlined,
                        {
                          className: "trigger",
                          onClick: toggle,
                        }
                      )}
                    </div>
                    <Content
                      className="site-layout-background"
                      style={{
                        margin: "20px 16px",
                      }}
                    >
                      {HomeRoutes.sub_menu
                        .filter(
                          (data) => data.path === window.location.pathname
                        )
                        .map((data, i) => {
                          return (
                            <>
                              <div
                                style={{
                                  fontSize: "20px",
                                  fontFamily: "DBOzoneX",
                                  lineHeight: "24px",
                                  marginBottom: "5px",
                                }}
                              >
                                <span>
                                  {wording.claim_warehouse_title} {">"}{" "}
                                </span>
                                <span style={{ color: "#1890FF" }}>
                                  {replaceString(data.menu_wording)}
                                </span>
                              </div>
                              <Layout
                                style={{
                                  borderRadius: "5px",
                                  width: "auto",
                                  backgroundColor: "#FAFAFA",
                                  maxHeight: "100vh",
                                }}
                              >
                                <Content>
                                  <PrivateRoute
                                    exact
                                    path={data.path}
                                    component={data.component}
                                  />
                                </Content>
                              </Layout>
                            </>
                          );
                        })}
                    </Content>
                  </div>
                </Layout>
              </Layout>
            </MainLayouts>
          </PrivateRoute>

          <PrivateRoute component={HomePage} path="/home" exact />
          <PrivateRoute component={PageNotFound} />
        </Switch>
      </UserContext.Provider>
    </>
  );
}

export default App;
