import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import CarItem from './CarItem'
import { onDeleteCar, onGetCars } from '../../api/cars';
import fetchData from '../../utils/fetchData';
import CarFilters from './CarFilters';
import CarPagination from './CarPagination';
import CustomModal from './CustomModal';
import { useSelector } from 'react-redux';
import AddCar from '../AddCar';
import EditCar from '../EditCar';
import { toast } from 'react-toastify';
import '../../styles/car-section.css'

const CarsSection = () => {

  //////////  STATE   //////////

  const { isAuth } = useSelector((state) => state.auth);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const handleModalOpen = (car) => {
    setSelectedCar({ ...car });
    setIsUpdateModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedCar(null);
    setIsUpdateModalOpen(false);
  };

  const [cars, setCars] = useState({
    loading: false,
    error: false,
    data: undefined,
  });

  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    minYear: '',
    maxYear: '',
    maxMileage: '',
  });

  useEffect(() => {
    fetchData(setCars, onGetCars);
  }, []);


  //////////  FILTERS   //////////


  const filteredCars = cars.data?.filter((car) => {
    const price = car.price;
    const year = car.year;
    const mileage = car.mileage;

    return (
      (filters.minPrice === '' || price >= filters.minPrice) &&
      (filters.maxPrice === '' || price <= filters.maxPrice) &&
      (filters.minYear === '' || year >= filters.minYear) &&
      (filters.maxYear === '' || year <= filters.maxYear) &&
      (filters.maxMileage === '' || mileage <= filters.maxMileage)
    );
  });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  //////////  PAGINATION   //////////

  const paginate = (items, itemsPerPage, currentPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items?.slice(startIndex, endIndex);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 6;

  const totalPages = Math.ceil(filteredCars?.length / carsPerPage);
  const currentCars = paginate(filteredCars, carsPerPage, currentPage);

  //////////  API   //////////


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
      const response = await onDeleteCar(carId)
      toast.success(response.data.info)

    } catch (error) {
      toast.error(error.response.data.error)
    }

    fetchData(setCars, onGetCars)
  };




  const addIcon = isAuth && (
    <i
      type="button"
      variant="warning"
      className="ri-add-box-fill add__icon text-end ri-lg mb-4"
      onClick={() => setIsAddModalOpen(true)}>
    </i>
  )


  return (
    <section>
      <Container>
        <Row>

          <Col lg="12" className="text-center mb-5">
            <h6 className="section__subtitle">Découvrez</h6>
            <h2 className="section__title">Nos voitures</h2>
          </Col>
          <CarFilters filters={filters} handleFilterChange={handleFilterChange} />
          {addIcon}
          {currentCars?.map((car) => (
            <CarItem
              car={car}
              key={car.car_id}
              handleModalOpen={() => handleModalOpen(car)}
              handleDeleteCar={() => { handleDeleteCar(car.car_id) }}
            />
          ))}
          <CarPagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />

        </Row>
      </Container>



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

    </section>

  )
}

export default CarsSection