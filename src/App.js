import './App.css';
import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast, Slide } from 'react-toastify';
import ProtectedRoute from './routes/ProtectedRoutes';
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
import Bookings from './admin/Barber/Bookings';
import Profile from './admin/Profile';
import ProfileEdit from './admin/ProfileEdit';
import Notifications from './admin/Nofications';
import RateBarber from './admin/Rating/RateBarber';
import Logout from './front/Logout';
import ForgotPassword from './front/ForgotPassword';
import NotFound from './front/NotFound';
import ViewPayments from './admin/Payments/ViewPayments';
import ViewReviews from './admin/Rating/ViewReviews';
import PrivacyPolicy from './admin/PrivacyPolicy';
import TermsAndCond from './admin/TermsAndCond';
import Announcment from './front/Announcment';
function App() {
	return (
		<>
			<ToastContainer
				position="top-center"
				className="custom-center-toast"
				autoClose={2500}
				hideProgressBar={false}
				transition={Slide}
				newestOnTop
				closeOnClick
				pauseOnHover
				draggable
				theme="dark"
			/>
			<Routes>
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
				<Route path="barber-register" element={<BarberRegister />} />
				<Route path="forgot-password" element={<ForgotPassword />} />
				<Route path="privacy-policy" element={<PrivacyPolicy/>} />
				<Route path="terms-conditions" element={<TermsAndCond/>} />
				<Route path='/' element={<Announcment />} />

				{/* Front layout */}
				{/* <Route path="/" element={<FrontLayout />}>
					<Route index element={<Home />} />
					<Route path="logout" element={<Logout />} />
				</Route> */}

				{/* Admin layout */}
				<Route element={<ProtectedRoute />}>
					<Route path="/admin" element={<AdminLayout />}>
						<Route index element={<Dashboard />} />
						<Route path="barbers" element={<Barbers />} />
						<Route path="services" element={<Services />} />
						<Route path="barbers" element={<Barbers />} />
						<Route path="customers" element={<Customers />} />
						<Route path="profile" element={<Profile />} />
						<Route path="edit-profile/:type" element={<ProfileEdit />} />
						<Route path="edit-customers/:id" element={<EditCustomer />} />
					</Route>
				</Route>

				{/* Customer layout */}
				<Route element={<ProtectedRoute />}>
					<Route path="/" element={<AdminLayout />}>
						<Route path="bookings" element={<Bookings />} />
						<Route path="booking/:id" element={<Booking />} />
						<Route path="add-service" element={<Add />} />
						<Route path="edit-service/:id" element={<Edit />} />
						<Route path="view-barbers" element={<ViewAllBarbers />} />
						<Route path="notifications" element={<Notifications/>} />
						<Route path="rate-barber" element={<RateBarber/>} />
						<Route path="view-reviews" element={<ViewReviews/>} />
						<Route path="view-reviews/:bid" element={<ViewReviews/>} />
						<Route path="payments" element={<ViewPayments/>} />

					</Route>
				</Route>

				{/* 🔥 404 Catch-all */}
				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	);
}

export default App;
