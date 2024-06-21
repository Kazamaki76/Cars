import  { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

 const ShowCar = () => {
    const [car, setCar] = useState({});
    const [loading, setLoading] = useState(false);
    const{id} =useParams();

    useEffect(() => {
        setLoading(true);
        axios
          .get(`http://localhost:5555/cars/${id}`)
          .then((response) => {
            setCar(response.data);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      }, []);
  return (
    <div className='p-4'>
        <BackButton/>
        <h1 className='text-3xl my-4'> Show Car</h1>
        {loading ? (
          <Spinner />
        ) : (
          <div className='flex flex-col border-2 border-sky-800 rounded-xl w-fit p-4'>
            <div className='my-4'>
            <span className="text-xl mr-4 text-gray-500"> ID</span>
            <span className="text-xl text-sky-800">{car._id}</span>
            </div>
            <div className='my-4'>
            <span className="text-xl mr-4 text-gray-500"> License Plate</span>
            <span className="text-xl text-sky-800">{car.licensePlate}</span>
            </div>
            <div className='my-4'>
            <span className="text-xl mr-4 text-gray-500"> Brand</span>
            <span className="text-xl text-sky-800">{car.brand}</span>
            </div>
            <div className='my-4'>
            <span className="text-xl mr-4 text-gray-500"> Model</span>
            <span className="text-xl text-sky-800">{car.model}</span>
            </div>
            <div className='my-4'>
            <span className="text-xl mr-4 text-gray-500"> Remarks</span>
            <span className="text-xl text-sky-800">{car.remarks}</span>
            </div>
            <div className='my-4'>
            <span className="text-xl mr-4 text-gray-500"> Etc</span>
            <span className="text-xl text-sky-800">{car.etc}</span>
            </div>
            <div className="text-xl mr-4 text-gray-500">
            Create At
            <br /> 
            <span className="text-xl text-sky-800">{new Date(car.createdAt).toString()}</span>
            </div>
            <div className="text-xl mr-4 text-gray-500">
            Lasted Update 
            <br />
            <span className="text-xl text-sky-800">{new Date(car.updatedAt).toString()}</span>
            </div>

          </div>
        )}
    </div>
  )
}
export default ShowCar