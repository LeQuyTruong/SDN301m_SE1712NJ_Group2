

import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { InputBase } from "../base-form/controlInputForm";
import { categoryService } from "../../services/feService/categoryService";
import { useParams } from "react-router-dom";
import { SelectBase } from "../base-form/selectForm";

export const FormRoomSearch = (props) => {
    const { paging, setParams, getDataList } = props;
    const { page_size } = paging;
    const { category_id: paramCategoryId } = useParams();

    const [form, setForm] = useState({
        size: "",
        bed: "",
        vote_number: "",
        name: "",
        price: "",
        floors: "",
        category_id: paramCategoryId || ""
    });

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
        try {
            const response = await categoryService.getDataList({ page_size: 1000 });
            if (response?.status === 'success' || response?.status === 200) {
                setCategories(response.data.categories || []);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        getDataList({ page: 1, page_size, ...form });
    };

    const resetForm = () => {
        setForm({
            size: "",
            bed: "",
            vote_number: "",
            name: "",
            price: "",
            floors: "",
            category_id: paramCategoryId || ""
        });
        getDataList({ page: 1, page_size });
    };

    return (
        <Form noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <SelectBase
                    form={form}
                    setForm={setForm}
                    name="category_id"
                    label="Loại phòng:"
                    data={categories}
                    key_name="category_id"
                    required={false}
                    placeholder="Loại phòng"
                    type="text"
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <InputBase
                    form={form}
                    setForm={setForm}
                    name="name"
                    label="Tên phòng:"
                    key_name="name"
                    required={false}
                    placeholder="Nhập tên phòng"
                    type="text"
                />
            </Form.Group>

			<Form.Group className="mb-3 col-md-12">
					<InputBase form={ form } setForm={ setForm } name={ 'price' }
						label={ 'Giá phòng: ' }
						key_name={ 'price' } required={ false } placeholder={ 'Nhập giá phòng' }
						type={ 'text' }
					/>
				</Form.Group>

				<Form.Group className="mb-3 col-md-12">
					<InputBase form={ form } setForm={ setForm } name={ 'size' }
						label={ 'Kích thước: ' }
						key_name={ 'size' } required={ false } placeholder={ 'Nhập kích thước' }
						type={ 'text' }
					/>
				</Form.Group>

				<Form.Group className="mb-3 col-md-12">
					<InputBase form={ form } setForm={ setForm } name={ 'bed' }
						label={ 'Phòng ngủ: ' }
						key_name={ 'bed' } required={ false } placeholder={ 'Nhập số phòng ngủ' }
						type={ 'text' }
					/>
				</Form.Group>

				<Form.Group className="mb-3 col-md-12">
					<InputBase form={ form } setForm={ setForm } name={ 'floors' }
						label={ 'Tầng: ' }
						key_name={ 'floors' } required={ false } placeholder={ 'Nhập số tầng' }
						type={ 'number' }
					/>
				</Form.Group>


            <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                <Button type="submit" variant="primary" className="me-md-2 mb-2 mb-md-0">
                    Tìm kiếm
                </Button>
                <Button type="button" variant="secondary" onClick={resetForm}>
                    Reset
                </Button>
            </div>
        </Form>
    );
};

export default FormRoomSearch;
