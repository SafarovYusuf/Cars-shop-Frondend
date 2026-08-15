import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Eye, Calendar, Palette, Gauge } from "lucide-react";
import SearchCar from "../components/SearchCar";
import AddCar from "./AddCar";
import "bootstrap/dist/css/bootstrap.min.css";

const AllCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const toastShown = useRef(false);

  // Search state
  const [search, setSearch] = useState("");
  const [color, setColor] = useState("");
  const [year, setYear] = useState("");
  const [sort, setSort] = useState("newest");

  // Add Car modal state
  const [showModal, setShowModal] = useState(false);

  const getAllCars = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://carpro.maktab16.uz/api/v1/cars");
      setCars(response.data.data);

      if (!toastShown.current) {
        toast.success("Mashinalar muvaffaqiyatli yuklandi");
        toastShown.current = true;
      }
    } catch (error) {
      console.log(error);
      if (!toastShown.current) {
        toast.error("Mashinalarni yuklashda xatolik yuz berdi");
        toastShown.current = true;
      }
    } finally {
      setLoading(false);
    }
  };

  // Yangi mashina qo'shilganda chaqiriladigan funksiya
  const handleCarAdded = (newCar) => {
    setCars([...cars, newCar]);
  };

  useEffect(() => {
    getAllCars();
    return () => {
      toastShown.current = false;
    };
  }, []);

  // Filter va sort logikasi
  const getFilteredCars = () => {
    let result = [...cars];

    if (search.trim()) {
      result = result.filter((car) =>
        car.carName.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (color) {
      result = result.filter((car) => car.color === color);
    }

    if (year) {
      result = result.filter((car) => car.manufacturingYear === parseInt(year));
    }

    if (sort === "newest") {
      result.sort((a, b) => b.manufacturingYear - a.manufacturingYear);
    } else if (sort === "oldest") {
      result.sort((a, b) => a.manufacturingYear - b.manufacturingYear);
    } else if (sort === "mostViewed") {
      result.sort((a, b) => b.viewCount - a.viewCount);
    }

    return result;
  };

  const filteredCars = getFilteredCars();

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Yuklanmoqda...</span>
        </div>
        <p className="mt-3 text-muted">Ma'lumotlar yuklanmoqda...</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      {/* Sarlavha va Add Car tugmasi */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="display-4 fw-bold text-dark">🚗 Mashinalar</h1>
          <p className="text-muted">Eng sara mashinalar bizda</p>
        </div>
        <AddCar
          show={showModal}
          setShow={setShowModal}
          onCarAdded={handleCarAdded}
        />
      </div>

      <div className="border-bottom w-100 mb-4"></div>

      {/* Search Bar */}
      <SearchCar
        search={search}
        onSearchChange={setSearch}
        color={color}
        onColorChange={setColor}
        year={year}
        onYearChange={setYear}
        sort={sort}
        onSortChange={setSort}
      />

      {/* Natijalar soni */}
      <div className="mb-3">
        <span className="text-muted">
          {filteredCars.length} ta mashina topildi
        </span>
      </div>

      {/* Mashinalar ro'yxati */}
      {filteredCars.length === 0 ? (
        <div className="text-center py-5">
          <div className="alert alert-warning">
            <h4>Mashinalar topilmadi!</h4>
            <p>Qidiruv shartlariga mos keladigan mashina mavjud emas.</p>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {filteredCars.map((car) => (
            <div key={car._id} className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm rounded-4 border-0 overflow-hidden">
                {/* Rasm */}
                <div className="position-relative" style={{ height: "220px" }}>
                  <img
                    src={car.imageUrl}
                    alt={car.carName}
                    className="w-100 h-100"
                    style={{ objectFit: "cover" }}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/400x220?text=Rasm+topilmadi";
                    }}
                  />

                  <div className="position-absolute top-0 end-0 m-2">
                    <span className="badge bg-dark bg-opacity-75">
                      <Eye size={14} className="me-1" />
                      {car.viewCount}
                    </span>
                  </div>
                </div>

                {/* Ma'lumotlar */}
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-3">{car.carName}</h5>

                  <div className="d-flex flex-column gap-2">
                    <div className="d-flex align-items-center gap-2">
                      <Palette size={18} />
                      <span className="text-muted small">Rangi:</span>
                      <span>{car.color}</span>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      <Calendar size={18} />
                      <span className="text-muted small">Yil:</span>
                      <span>{car.manufacturingYear}</span>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      <Gauge size={18} />
                      <span className="text-muted small">Masofa(km):</span>
                      <span>{car.mileage} </span>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                    <span className="text-muted small">
                      <Eye size={14} className="me-1" />
                      {car.viewCount} ko'rish
                    </span>

                    <Link
                      to={`/cars/${car._id}`}
                      className="btn btn-primary btn-sm rounded-pill px-4"
                    >
                      Batafsil →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllCars;
