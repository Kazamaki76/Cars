import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

 const DeleteCar = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const handleDeleteCar = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/cars/${id}`)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error occured');
        console.log(error);
      });
  };
  return (

    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Delete Car</h1>
      {loading? <Spinner/> :""}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are you sure you want to delete this car?</h3>
        <button className='bg-red-500 text-white px-4 py-1 rounded-lg mt-4' onClick={handleDeleteCar}> 
          Oh Yeah, delete it 
        </button>
      </div>
      </div>
  )
}

export default DeleteCar