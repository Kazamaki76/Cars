import   { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import  {Link}  from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const Home = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      setLoading(true);
      axios
        .get('http://localhost:5555/cars')
        .then((response) => {
          setCars(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }, []);
    return(
        <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Cars List</h1>
        <Link to='/cars/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className='w-full border-separate border-spacing-2'>
          <thead>
            <tr>
              <th className='border border-slate-600 rounded-md'>No</th>
              <th className='border border-slate-600 rounded-md'>licensePlate</th>
              <th className='border border-slate-600 rounded-md max-md:hidden'>
              brand
              </th>
              <th className='border border-slate-600 rounded-md max-md:hidden'>
              model
              </th>
              <th className='border border-slate-600 rounded-md'>remarks</th>
              <th className='border border-slate-600 rounded-md'>etc</th>
              <th className='border border-slate-600 rounded-md'>EDIT</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car, index) => (
              <tr key={car._id} className='h-8'>
                <td className='border border-slate-700 rounded-md text-center'>
                  {index + 1}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  {car.licensePlate}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                  {car.brand}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                  {car.model}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                  {car.remarks}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                  {car.etc}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  <div className='flex justify-center gap-x-4'>
                    <Link to={`/cars/details/${car._id}`}>
                      <BsInfoCircle className='text-2xl text-green-800' />
                    </Link>
                    <Link to={`/cars/edit/${car._id}`}>
                      <AiOutlineEdit className='text-2xl text-yellow-600' />
                    </Link>
                    <Link to={`/cars/delete/${car._id}`}>
                      <MdOutlineDelete className='text-2xl text-red-600' />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    )}

    export default Home