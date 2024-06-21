import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import CarTable from "../components/home/CarTable";
import CarCard from "../components/home/CarCard";

const Home = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType , setShowType]= useState(false)
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/cars")
      .then((response) => {
        setCars(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  return (
    <div className="p-4">
        <div className="flex justify-center items-center gap-x-4">
            <button className="bg-sky-800 text-white px-4 py-1 rounded-lg"
            onClick={() => setShowType("table") }
            >
                Table
            </button>
            <button className="bg-sky-800 text-white px-4 py-1 rounded-lg"
            onClick={() => setShowType("card") }
            >
                Card
            </button>
        </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Cars List</h1>
        <Link to="/cars/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? <Spinner /> :showType ==="table" ?  (<CarTable cars={cars} />) : (<CarCard cars={cars} />)}
    </div>
  );
};

export default Home;
