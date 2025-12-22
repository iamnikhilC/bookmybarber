import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './front/Home';
import Login from './front/Login';
import FrontLayout from './layouts/FrontLayout';
import AdminLayout from './layouts/AdminLaout';
import Register from './front/Register';
import BarberRegister from './front/BarberRegister';
import Dashboard from './admin/Dashboard';
import Barbers from './admin/Barber/Barbers';
import Add from './admin/Services/Add';
import Edit from './admin/Services/Edit';
import Services from './admin/Services/Services'; 
import Customers from './admin/Customer/Customers';
import EditCustomer from './admin/Customer/EditCustomer';
import ViewAllBarbers from './customer/ViewAllBarbers';
import Booking from "./customer/Booking";
import Bookings from './admin/Bookings';
// import ProtectedRoute from './front/components/ProtectedRoute';
import Logout from './front/Logout';
function App() {
	return (
		<Routes>
			<Route path="login" element={<Login />} />
			<Route path="register" element={<Register />} />
			<Route path="barber-register" element={<BarberRegister />} />
			
			{/* Front layout */}
			<Route path="/" element={<FrontLayout />}>
				<Route index element={<Home />} />
				<Route path="view-barbers" element={<ViewAllBarbers />} />
				<Route path="logout" element={<Logout />} />
			</Route>

			{/* Admin layout */}
			<Route path="/admin"  element={<AdminLayout />}>
				<Route index element={<Dashboard />} />
				<Route path="barbers" element={<Barbers />} />
				<Route path="services" element={<Services />} />
				<Route path="barbers" element={<Barbers />} />
				<Route path="customers" element={<Customers />} />
				<Route path="edit-customers/:id" element={<EditCustomer />} />
			</Route>

			{/* Customer layout */}
			<Route path="/" element={<AdminLayout />}>
				<Route path="bookings" element={<Bookings />} />
				<Route path="booking/:id" element={<Booking />} />
				<Route path="add-service" element={<Add />} />
				<Route path="edit-service/:id" element={<Edit />} />
				
			</Route>
		</Routes>
	);
}

export default App;
