import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    categoryId: "",
    condition: "New",
    shipping: "",
    quantity: "",
    seller: "",
    location: "",
    sellerRating: 100,
    rating: 0,
    reviews: 0
  });

  const [categories, setCategories] = useState([]);
  
  
  useEffect(() => {
    axios.get("http://localhost:9999/categories").then((res) => {
      setCategories(res.data);
    });

    
    axios.get(`http://localhost:9999/products/${id}`)
      .then((res) => {
        setFormData(res.data);
      })
      .catch((error) => {
        console.error("Lỗi khi tải sản phẩm:", error);
      });

  }, [id]);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:9999/products/${id}`, formData);
      alert("Cập nhật sản phẩm thành công!");
      navigate("/admin");
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error);
    }
  };

  return (
    <Container>
      <h2>Cập Nhật Sản Phẩm</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Tên sản phẩm</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Mô tả</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Giá</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Hình ảnh (URL)</Form.Label>
          <Form.Control
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Danh mục</Form.Label>
          <Form.Control as="select" name="categoryId" value={formData.categoryId} onChange={handleChange} required>
            <option value="">Chọn danh mục</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.categoryName}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Tình trạng</Form.Label>
          <Form.Control as="select" name="condition" value={formData.condition} onChange={handleChange} required>
            <option value="New">Mới</option>
            <option value="Used">Đã sử dụng</option>
            <option value="Used - Like New">Như mới</option>
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Phí vận chuyển</Form.Label>
          <Form.Control
            type="number"
            name="shipping"
            value={formData.shipping}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Số lượng</Form.Label>
          <Form.Control
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Người bán</Form.Label>
          <Form.Control
            type="text"
            name="seller"
            value={formData.seller}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Vị trí</Form.Label>
          <Form.Control
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">Cập nhật sản phẩm</Button>
      </Form>
    </Container>
  );
};

export default UpdateProduct;
