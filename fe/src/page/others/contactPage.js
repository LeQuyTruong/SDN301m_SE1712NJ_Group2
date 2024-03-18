import React, { useEffect, useState } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleShowLoading } from "../../redux/actions/common";
import { OtherService } from "../../services/feService/otherService";
import { setField, timeDelay } from "../../common/helper";
import { toast } from "react-toastify";
import { BookmarkStar, ListStars, MoonStars, Star } from "react-bootstrap-icons";


const ContactPage = () =>
{
	document.title = 'Liên hệ';
	const [ form, setForm ] = useState( {
		name: null,
		email: null,
		subject: null,
		message: null
	} );

	const [ validated, setValidated ] = useState( false );

	const navigate = useNavigate();
	const dispatch = useDispatch();


	const handleSubmit = async ( e ) =>
	{
		e.preventDefault();
		if ( e?.currentTarget?.checkValidity() === false )
		{
			e.stopPropagation();
		} else
		{
			dispatch( toggleShowLoading( true ) )
			const response = await OtherService.createContact( form );
			if ( response?.status === 200 && response?.data )
			{

				toast( 'Gửi yêu cầu thành công!', { type: 'success', autoClose: 900 } );
				setForm( {
					name: null,
					email: null,
					subject: null,
					message: null
				});
				setValidated(false);
				await timeDelay( 1000 );
				dispatch( toggleShowLoading( false ) );

				window.location.href = '/contact' ;
			} else
			{
				toast( response?.message || response?.error || 'Có lỗi sảy ra', { type: 'error', autoClose: 900 } );
				dispatch( toggleShowLoading( false ) );

			}
		}

		setValidated( true );

	}
	return (
		<React.Fragment>
			<section className={ `ftco-section bg-light` }>
				<Container>
				<Star/>
					<Row className="row justify-content-center mb-5 pb-3">
						<Col md={ 7 } className="heading-section text-center">
							<h2 className="mb-4">Liên hệ</h2>
						</Col>
					</Row>
					<Row>
						<Col md={ 3 } className="d-flex">
							<div className="info bg-white p-4">
								<p><span>Address:</span> Khu Công Nghệ Cao Hòa Lạc, km 29, Đại lộ, Thăng Long, Hà Nội, Việt Nam</p>
							</div>
						</Col>
						<Col md={ 3 } className="d-flex">
							<div className="info bg-white p-4">
								<p><span>Phone:</span> <a href="tel://1234567920">+84 12 345 6789</a></p>
							</div>
						</Col>
						<Col md={ 3 } className="d-flex">
							<div className="info bg-white p-4">
								<p><span>Email:</span> <a href="se1712nj@gmail.com">se1712nj@gmail.com</a></p>
							</div>
						</Col>
						<Col md={ 3 } className="d-flex">
							<div className="info bg-white p-4">
								<p><span>Website</span> <a href="yoursite.com">yoursite.com</a></p>
							</div>
						</Col>
					</Row>
					<Row className="block-9 mt-5">
						<Col md={ 6 } className="order-md-last d-flex justify-content-center">
							<Form className="bg-white p-5 contact-form w-75" noValidate validated={ validated } onSubmit={ handleSubmit }>
								<Form.Group className="mb-3">
									<Form.Control required type="text" name={ 'name' } placeholder="Họ và tên"
										onChange={ event =>
										{
											let value = event && event.target.value || null;
											setField( form, 'name', value, setForm )
										} }
										value={ form.name || '' } />
									<Form.Control.Feedback type="invalid">
										Tên không được để trống.
									</Form.Control.Feedback>
								</Form.Group>

								<Form.Group className="mb-3">
									<Form.Control required type="email" name={ 'email' } placeholder="Email"
										onChange={ event =>
										{
											let value = event && event.target.value || null
											setField( form, 'email', value, setForm )
										} }
										value={ form.email || '' } />
									<Form.Control.Feedback type="invalid">
										Email không được để trống.
									</Form.Control.Feedback>
								</Form.Group>

								<Form.Group className="mb-3">
									<Form.Control required type="text" name={ 'subject' } placeholder="Tiêu đề"
										onChange={ event =>
										{
											let value = event && event.target.value || null
											setField( form, 'subject', value, setForm )
										} }
										value={ form.subject || '' } />
									<Form.Control.Feedback type="invalid">
										Tiêu đề không được để trống.
									</Form.Control.Feedback>
								</Form.Group>

								<Form.Group className="mb-3">
									<Form.Control as="textarea" rows={ 7 } required type="text" name={ 'message' } placeholder="Nội dung"
										onChange={ event =>
										{
											let value = event && event.target.value || null
											setField( form, 'message', value, setForm )
										} }
										value={ form.message || '' } />
									<Form.Control.Feedback type="invalid">
										Nội dung không được để trống.
									</Form.Control.Feedback>
								</Form.Group>

								<Form.Group className="mb-3 d-flex justify-content-center">
									<Button type="submit" className='btn btn-primary py-3 px-5'>Send message</Button>
								</Form.Group>
							</Form>
						</Col>
						<Col md={ 6 } className="d-flex">
							<div id="map" className="bg-white" style={ { position: "relative", overflow: "hidden" } }>
								<div
									style={ { position: "absolute", height: "100%", width: "100%"} }
								>
									<div className="gm-err-container">
										<div className="gm-err-content">
											<div className="gm-err-icon">
													<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3724.521847117848!2d105.5253857!3d21.0117957!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abc60e7d3f19%3A0x2be9d7d0b5abcbf4!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBGUFQgSMOgIE7hu5lp!5e0!3m2!1svi!2s!4v1710585725000!5m2!1svi!2s" 
													width="600" height="450" style={{border : 0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
											</div>
										</div>
									</div>
								</div>
							</div>
						</Col>
					</Row>
				</Container>
			</section>
		</React.Fragment>
	);
};

export default ContactPage;
