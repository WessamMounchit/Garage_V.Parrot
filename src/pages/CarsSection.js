import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import CarItem from '../components/Cars/CarItem'
import CarFilters from '../components/Cars/CarFilters';
import CarPagination from '../components/Cars/CarPagination';
import '../styles/Cars/car-section.css'
import CommonSection from '../components/UI/CommonSection';
import fetchData from '../utils/fetchData';
import { onGetCars } from '../api/cars';
import Helmet from '../components/UI/Helmet';

const CarsSection = () => {

  //////////  STATE   //////////

  const [searchTerm, setSearchTerm] = useState("");
  const [cars, setCars] = useState({
    loading: false,
    error: false,
    data: undefined,
  });

  const date = new Date();
  const year = date.getFullYear();

  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 100000,
    minYear: 2000,
    maxYear: year,
    minMileage: 0,
    maxMileage: 100000,
  });

  useEffect(() => {
    fetchData(setCars, onGetCars);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [cars]);



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
      (filters.minMileage === '' || mileage >= filters.minMileage) &&
      (filters.maxMileage === '' || mileage <= filters.maxMileage)
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
  const carsPerPage = 6;

  const filteredAndSearchedCars = filteredCars?.filter((car) =>
    car.car_name.toLowerCase().includes(searchTerm.toLowerCase())
  )


  const totalPages = Math.ceil(filteredAndSearchedCars?.length / carsPerPage);
  const currentCars = paginate(filteredAndSearchedCars, carsPerPage, currentPage);

  //////////  CONTENT   //////////

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
      <CarItem
        car={car}
        key={car.car_id}
      />
    ))
  }

  return (

    <Helmet title="Cars">
      <CommonSection title="Nos voitures" />

      <section>
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h6 className="section__subtitle">Découvrez</h6>
              <h2 className="section__title">Nos voitures</h2>
            </Col>
            <div className="search mb-4">
              <input
                type="text"
                placeholder="Recherchez par nom de voiture"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <span>
                <i class="ri-search-line ri-lg"></i>
              </span>
            </div>
            <CarFilters
              filters={filters}
              setFilters={setFilters}
            />
            {content}
            <CarPagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default CarsSection