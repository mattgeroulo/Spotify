
import Header from "./Header"
import Login from "./Login"
export default function LoginLandingPage(){
    return(
        <div>
            <Header searchElements={false}></Header>
            <Login />
        </div>
    )
}