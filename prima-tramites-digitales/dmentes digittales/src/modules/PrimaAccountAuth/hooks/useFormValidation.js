import React, { useState, useEffect } from 'react'

const useFormValidation = (initialState, validate, runOnSubmit) => {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState([]);
    const [isSubmitting, setSubmitting] = useState(false);

    useEffect(() => {
        // only call form submission if submit was hit
        if (isSubmitting) {
            const noErrors = Object.keys(errors).length === 0;
            // only call form submission if there are no errors
            if (noErrors) {
                // clear out touched upon submission
                setTouched([]);
                // run form submission when no errors
                runOnSubmit();
                setSubmitting(false);
            } else {
                setSubmitting(false);
            }
        }
    }, [errors]);

    
    useEffect(() => {
        const validationErrors = validate(values);
        const touchedErrors = Object.keys(validationErrors)
            .filter(key => touched.includes(key))
            .reduce((acc, key) => {
                if (!acc[key]) {
                    acc[key] = validationErrors[key]
                }
                return acc
            }, {})
        setErrors(touchedErrors);
       
    }, [touched, values]);


    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    }

    
    const handleBlur = (event) => {
        if (!touched.includes(event.target.name)) {
            setTouched([
                ...touched,
                event.target.name
            ])
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validate(values);
        setErrors(validationErrors);
        setSubmitting(true);
    }
    return {
        handleSubmit,
        handleChange,
        handleChangeChecked,
        handleBlur,
        values,
        errors,
        isSubmitting
    };
}

export default useFormValidation