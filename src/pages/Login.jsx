"use client" // Chỉ định đây là component client-side trong Next.js (nếu dùng Next.js)


import { useState } from "react"
import { Form, Button, Card, Container, Row, Col, Alert } from "react-bootstrap"
import { useNavigate } from "react-router-dom" // Hook để điều hướng trang

function Login() {
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("") 
  const navigate = useNavigate() // Hook điều hướng đến trang khác sau khi đăng nhập thành công

  // Xử lý sự kiện khi người dùng nhấn nút đăng nhập
  const handleSubmit = async (e) => {
    e.preventDefault() 
    setError("") 

    try {
      
      const response = await fetch("http://localhost:9999/users")
      const users = await response.json()

      
      const user = users.find((u) => u.email === email && u.password === password)

      if (user) {
        
        localStorage.setItem("isLoggedIn", "true")
        localStorage.setItem("userId", user.id)
        navigate("/") 
      } else {
        
        setError("Invalid email or password")
      }
    } catch (err) {
      
      setError("Error connecting to server. Please try again.")
      console.error(err)
    }
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Header as="h4" className="text-center">
              Sign In
            </Card.Header>
            <Card.Body>
              
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                  />
                </Form.Group>

                
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Cập nhật state khi nhập password
                    required 
                  />
                </Form.Group>

                
                <Button variant="primary" type="submit" className="w-100">
                  Sign In
                </Button>

                
                <div className="text-center mt-3">
                  <p>
                    Don't have an account? <a href="#register">Register</a>
                  </p>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Login 
