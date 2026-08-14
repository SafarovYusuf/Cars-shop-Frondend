import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaSearch } from "react-icons/fa";

function SearchBar({
  search,
  onSearchChange,
  color,
  onColorChange,
  year,
  onYearChange,
  sort,
  onSortChange,
}) {
  return (
    <Row className="g-2 mb-3 align-items-end">
      <Col xs={12} md={4}>
        <InputGroup>
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Avtomobil nomini qidirish..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </InputGroup>
      </Col>

      <Col xs={6} md={2}>
        <Form.Select
          value={color}
          onChange={(e) => onColorChange(e.target.value)}
        >
          <option value="">Rang</option>
          <option value="Qora">Qora</option>
          <option value="Oq">Oq</option>
          <option value="Qizil">Qizil</option>
          <option value="Ko'k">Ko'k</option>
          <option value="Kumush">Kumush</option>
        </Form.Select>
      </Col>

      <Col xs={6} md={2}>
        <Form.Select
          value={year}
          onChange={(e) => onYearChange(e.target.value)}
        >
          <option value="">Yil</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
        </Form.Select>
      </Col>

      <Col xs={12} md={3}>
        <Form.Select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="newest">Eng yangi</option>
          <option value="oldest">Eng eski</option>
          <option value="mostViewed">Ko'p ko'rilgan</option>
        </Form.Select>
      </Col>
    </Row>
  );
}

export default SearchBar;
