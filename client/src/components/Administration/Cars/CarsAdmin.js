import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { toast } from "react-toastify";
import CustomModal from "../../UI/CustomModal";
import EditCar from "./EditCar";
import AddCar from "./AddCar";
import CarPagination from "../../Cars/CarPagination";
import { deleteCar, getCars } from "../../../api/cars";
import fetchData from "../../../utils/fetchData";
import { Link } from "react-router-dom";
import CarFilters from "../../Cars/CarFilters";

const CarsAdmin = () => {
  //////////  STATE   //////////

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const date = new Date();
  const year = date.getFullYear();
  const [cars, setCars] = useState({
    loading: false,
    error: false,
    data: undefined,
  });

  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 100000,
    minYear: 2000,
    maxYear: year,
    minMileage: 0,
    maxMileage: 500000,
  });

  //////////  API   //////////

  useEffect(() => {
    fetchData(setCars, getCars);
  }, []);

  const handleAddCar = () => {
    try {
      fetchData(setCars, getCars);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateCar = async () => {
    try {
      fetchData(setCars, getCars);
      handleModalClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCar = async (carId) => {
    try {
      await deleteCar(carId);
      toast.success("La voiture a été supprimée avec succès");
    } catch (error) {
      toast.error(error.response.data.error);
    }

    fetchData(setCars, getCars);
  };
  //////////  MODAL   //////////

  const handleModalOpen = (car) => {
    setSelectedCar({ ...car });
    setIsUpdateModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedCar(null);
    setIsUpdateModalOpen(false);
  };

  //////////  FILTERS   //////////

  const filteredCarsByRange = cars.data?.filter((car) => {
    const price = car.price;
    const year = car.year;
    const mileage = car.mileage;

    return (
      (filters.minPrice === "" || price >= filters.minPrice) &&
      (filters.maxPrice === "" || price <= filters.maxPrice) &&
      (filters.minYear === "" || year >= filters.minYear) &&
      (filters.maxYear === "" || year <= filters.maxYear) &&
      (filters.minMileage === "" || mileage >= filters.minMileage) &&
      (filters.maxMileage === "" || mileage <= filters.maxMileage)
    );
  });

  //////////  PAGINATION & SEARCH   //////////

  const handleSearch = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
    setCurrentPage(1);
  };

  const paginate = (items, itemsPerPage, currentPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items?.slice(startIndex, endIndex);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 7;

  const filteredCars = filteredCarsByRange?.filter((car) =>
    car.car_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCars = filteredCars?.sort(
    (a, b) => a.car_id - b.car_id
  );
  const totalPages = Math.ceil(sortedCars?.length / carsPerPage);
  const currentCars = paginate(sortedCars, carsPerPage, currentPage);

  //////////  ICONS   //////////

  const addIcon = (
    <i
      className="btn ri-add-circle-line add__icon text-end ri-lg p-0 "
      onClick={() => setIsAddModalOpen(true)}
    ></i>
  );

  //////////  CONTENT   //////////

  let content;
  if (cars.loading) {
    content = (
      <div className="d-flex justify-content-center align-items-center">
        <img src="spinner.svg" alt="chargement" />
      </div>
    );
  } else if (cars.error) {
    content = (
      <p className="fw-bold fs-4 text-center">Une erreur est survenue...</p>
    );
  } else if (cars.data?.length === 0) {
    content = (
      <p className="fw-bold fs-4 text-center">Aucune voiture disponible</p>
    );
  } else if (cars.data?.length > 0) {
    content = (
      <table className="table styled-table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nom</th>
            <th scope="col">Année</th>
            <th scope="col">Prix</th>
            <th scope="col">Kilometrage</th>
            <th scope="col">Modifier</th>
            <th scope="col">Supprimer</th>
            <th scope="col">Détails</th>
          </tr>
        </thead>
        <tbody>
          {currentCars?.map((car) => (
            <tr key={car.car_id}>
              <th scope="row">{car.car_id}</th>
              <td data-label="Nom">{car.car_name}</td>
              <td data-label="Année">{car.year}</td>
              <td data-label="Prix">{car.price.toLocaleString()} €</td>
              <td data-label="Kilometrage">
                {car.mileage.toLocaleString()} km
              </td>
              <td data-label="Modifier">
                {
                  <i
                    className="btn ri-edit-box-line edit__icon ri-lg p-0 "
                    onClick={() => handleModalOpen(car)}
                  ></i>
                }
              </td>
              <td data-label="Supprimer">
                {
                  <i
                    className="btn ri-delete-bin-line delete__icon ri-lg p-0 "
                    onClick={() => handleDeleteCar(car.car_id)}
                  ></i>
                }
              </td>
              <td data-label="Détails">
                <Link to={`/${car.car_name}/${car.car_id}`}>
                  <i className="btn ri-eye-line ri-lg eye__icon p-0"></i>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <Container>
      <div className="search">
        <input
          type="text"
          placeholder="Recherchez par nom de voiture"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <span>
          <i className="ri-search-line ri-lg"></i>
        </span>
      </div>
      <CarFilters filters={filters} setFilters={setFilters} />
      <div className="text-end me-4">{addIcon}</div>
      {content}
      <CarPagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />

      {/*   //////////  MODALS   ////////// */}

      <CustomModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Ajouter une voiture"
      >
        <AddCar onSubmit={handleAddCar} />
      </CustomModal>

      <CustomModal
        isOpen={isUpdateModalOpen}
        onClose={handleModalClose}
        title="Modifier une voiture"
      >
        {selectedCar && (
          <EditCar car={selectedCar} onSubmit={handleUpdateCar} />
        )}
      </CustomModal>
    </Container>
  );
};

export default CarsAdmin;
