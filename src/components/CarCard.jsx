function CarCard() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-4 border py-3 px-3 rounded">
          <img
            src="../assets/2025-kia-k5-white.jpg"
            alt="image"
          />
          <p className="text text-start">BMW X5</p>
          <div className="text text-bold text-start py-1 px-1 d-inline align-items-  text-primary bg-info rounded">
            Qora
          </div>
          <p className="text text-start">2022-yil</p>
          <p className="text text-start">45 000 km</p>

          <div className="d-flex justify-content-between">
            <div className="view">👁️ 128</div>
            <button className="btn border rounded">Batafsil</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarCard;
