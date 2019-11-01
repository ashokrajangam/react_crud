import React, {useState, Fragment} from 'react';
import Header from '../header/header';
import './Signup.css';
import useForm from 'react-hook-form';
import * as yup from 'yup';
import axios from 'axios';
import {Route, Redirect} from 'react-router-dom';
import SignIn from '../signin/SignIn';


const SignupSchema = yup.object().shape({
    firstName: yup.string()
                  .required('First Name is required')
                  .matches(/^[A-Za-z]+$/, { message:'Only alphabets', excludeEmptyString: true }),
    lastName: yup.string().required('Last Name is required'),
    email: yup.string().email().required('Email is required'),
    password1: yup.string().required().min(8, 'Password must be atleast 8 characters'),
    password2: yup.string().oneOf([yup.ref('password1'), null], 'Passwords do not match')
})

const Signup = () => {
    const initial_state = {
        firstName: '',
        lastName: '',
        email: '',
        password1: '',
        password2: ''
    };

    const [inputs, setInputs] = useState(initial_state);

    const [isSubmitted, setSubmitted] = useState({submitted:false});
    
    const {handleSubmit, register, errors} = useForm({validationSchema: SignupSchema});
    const onsubmit = (e) => {        
        axios.post('http://172.16.12.38/php/react_api/api.php', inputs)
        .then(response => {
            if(response.data === 1){
                setSubmitted({...isSubmitted, ["submitted"]:true});
            }else{                
                alert("error");
            }
        });       
        setInputs({...inputs, ...initial_state});    
    }
   
    const handleInputChange = (event) => {        
        setInputs({...inputs, [event.target.name]:event.target.value});                
    }    
    let redirect = null;
    
    if(isSubmitted.submitted){
        redirect=<Redirect to="/SignIn" />;
    }
    
    return (
        <Fragment>
            {redirect}
            <Header />
            <Route path='/signIn' exact component={SignIn}></Route>        
            <Route path="/" exact render={()=>
                <div className="container">                
                    <div className="form">
                        <form onSubmit={handleSubmit(onsubmit)} id="myForm" autoComplete="off"  >
                            <div className="row">
                                <div className="col-25">
                                    <label>First Name</label>
                                </div>
                                <div className="col-75">
                                    <input type="text" name="firstName"                             
                                        value={inputs.firstName} 
                                        onChange={handleInputChange} 
                                        ref={register} noValidate />
                                    <span className='error'>{errors.firstName && errors.firstName.message}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-25">
                                <label>Last Name</label>
                                </div>
                                <div className="col-75">
                                    <input type="text" name="lastName" 
                                        value={inputs.lastName} 
                                        onChange={handleInputChange} 
                                        ref={register} noValidate />
                                    <span className='error'>{errors.lastName && errors.lastName.message}</span>                   
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-25">
                                <label>Email Address</label>
                                </div>
                                <div className="col-75">
                                    <input type="email" name="email" 
                                        value={inputs.email} 
                                        onChange={handleInputChange} 
                                        ref={register} noValidate />
                                    <span className='error'>{errors.email && errors.email.message}</span>                      
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-25">
                                <label>Password</label>
                                </div>
                                <div className="col-75">
                                    <input type="password" name="password1" 
                                        value={inputs.password1} 
                                        onChange={handleInputChange} 
                                        ref={register} noValidate />
                                    <span className='error'>{errors.password1 && errors.password1.message}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-25">
                                <label>Re-enter Password</label>
                                </div>
                                <div className="col-75">
                                    <input type="password" name="password2" 
                                        value={inputs.password2} 
                                        onChange={handleInputChange} 
                                        ref={register} noValidate />
                                    <span className='error'>{errors.password2 && errors.password2.message}</span>                       
                                </div>
                            </div>
                            <div className="row">
                                <div className='col-75'>
                                    <input type="submit" value="Sign Up" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            }>
            </Route>
        </Fragment>
    )
}

export default Signup;