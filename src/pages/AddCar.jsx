import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import axios from "axios";

function AddCar({ show, setShow, onCarAdded }) {
  const [carName, setCarName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [color, setColor] = useState("");
  const [manufacturingYear, setManufacturingYear] = useState("");
  const [mileage, setMileage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setShow(false);
    // Formani tozalash
    setCarName("");
    setImageUrl("");
    setColor("");
    setManufacturingYear("");
    setMileage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ma'lumotlarni tekshirish
    if (!carName || !imageUrl || !color || !manufacturingYear || !mileage) {
      toast.warning("Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }

    setLoading(true);

    try {
      // Backendga POST so'rov yuborish
      const newCar = {
        carName,
        imageUrl,
        color,
        manufacturingYear: parseInt(manufacturingYear),
        mileage: parseInt(mileage),
        viewCount: 0,
      };

      const response = await axios.post(
        "http://localhost:5001/api/v1/cars",
        newCar,
      );

      console.log("Yangi mashina qo'shildi:", response.data);

      toast.success("Mashina muvaffaqiyatli qo'shildi! 🎉");

      // Parent komponentga yangi mashina qo'shilganini bildirish
      if (onCarAdded) {
        onCarAdded(response.data.data);
      }

      // Modalni yopish va formani tozalash
      handleClose();
    } catch (error) {
      console.error("Xatolik:", error);
      toast.error(
        error.response?.data?.message || "Mashina qo'shishda xatolik yuz berdi",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={() => setShow(true)}
        className="mb-3 px-4 py-2"
      >
        <i className="bi bi-plus-circle me-2"></i>
        Mashina qo'shish
      </Button>

      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>
            <i className="bi bi-car-front me-2"></i>
            Yangi mashina qo'shish
          </Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {/* Mashina nomi */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">
                <i className="bi bi-tag me-2"></i>
                Mashina nomi
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Mashina nomini kiriting (mas: Toyota Camry)"
                value={carName}
                onChange={(e) => setCarName(e.target.value)}
                required
                className="shadow-sm"
              />
            </Form.Group>

            {/* Rasm URL */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">
                <i className="bi bi-image me-2"></i>
                Rasm URL
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Rasm manzilini kiriting (URL)"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
                className="shadow-sm"
              />
              {imageUrl && (
                <div className="mt-2">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                    className="border"
                    onError={(e) => {
                      e.target.style.display = "none";
                      toast.warning("Rasm yuklanmadi, boshqa URL kiriting");
                    }}
                  />
                </div>
              )}
            </Form.Group>

            {/* Rang */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">
                <i className="bi bi-palette me-2"></i>
                Rangi
              </Form.Label>
              <Form.Select
                value={color}
                onChange={(e) => setColor(e.target.value)}
                required
                className="shadow-sm"
              >
                <option value="">Rangni tanlang</option>
                <option value="Qora">⚫ Qora</option>
                <option value="Oq">⚪ Oq</option>
                <option value="Qizil">🔴 Qizil</option>
                <option value="Ko'k">🔵 Ko'k</option>
                <option value="Kumush">🔘 Kumush</option>
                <option value="Yashil">🟢 Yashil</option>
                <option value="Sariq">🟡 Sariq</option>
                <option value="Jigarrang">🟤 Jigarrang</option>
                <option value="Binafsha">🟣 Binafsha</option>
                <option value="To'q sariq">🟠 To'q sariq</option>
              </Form.Select>
            </Form.Group>

            {/* Ishlab chiqarilgan yili */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">
                <i className="bi bi-calendar me-2"></i>
                Ishlab chiqarilgan yili
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Masalan: 2024"
                value={manufacturingYear}
                onChange={(e) => setManufacturingYear(e.target.value)}
                min="1900"
                max="2026"
                required
                className="shadow-sm"
              />
            </Form.Group>

            {/* Masofa */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">
                <i className="bi bi-speedometer2 me-2"></i>
                Masofa (km)
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Masofani kiriting (masalan: 50000)"
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
                min="0"
                required
                className="shadow-sm"
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={handleClose}
              disabled={loading}
            >
              Bekor qilish
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Saqlanmoqda...
                </>
              ) : (
                <>
                  <i className="bi bi-save me-2"></i>
                  Saqlash
                </>
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default AddCar;
