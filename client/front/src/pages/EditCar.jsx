
import  { useState,useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate ,useParams} from 'react-router-dom';

const EditCar = () => {
  const [licensePlate, setLicensePlate] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [remarks, setRemarks] = useState('');
  const [etc, setEtc] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/cars/${id}`)
      .then((response) => {
        setLicensePlate(response.data.licensePlate);
        setBrand(response.data.brand);
        setModel(response.data.model);
        setRemarks(response.data.remarks);
        setEtc(response.data.etc);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error occured");
        console.log(error);
      });
  }, []);
  const handleEditCar =() =>{
    const data ={
      licensePlate,
      brand,
      model,
      remarks,
      etc
    }
    setLoading(true);
    axios
      .put(`http://localhost:5555/cars/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        alert("An error occured");
        console.log(error);
      });
  }
  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'> Edit Car</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-800 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <label className="text-xl mr-4 text-gray-500"> License Plate</label>
            <input
              type="text"
              value={licensePlate}
              onChange={(e) => setLicensePlate(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full"
              />
          </div>
          <div className='my-4'>
            <label className="text-xl mr-4 text-gray-500"> Brand</label>
            <input  
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full"
              />
          </div>
          <div className='my-4'>
            <label className="text-xl mr-4 text-gray-500"> Model</label>
            <input  
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full"
              />
          </div>
          <div className='my-4'>
            <label className="text-xl mr-4 text-gray-500"> Remarks</label>
            <input
              type="text"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full"
              />
          </div>
          <div className='my-4'>
            <label className="text-xl mr-4 text-gray-500"> Etc</label>
            <input
              type="text"
              value={etc}
              onChange={(e) => setEtc(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full"
              />
          </div>
          <div className='my-4'>
            <button 
              onClick={handleEditCar}
              className="bg-sky-800  text-white px-4 py-1  rounded-lg w-fit"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
export default EditCar