import './App.css';
import { Link, Route, Routes }                from "react-router-dom";
import Music                                  from "./components/Music/Music";
import News                                   from "./components/News/News";
import Settings                               from "./components/Settings/Settings";
import { UsersPage }                          from "./components/Users/UsersPage";
import ProfileContainer                       from "./components/Profile/ProfileContainer";
import { Login }                              from "./components/Login/Login";
import React, { Component }                   from "react";
import { connect }                            from "react-redux";
import { initializeApp }                      from "./redux/app-reducer";
import Preloader                              from "./components/commons/preloader/Preloader";
import { withSuspense }                       from "./hoc/withSuspense";
import { AppStateType }                       from './redux/redux-store';
import { UserOutlined, LaptopOutlined }       from '@ant-design/icons';
import { Breadcrumb,  Layout, Menu } from 'antd';
import SubMenu                                from 'antd/es/menu/SubMenu';
import { AppHeader }                          from "./components/Header/Header";


const ChatPage = React.lazy(() => import('./pages/ChatPage'))
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp : () => void
}
const { Content, Footer, Sider } = Layout;

class App extends Component<MapPropsType & DispatchPropsType> {

    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader isFetching={this.props.initialized}/>
        }
        return (
            <Layout>
                <AppHeader />
                <Content style={{ padding: '0 48px' }}>
                    {/*<Breadcrumb style={{ margin: '16px 0' }}>*/}
                    {/*    <Breadcrumb.Item>Home</Breadcrumb.Item>*/}
                    {/*    <Breadcrumb.Item>List</Breadcrumb.Item>*/}
                    {/*    <Breadcrumb.Item>App</Breadcrumb.Item>*/}
                    {/*</Breadcrumb>*/}
                    <Layout
                        style={{ padding: '24px 0', background: 'white', borderRadius: '10' }}
                    >
                        <Sider style={{ background: "red" }} width={200}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['2']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%' }}
                            >
                                <SubMenu key='sub1' icon={<UserOutlined />} title="My Profile">
                                    <Menu.Item key='1'>
                                        <Link to='/profile'>
                                        Profile
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item key='2'>
                                        <Link to='/dialogs'>
                                            Messages
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item key='3'>
                                       options 3
                                    </Menu.Item>
                                </SubMenu>
                                <SubMenu key='sub2' icon={<LaptopOutlined />} title="Developers">
                                    <Menu.Item key='4'>
                                        <Link to='/developers'>
                                            Users
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item key='5'>
                                        <Link to='/chat'>
                                            Chat
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item key='6'>
                                        options 5
                                    </Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Content style={{ padding: '0 24px', minHeight: 280 }}>
                            <Routes>
                                <Route path='/' element={<ProfileContainer/>}/>
                                <Route path='/profile/:userId?' element={<ProfileContainer/>}/>
                                <Route path='/dialogs/*' element={withSuspense(DialogsContainer)}/>
                                <Route path='/news' element={<News/>}/>
                                <Route path='/music' element={<Music/>}/>
                                <Route path='/developers' element={<UsersPage/>}/>
                                <Route path='/settings' element={<Settings/>}/>
                                <Route path='/login' element={<Login/>}/>
                                <Route path='/chat' element={withSuspense(ChatPage)}/>
                                <Route path='*' element={<div>404 NOT FOUND</div>}/>
                            </Routes>
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                      Created by maksim ©{new Date().getFullYear()}
                </Footer>
            </Layout>








            // <div className='app-wrapper'>
            //      <HeaderContainer/>
            //     <Navbar/>
            //     <div className='app-wrapper-content'>
            //         <Routes>
            //             <Route path='/' element={<ProfileContainer/>}/>
            //             <Route path='/profile/:userId?' element={<ProfileContainer/>}/>
            //             <Route path='/dialogs/*' element={
            //                 withSuspense(DialogsContainer)
            //
            //             }/>
            //             <Route path='/news' element={<News/>}/>
            //             <Route path='/music' element={<Music/>}/>
            //             <Route path='/users' element={<UsersPage/>}/>
            //             <Route path='/settings' element={<Settings/>}/>
            //             <Route path='/login' element={<Login/>}/>
            //             <Route path='*' element={<div>
            //                 404 NOT FOUND</div>}/>
            //         </Routes>
            //     </div>
            // </div>
        );
    }
}


const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})


export default connect(mapStateToProps, {initializeApp})(App)



