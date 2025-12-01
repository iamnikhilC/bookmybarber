import {Routes, Route} from 'react-router-dom';
import Home from "./front/Home";
import Login from './front/Login';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="login" element={<Login/>}/>

        </Routes>
    )
}
export default AppRoutes;