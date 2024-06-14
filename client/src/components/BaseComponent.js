import Navbar from "./Navbar";
import { Container, Row, Col } from 'react-bootstrap';
import RegisterCard from "./RegisterCard";
import LoginCard from './LoginCard';

export default function BaseComponent() {
    return (
        <div>
            <Navbar />
            <Container>
                <Row className="justify-content-md-center">
                    <Col md={6}>
                        <LoginCard />
                    </Col>
                    <Col md={6}>
                        <RegisterCard />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}