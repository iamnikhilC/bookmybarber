import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { BsTrash3 } from "react-icons/bs";
import { FcManager } from "react-icons/fc";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const customStyles = {
	headCells: {
		style: {
			backgroundColor: "#1e293b", // Dark blue-gray header
			color: "#ffffff",           // White text
			fontWeight: "bold",
			fontSize: "15px",
			textTransform: "uppercase",
		},
	},
	rows: {
		style: {
			minHeight: "60px",
		},
	},
	cells: {
		style: {
			fontSize: "14px",
		},
	},
	pagination: {
		style: {
			backgroundColor: "#f1f5f9",
			borderTop: "1px solid #e2e8f0",
		},
	},
};

const Barbers = () => {
	const [barbers, setBarbers] = useState();
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate(); // ✅ Hook for programmatic navigation

	useEffect(() => {
		const getBarbers = async () => {
			try {
				const response = await axios.get(`${baseURL}/barber/barbers.php`);
				const data = response.data;
				if (data.status === 'sucess') {
					setBarbers(data.data);
				} else {
					console.error("Error:", data.message);
				}
			} catch (error) {
				console.error("Fetch Error:", error);
			} finally {
				setLoading(false);
			}
		};
		getBarbers();
	}, []);

	// Define columns
	const columns = [
		{ name: "SrNo.", selector: (row, index) => index + 1, sortable: false, width: "80px", },
		{ name: "Name", selector: (row) => row.name, sortable: true, },
		{ name: "Shop Name", selector: (row) => row.shop_name, sortable: true, },
		{ name: "Address", selector: (row) => row.address, sortable: true, },
		{ name: "Pincode", selector: (row) => row.pincode, sortable: true, },
		{ name: "State", selector: (row) => row.state, sortable: true, },
		{ name: "Email", selector: (row) => row.email, sortable: true, },
		{ name: "Mobile", selector: (row) => row.mobile || "N/A", sortable: true, },
		{
			name: "Status",
			selector: (row) => (
				<span
					style={{
						color: row.is_active ? "green" : "red",
						fontWeight: "bold",
					}}
				>
					{row.is_active ? "Active" : "Inactive"}
				</span>
			),
			sortable: true,
		},
		{
			name: 'Action',
			selector: (row) => (
				<div style={{ display: "flex", gap: "" }}>
					<button onClick={() => handleEdit(row)}
						style={{
							background: "none",
							border: "none",
							cursor: "pointer",
							color: "#3b82f6",
						}}
					>
						<CiEdit size={22} />
					</button>

					<button onClick={() => handleDelete(row.id)}
						style={{
							background: "none",
							border: "none",
							cursor: "pointer",
							color: "#ef4444",
						}}
					>
						<BsTrash3 size={22} />
					</button>
				</div>)
		}
	];

	// Example functions
	const handleEdit = (row) => {
		navigate(`/admin/edit-customers/${row.id}`);

		console.log("Edit clicked for:", row);
	};

	const handleDelete = (id) => {
		console.log("Delete clicked for ID:", id);
	};

	return (
		<>
			<h4>Admin/Customers</h4>
			<div className='row'>
				<div className='col-12'>
					<DataTable
						title={<div className="row"><FcManager/><span>Barbers</span></div>}
						columns={columns} data={barbers} progressPending={loading} pagination
						highlightOnHover
						pointerOnHover
						striped
						responsive
						customStyles={{
							headCells: {
								style: {
									// backgroundColor: "lightgrey",
									fontWeight: "bold",
									fontSize: "16px",
								},
							},
							table: {
								style: {
									borderRadius: "20px",
								}
							}
						}} />
				</div>
			</div>
		</>
	)
}

export default Barbers;
