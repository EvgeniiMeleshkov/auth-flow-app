import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from 'formik';
import { useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';
import { AppRootStateType, useTypedDispatch} from '../../redux/store';
import {loginTC} from '../../reducers/authReducer';

type FormikErrorsType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = () => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useTypedDispatch()



    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate: (values) => {
            const errors: FormikErrorsType = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length < 2) {
                errors.password = 'Should be longer then two symbols'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(loginTC(values))

            // alert(JSON.stringify(values, null, 2));
            formik.resetForm()
        },
    });

    if(isLoggedIn) {return <Navigate to={'/'}/>}

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel style={{color: 'inherit'}}>

                    </FormLabel>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            {...formik.getFieldProps('email')}
                        />
                        {formik.errors.email && formik.touched.email &&
                            <div style={{color: 'red', fontWeight: 'bold'}}>{formik.errors.email}</div>}
                        <TextField type="password"
                                   label="Password"
                                   margin="normal"
                                   {...formik.getFieldProps('password')}
                        />
                        {formik.errors.password && formik.touched.password &&
                            <div style={{color: 'red', fontWeight: 'bold'}}>{formik.errors.password}</div>}
                        <FormControlLabel label={'Remember me'}
                                          control={
                                              <Checkbox checked={formik.values.rememberMe}
                                                        {...formik.getFieldProps('rememberMe')}
                                              />}/>
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}