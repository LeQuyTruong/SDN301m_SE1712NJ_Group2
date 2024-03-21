import React, { useEffect, useState } from 'react';
import { Alert, Breadcrumb, Col, Container, Row } from "react-bootstrap";
import dashboardApi from '../../services/dashboardService';
import { Table } from 'react-bootstrap';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ArcElement
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import axios from 'axios';
ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ArcElement
);

export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: 'top',
		},
		title: {
			display: true,
			text: 'Biểu đồ thống kê hàng tháng',
		},
	},
};


export default function PageHome() {

	const [params, setParams] = useState({});
	const [dataCharStatus, setDataChartStatus] = useState({});
	const [dataChartListDayInMonth, setDataChartListDayInMonth] = useState({});
	const [loadingChartStatus, setLoadingChartStatus] = useState(true);
	const [statistics, setStatistics] = useState([]);

	const getDashboard = async (filters) => {
		const response = await dashboardApi.getStatistics(filters)
		if (response?.status === 'success' || response?.status === 200) {
			setDataChartStatus({
				labels: response.data.group_status.label,
				datasets: [
					{
						label: '# of Votes',
						data: response.data.group_status.data,
						backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 206, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)',
							'rgba(153, 102, 255, 0.2)',
							'rgba(255, 159, 64, 0.2)',
						],
						borderColor: [
							'rgba(255, 99, 132, 1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)',
							'rgba(75, 192, 192, 1)',
							'rgba(153, 102, 255, 1)',
							'rgba(255, 159, 64, 1)',
						],
						borderWidth: 1,
					},
				],
			})
			setDataChartListDayInMonth({
				labels: response.data.list_day,
				datasets: [
					{
						label: 'Thống kế',
						data: response.data.list_money_by_day,
						backgroundColor: 'rgba(255, 99, 132, 0.5)',
					}
				],
			} )
			console.log("money:",response);
			setLoadingChartStatus( false );
		}
	}




	useEffect(() => {
		axios.get('http://localhost:9998/api/v1/admin/statistics')
			.then(response => {
				setStatistics(response.data);
			})
			.catch(error => {
				console.error('Error fetching statistics:', error);
			});
	}, []);

	useEffect(() => {
		getDashboard({ ...params }).then(r => { });
	}, []);

	return (
		<Container>
			<Row>
				<Col>
					<Alert variant="success">
						<Alert.Heading>Xin chào</Alert.Heading>
						<p>Chào mừng bạn đến với hệ thống quản lý khách sạn của chúng tôi</p>
					</Alert>
				</Col>
			</Row>
			
			<div>
            <h2>Booking Statistics by Month</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Month</th>
                        <th>Number of Bookings</th>
                    </tr>
                </thead>
                <tbody>
                    {statistics.map(stat => (
                        <tr key={stat._id}>
                            <td>{stat._id}</td>
                            <td>{stat.count}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
			{/* <Row>
				<Col className={'col-8'}>
					{loadingChartStatus === false && (
						<Bar options={options} data={dataChartListDayInMonth} />
					)}
				</Col>
				<Col className={'col-4'}>
					{loadingChartStatus === false && (
						<Doughnut data={dataCharStatus} />
					)}
				</Col>
			</Row> */}
		</Container>
	);
}
