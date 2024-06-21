import CarSingleCard from "./CarSingleCard";
const CarCard = ({ cars }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {cars.map((item) => (
            <CarSingleCard key={item._id} car={item} />
      ))}
    </div>
  );
};

export default CarCard;
