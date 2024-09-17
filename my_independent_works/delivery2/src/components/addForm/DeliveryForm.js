// components/contactus-form.component.js

import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import './deliveryForm.css';
import { useCreateDeliverMutation } from '../../api/apiSlice';
import useDeliveryServices from '../servises/DeliveryServices';


const DeliveryForm = (props) => {
    const [createDeliver] = useCreateDeliverMutation();
    const { setFilteredDeliveries, authUsers } = props;
    const { selectData, selectWeight } = useDeliveryServices();


    console.log('log');

    const postDelivery = (values) => {
        const newDelivery = {
            place: values.place,
            operation: values.operation,
            name: values.name,
            contactName: values.contactName,
            phone: values.phone,
            date: values.dateOfDelivery,
            documents: values.documentNumbers,
            description: values.description,
            sender: authUsers.name,
            id: uuidv4()
        };
        createDeliver(newDelivery).unwrap();
    };

    return (
        <Formik
            initialValues={{
                place: '',
                operation: '',
                name: '',
                contactName: '',
                phone: '',
                dateOfDelivery: '',
                documentNumbers: '',
                description: ''
            }}
            validationSchema={Yup.object({
                place: Yup.string()
                    .required('Обязательное поле!'),
                operation: Yup.string()
                    .required('Обязательное поле!'),
                name: Yup.string()
                    .min(2, 'Минимум 2 символа')
                    .required('Обязательное поле!'),
                contactName: Yup.string()
                    .min(2, 'Минимум 2 символа')
                    .required('Обязательное поле!'),
                phone: Yup.string()
                    .matches(/^[7-8]\d{10}$/, 'номер не корректен')
                    .required('Обязательное поле!'),
                dateOfDelivery: Yup.string()
                    .required('Обязательное поле!'),
                documentNumbers: Yup.string()
                    .min(2, 'Минимум 2 символа'),
                description: Yup.string()
                    .min(2, 'Минимум 2 символа')
            })}
            onSubmit={(values, { resetForm }) => {

                postDelivery(values);
                setFilteredDeliveries(false);
                resetForm();

            }}
        >

            {({ isSubmitting }) => (
                <Form>
                    <div className="form-group">
                        <label htmlFor="place">Производственная площадка</label>
                        <Field
                            as="select"
                            name="place"
                            className="form-control"
                            type="text" >
                            <option value="">Выберите площадку</option>
                            <option key={"1"} value="tambov">Тамбов</option>
                            <option key={"2"} value="lubertsy">Люберцы</option>
                        </Field>
                        <ErrorMessage className='error' name="place" component='div' />
                    </div>
                    <div className="form-group">
                        <label htmlFor="operation">Операция</label>
                        <Field
                            as="select"
                            name="operation"
                            className="form-control"
                            type="text" >
                            <option value="">Выберите действие</option>
                            <option key={"1"} value="inTo">Поступление</option>
                            <option key={"2"} value="out">Отгрузка</option>
                        </Field>
                        <ErrorMessage className='error' name="operation" component='div' />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Контрагент</label>
                        <Field
                            name="name"
                            id="name"
                            className="form-control"
                            type="text"
                            placeholder="укажите контрагента" />
                        <ErrorMessage className="error" name="name" component="div" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="contactName">Гос номер транспортного средства</label>
                        <Field
                            name="contactName"
                            id="contactName"
                            className="form-control"
                            type="text"
                            placeholder="укжите номер машины (только тягач)" />
                        <ErrorMessage className='error' name="contactName" component='div' />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Телефон водителя</label>
                        <Field
                            name="phone"
                            id="phone"
                            className="form-control"
                            type="text"
                            placeholder="введите номер телефона водителя" />
                        <ErrorMessage className='error' name="phone" component='div' />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dateOfDelivery">Дата операции</label>
                        <Field
                            as="select"
                            name="dateOfDelivery"
                            className="form-control"
                            type="text" >
                            <option value="">Выберите дату операции</option>
                            {selectData()}
                        </Field>
                        <ErrorMessage className='error' name="dateOfDelivery" component='div' />
                    </div>
                    <div className="form-group">
                        <label htmlFor="goods">Сведения о грузе</label>
                        <div className="input-group row g-0">
                            <div className="col-md-6 px-0">
                            <Field
                                name="titleOfGoods"
                                id="titleOfGoods"
                                type="text"
                                className="form-control"
                                placeholder="Описание груза"
                                aria-label="Описание грузща">
                            </Field>
                            </div>
                            <div className="col-md-2 px-0" /* style={{"marginLeft": "2px"}} */>                            
                           {/*  <span className="input-group-text"> - </span> */}
                            <Field
                            as="select"
                                name="weight"
                                id="weight"
                                type="text"
                                className="form-control">
                                <option value="">Вес, тн</option>
                                <option value=">1">меньше 1</option>
                                {selectWeight()}
                                <option value="20>">больше 20</option>
                            </Field>
                            </div>
                            {/* <span className="input-group-text"> - </span> */}
                            <div className="col-md-4 px-0">    
                            <Field
                                name="items"
                                id="items"
                                type="text"
                                className="form-control"
                                placeholder="кол-во мест"
                                aria-label="Описание груза">
                            </Field>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="documentNumbers">Документы</label>
                        <Field
                            name="documentNumbers"
                            id="documentNumbers"
                            className="form-control"
                            type="text"
                            placeholder="номера документов (если необходимо)" />
                        <ErrorMessage className='error' name="documentNumbers" component='div' />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Дополнительные сведения</label>
                        <Field
                            name="description"
                            id="description"
                            as="textarea"
                            className="form-control"
                            type="text"
                            placeholder="детали операции (если необходимо)" />
                        <ErrorMessage className='error' name="description" component='div' />
                    </div>
                    <div className="form-group mt-2">
                        <button type="submit" className="btn btn-primary" style={{ "marginBottom": "4px" }} disabled={isSubmitting}>{isSubmitting ? "Добавление..." : "Добавить"}</button>
                        <button type="reset" className="btn btn-secondary" style={{ "marginLeft": "4px" }}>Очистить форму</button>
                    </div>
                </Form>
            )}
        </Formik>
    );

};

export default DeliveryForm;