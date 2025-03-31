import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Breadcrumb, Card, Button, ListGroup } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';

function ProductDetail() {
  const { productId } = useParams(); // Lấy productId từ URL
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null); // Lưu lỗi nếu có

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        
        console.log("Đang lấy dữ liệu sản phẩm với ID:", productId);
        
        
        const response = await fetch(`http://localhost:9999/products/${productId}`);
        console.log("Trạng thái phản hồi của sản phẩm:", response.status);
        
        if (!response.ok) {
          throw new Error('Không thể lấy thông tin sản phẩm');
        }
        
        const data = await response.json();
        console.log("Dữ liệu sản phẩm:", data);
        
        
        const categoryResponse = await fetch(`http://localhost:9999/categories/${data.categoryId}`);
        console.log("Trạng thái phản hồi của danh mục:", categoryResponse.status);
        
        if (!categoryResponse.ok) {
          throw new Error('Không thể lấy thông tin danh mục');
        }
        
        const categoryData = await categoryResponse.json();
        console.log("Dữ liệu danh mục:", categoryData);
        
        // Gộp dữ liệu sản phẩm với danh mục
        setProduct({...data, category: categoryData});
        setIsLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]); // Chạy khi productId thay đổi

  
  if (isLoading) {
    return <div className="text-center py-5">Đang tải...</div>;
  }

  
  if (error) {
    return <div className="text-center py-5 text-danger">Lỗi: {error}</div>;
  }

  
  if (!product) {
    return <div className="text-center py-5">Không tìm thấy sản phẩm</div>;
  }

  return (
    <Container>
      
      <Breadcrumb className="mb-3">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>eBay</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/store/${product.categoryId}` }}>
          {product.category.categoryName}
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
      </Breadcrumb>

      <Row>
        
        <Col md={6} className="mb-4">
          <img 
            src={product.image || "/placeholder.svg"} 
            alt={product.name} 
            className="img-fluid" 
            style={{ maxHeight: '500px', objectFit: 'contain' }}
          />
        </Col>

        
        <Col md={6}>
          <h1 className="mb-3">{product.name}</h1>
          
          <Card className="mb-4">
            <Card.Body>
              <Card.Title className="h2 mb-3">${Number(product.price).toFixed(2)}</Card.Title>
              <Card.Text className="text-success mb-3">
                {product.shipping === 0 ? 'Miễn phí vận chuyển' : `$${Number(product.shipping).toFixed(2)} phí vận chuyển`}
              </Card.Text>
              <Card.Text className="mb-4">
                <strong>Tình trạng:</strong> {product.condition}
              </Card.Text>
              <Card.Text className="mb-4">
                <strong>Số lượng có sẵn:</strong> {product.quantity}
              </Card.Text>
              
              
              <div className="d-grid gap-2">
                <Button variant="primary" size="lg">
                  Mua ngay
                </Button>
                <Button variant="outline-secondary" size="lg">
                  Thêm vào danh sách yêu thích
                </Button>
              </div>
            </Card.Body>
          </Card>
          
          
          <Card>
            <Card.Header>Thông tin người bán</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>Người bán:</strong> {product.seller}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Đánh giá:</strong> {product.sellerRating}% phản hồi tích cực
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Vị trí:</strong> {product.location}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>

      {/* Mô tả sản phẩm */}
      <Row className="mt-5">
        <Col>
          <Card>
            <Card.Header>Mô tả</Card.Header>
            <Card.Body>
              <p>{product.description}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetail;
