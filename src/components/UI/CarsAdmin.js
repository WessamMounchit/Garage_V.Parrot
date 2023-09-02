import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { toast } from 'react-toastify';
import CustomModal from './CustomModal';
import EditCar from '../EditCar';
import AddCar from '../AddCar';
import CarItem from './CarItem';
import CarPagination from './CarPagination';
import { onDeleteCar, onGetCars } from '../../api/cars';
import fetchData from '../../utils/fetchData';

const CarsAdmin = () => {

  //////////  STATE   //////////

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [cars, setCars] = useState({
    loading: false,
    error: false,
    data: undefined,
  });

  //////////  API   //////////

  useEffect(() => {
    fetchData(setCars, onGetCars);
  }, []);


  const handleAddCar = () => {
    try {
      fetchData(setCars, onGetCars)
      setIsAddModalOpen(false)
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateCar = async () => {
    try {
      fetchData(setCars, onGetCars)
      handleModalClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCar = async (carId) => {
    try {
      await onDeleteCar(carId)
      toast.success("La voiture a été supprimée avec succès")

    } catch (error) {
      toast.error(error.response.data.error)
    }

    fetchData(setCars, onGetCars)
  };
  //////////  MODAL   //////////

  const handleViewModalOpen = (car) => {
    setSelectedCar({ ...car });
    setIsViewModalOpen(true);
  };

  const handleViewModalClose = () => {
    setSelectedCar(null);
    setIsViewModalOpen(false);
  };


  const handleModalOpen = (car) => {
    setSelectedCar({ ...car });
    setIsUpdateModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedCar(null);
    setIsUpdateModalOpen(false);
  };

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

  const filteredCars = cars.data?.filter((car) =>
    car.car_name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  const totalPages = Math.ceil(filteredCars?.length / carsPerPage);
  const currentCars = paginate(filteredCars, carsPerPage, currentPage);


  //////////  ICONS   //////////

  const addIcon = (
    <i
      className="btn ri-add-box-fill add__icon text-end ri-lg p-0 "
      onClick={() => setIsAddModalOpen(true)}>
    </i>
  )

  let content;
  if (cars.loading) {
    content = <img src="spinner.svg" alt='chargement' />
  }
  else if (cars.error) {
    content = <p>Une erreur est survenue...</p>
  }
  else if (cars.data?.length === 0) {
    content = <p>Aucune voiture disponible</p>
  }
  else if (cars.data?.length > 0) {
    content = currentCars?.map((car) => (
      <tr key={car.car_id}>
        <th scope="row">{car.car_id}</th>
        <td>{car.car_name}</td>
        <td>{car.year}</td>
        <td>{car.price.toLocaleString()} €</td>
        <td>{car.mileage.toLocaleString()} km</td>
        <td>{<i className="btn ri-edit-box-fill edit__icon ri-lg p-0 " onClick={() => handleModalOpen(car)}></i>}</td>
        <td>{<i className="btn ri-delete-bin-fill delete__icon ri-lg p-0 " onClick={() => handleDeleteCar(car.car_id)}></i>}</td>
        <td><button onClick={() => handleViewModalOpen(car)} className='btn btn-info'>Voir en détails</button></td>
      </tr>
    ))
  }

  return (
    <Container>
      <input
        type="text"
        placeholder="Rechercher par nom de voiture"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <span className='text-end'>{addIcon}</span>
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
          {content}
        </tbody>
      </table>
      <CarPagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />



      {/*   //////////  MODALS   ////////// */}

      <CustomModal
        isOpen={isViewModalOpen}
        onClose={handleViewModalClose}
        title='Visualisation'
      >
        {selectedCar && <CarItem car={selectedCar} />}
      </CustomModal>

      <CustomModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title='Ajouter une voiture'
      >
        <AddCar onSubmit={handleAddCar} />
      </CustomModal>

      <CustomModal
        isOpen={isUpdateModalOpen}
        onClose={handleModalClose}
        title='Modifier une voiture'
      >
        {selectedCar &&
          <EditCar
            car={selectedCar}
            onSubmit={handleUpdateCar}
          />}
      </CustomModal>




    </Container>

  )
}

export default CarsAdmin