import React from "react";
import s from './Header.module.css'
import logo from '../../images/logo192.png'
import {Link, NavLink} from "react-router-dom";
import {Button, Col, Menu, Row} from "antd";
import Avatar from "antd/es/avatar/avatar";
import {UserOutlined} from "@ant-design/icons";
import {Header} from "antd/es/layout/layout";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUserLogin, selectIsAuth} from "../../redux/auth-selector";
import {logout} from "../../redux/auth-reducer";

export type MapPropsType = {
}
 export const AppHeader: React.FC<MapPropsType> = (props) => {
    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectCurrentUserLogin)
    const dispatch = useDispatch()

    const logoutCallback = () => {
        // @ts-ignore
        dispatch(logout())
    }
    return (
        <Header className="header">
            <Row>
                <Col span={21} >
                    <Menu theme="dark"  mode='horizontal'>
                        <Menu.Item key="1">
                            <Link to='/developers'>
                                Developers
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Col>
                <Col span={3 } >
                    {isAuth
                        ? <div className={s.loginBlock}>
                            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />}/>
                            {login} - <Button onClick={logoutCallback}>Log out</Button>
                        </div>
                        : <NavLink to={'/login'}>Login</NavLink>}
                </Col>
            </Row>
        </Header>
    )
}
