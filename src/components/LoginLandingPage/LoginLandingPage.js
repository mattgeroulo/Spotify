
import Header from "../Header/Header"
import Login from "../Login/Login"
export default function LoginLandingPage(){
    return(
        <div>
            <Header searchElements={false}></Header>
            <Login />
        </div>
    )
}