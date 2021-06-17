import React from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css';

const Shipment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
   
    <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>
      
      <input name='name'defaultValue={loggedInUser.name}{...register("name", { required: true })} placeholder='your name'/>
      {errors.name && <span className='error'>Name is required</span>}

      <input name='email' defaultValue={loggedInUser.email}{...register("email", { required: true })} placeholder='your email'/>
      {errors.name && <span className='error'>Email is required</span>}

      <input name='address'{...register("address", { required: true })} placeholder='your address'/>
      {errors.name && <span className='error'>Address is required</span>}
      
      <input type="submit" />
    </form>
  );
};

export default Shipment;