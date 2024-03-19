import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import bookingApiPayment from "../../services/bookingPayment.js";
import { toast } from "react-toastify";

export default function UpdateBooking() {
  const [validated, setValidated] = useState(false);
  const [statusPayment, setStatusPayment] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const data = {
        status_payment: statusPayment,
      };
      console.log('Updating with data:', data);
      const response = await bookingApiPayment.updatePayment(params.id, data);
      console.log('Server response:', response);
      if (response.status === 200) {
        toast("Cập nhật thành công");
        navigate("/booking");
      } else {
        toast(response?.message || response?.error || "Lỗi không xác định");
      }
    }
    setValidated(true);
  };

  const getPaymentDetailsById = async (id) => {
    const response = await bookingApiPayment.findById(id);
    console.log("----------- response: ", response);
    if (response.status === "success" || response.status === 200) {
      console.log("---------- OK");
      setName(response.data?.name);
      setStatusPayment(response.data?.status_payment); // set current status
    } else {
      toast(response?.message || response?.error || "error");
    }
  };

  useEffect(() => {
    if (params.id) {
       getPaymentDetailsById(params.id).then(r => {});
    }
  }, [params.id]);
    
  const handlePaymentStatusChange = (event) => {
    setStatusPayment(event.target.value);
  };
  
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Breadcrumb>
              <Breadcrumb.Item href="/discount">Bốc chọn</Breadcrumb.Item>
              <Breadcrumb.Item active>Cập nhật</Breadcrumb.Item>
            </Breadcrumb>
            <div className={"d-flex justify-content-end"}>
              <Link className={"btn btn-sm btn-primary"} to={"/booking"}>
                Trở về
              </Link>
            </div>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row>
                <Col className={"col-3"}>
                  <Form.Group className="mb-3" controlId="statusPayment">
                    <Form.Label>Trạng thái thanh toán</Form.Label>
                    <Form.Select value={statusPayment} onChange={handlePaymentStatusChange}>
                      <option value="UNPAID">UNPAID</option>
                      <option value="PAID">PAID</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Yêu cầu chọn trạng thái thanh toán
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3" controlId="submitBtn">
                <Button type="submit">Cập nhật</Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}