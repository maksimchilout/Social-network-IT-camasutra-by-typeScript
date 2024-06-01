import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetStringKeys, Input} from "../commons/FormsControls/FormControls";
import {required} from "../../utils/validators/validators";
import { useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";
import style from "./../commons/FormsControls/FormsControls.module.css"
import {getCaptcha, getIsAuth} from "../../redux/users-selector";

type LoginFormOwnProps = {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                {createField<LoginFormValuesTypeKeys>("Email", "email", [required], Input)}
                {createField<LoginFormValuesTypeKeys>("Password", "password", [required], Input, {type: "password"})}
                {createField<LoginFormValuesTypeKeys>(undefined, "rememberMe", [], Input, {type: "checkbox"}, "remember me")}
            </div>
            {captchaUrl && <img src={captchaUrl}  alt={"captcha"}/>}
            {captchaUrl && <div>
                <Field
                    placeholder={'Symbols from images'}
                    name={"captcha"}
                    component={Input}
                    validate={[required]}
                />
            </div>}
            {error && <div className={style.formSummaryError}>
                {error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}
const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
    form: 'login',
})(LoginForm)


interface LoginFormValuesType {
    captcha: string;
    rememberMe: boolean;
    password: string;
    email: string;
}
type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>

export const Login: React.FC = () => {
    const isAuth = useSelector(getIsAuth)
    const captchaUrl = useSelector(getCaptcha)
    const dispatch = useDispatch()

    const onSubmit = (formData: LoginFormValuesType) => {
        // @ts-ignore
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }
    if (isAuth) {
        return <Navigate replace to={"/profile"}/>
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
        </div>
    )
}

