import React, { useEffect, useState } from 'react';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import InputModel from '../Models/InputModel';
import "../Styles/Form.css";

export const FormComponent = (props:{values: {}, inputArray: InputModel[], validationSchema: Object, onFormSubmit: (value: Object) => void}) => {
    
    const handleFormSubmit = (formData: {}, onSubmitProps: any) =>{
        onSubmitProps.setSubmitting(false);
        onSubmitProps.resetForm();

        let data = formData as Object;
        props.onFormSubmit(data);
    }
    
    return(
        <Formik
        enableReinitialize
        initialValues={props.values}
        validationSchema={props.validationSchema}
        onSubmit={(formData, onSubmitProps) => {
          handleFormSubmit(formData, onSubmitProps);
        }}
        
        >
            {
                () => (
                    <Form>
                        {
                            props.inputArray.map(input => 
                                <div key={input.id.toString()} style={input.display == false ? {display: 'none'} : {}}>
                                    <label htmlFor={input.name}>{input.lable}</label><br />
                                    <Field name={input.name} type={input.type}/><br />
                                    <p><ErrorMessage name={input.name} /></p>
                                </div>
                            )
                        }
                        <button type="submit">Submit Form</button>
                    </Form>
                )
            }
            
        </Formik>
    )



}

