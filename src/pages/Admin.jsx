import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:9999/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      try {
        await axios.delete(`http://localhost:9999/products/${id}`);
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>Quản lý Sản phẩm</h2>
      <Button variant="primary" onClick={() => navigate("/create")}>
        Thêm sản phẩm
      </Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Giá</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>${Number(product.price).toFixed(2)}</td> {/* Chuyển price sang số */}
              <td>
                <Button
                  variant="info"
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="me-2"
                >
                  Chi tiết
                </Button>
                <Button
                  variant="warning"
                  onClick={() => navigate(`/edit/${product.id}`)}
                  className="me-2"
                >
                  Sửa
                </Button>
                <Button variant="danger" onClick={() => handleDelete(product.id)}>
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminProducts;
