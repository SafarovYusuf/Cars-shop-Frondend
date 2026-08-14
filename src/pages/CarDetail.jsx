import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Eye, Calendar, Gauge, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";

const CarDetail = () => {
  const { id } = useParams();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  const getOneCar = async () => {
    try {
      setLoading(true);

      console.log("ID:", id);

      const response = await axios.get(
        `http://localhost:5001/api/v1/cars/${id}`,
      );

      console.log("API response:", response.data);

      setCar(response.data.data);
    } catch (error) {
      console.log("ERROR:", error);
      toast.error("Mashina ma'lumotlarini olishda xatolik");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getOneCar();
    }
  }, [id]);

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

  if (!car) {
    return (
      <div className="container mt-5 text-center">
        <div className="alert alert-warning" role="alert">
          <h4 className="alert-heading">Mashina topilmadi!</h4>
          <p>Kechirasiz, siz qidirgan mashina ma'lumotlari mavjud emas.</p>
          <hr />
          <Link to="/" className="btn btn-primary">
            <ArrowLeft size={18} className="me-2" />
            Bosh sahifaga qaytish
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <Link to="/" className="btn btn-outline-secondary mb-4">
            <ArrowLeft size={18} className="me-2" />
            Orqaga qaytish
          </Link>

          <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
            {/* Rasm qismi */}
            <div className="position-relative">
              <img
                src={car.imageUrl}
                alt={car.carName}
                className="card-img-top"
                style={{
                  height: "400px",
                  objectFit: "cover",
                  backgroundColor: "#f8f9fa",
                }}
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/600x400?text=Rasm+topilmadi";
                }}
              />

              {/* Ko'rishlar soni badge */}
              <div className="position-absolute top-0 end-0 m-3">
                <span className="badge bg-dark bg-opacity-75 px-3 py-2">
                  <Eye size={16} className="me-2" />
                  {car.viewCount} marta ko'rilgan
                </span>
              </div>
            </div>

            {/* Ma'lumotlar qismi */}
            <div className="card-body p-4 p-lg-5">
              <h2 className="card-title mb-3 fw-bold">{car.carName}</h2>

              <div className="row g-4 mt-2">
                {/* Rang */}
                <div className="col-md-4">
                  <div className="d-flex align-items-center p-3 bg-light rounded-3">
                    <div
                      className="rounded-circle me-3"
                      style={{
                        width: "30px",
                        height: "30px",
                        backgroundColor: car.color || "#ccc",
                        border: "2px solid #dee2e6",
                      }}
                    />
                    <div>
                      <small className="text-muted d-block">Rangi</small>
                      <strong>{car.color}</strong>
                    </div>
                  </div>
                </div>

                {/* Ishlab chiqarilgan yili */}
                <div className="col-md-4">
                  <div className="d-flex align-items-center p-3 bg-light rounded-3">
                    <Calendar size={24} className="text-primary me-3" />
                    <div>
                      <small className="text-muted d-block">
                        Ishlab chiqarilgan yili
                      </small>
                      <strong>{car.manufacturingYear}</strong>
                    </div>
                  </div>
                </div>

                {/* Masofa */}
                <div className="col-md-4">
                  <div className="d-flex align-items-center p-3 bg-light rounded-3">
                    <Gauge size={24} className="text-success me-3" />
                    <div>
                      <small className="text-muted d-block">Masofa</small>
                      <strong>{car.mileage}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
