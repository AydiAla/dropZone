import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { FaStar, FaUserTie, FaClock, FaUser } from "react-icons/fa";
import onlineclass from "../components/Assets/imgs/course-1.jpg";
import design from "../components/Assets/imgs/course-2.jpg";
import cours3 from "../components/Assets/imgs/course-3.jpg";

function PopularCourses() {
  return (
    <Container fluid className="py-5">
      <Container>
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h3 className="section-title bg-white text-center text-primary px-3">
            Cours
          </h3>
          <h1 className="mb-5">Cours Populaires</h1>
        </div>
        <Row className="g-4 justify-content-center">
          <Col lg={4} md={6} className="wow fadeInUp" data-wow-delay="0.1s">
            <div className="course-item bg-light">
              <div className="position-relative overflow-hidden">
                <img className="img-fluid" src={onlineclass} alt="" />
                <div className="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4">
                  <Button
                    href="#"
                    className="flex-shrink-0 btn btn-sm btn-primary px-3 border-end"
                    style={{ borderRadius: "30px 0 0 30px" }}
                  >
                    Lire plus
                  </Button>
                  <Button
                    href="#"
                    className="flex-shrink-0 btn btn-sm btn-primary px-3"
                    style={{ borderRadius: "0 30px 30px 0" }}
                  >
                    Inscrivez-vous
                  </Button>
                </div>
              </div>
              <div className="text-center p-4 pb-0">
                <h3 className="mb-0">$119.00</h3>
                <div className="mb-3">
                  <small className="fa fa-star text-primary"></small>
                  <small className="fa fa-star text-primary"></small>
                  <small className="fa fa-star text-primary"></small>
                  <small className="fa fa-star text-primary"></small>
                  {/* <small className="fa fa-star text-primary"></small> */}
                  <small>(123)</small>
                </div>
                <h5 className="mb-4">
                  Web Design & Development Cours Pour Débutants
                </h5>
              </div>
              <div className="d-flex border-top">
                <small className="flex-fill text-center border-end py-2">
                  <i className="fa fa-user-tie text-primary me-2"></i>John Doe
                </small>
                <small className="flex-fill text-center border-end py-2">
                  <i className="fa fa-clock text-primary me-2"></i>20 Hrs
                </small>
                <small className="flex-fill text-center py-2">
                  <i className="fa fa-user text-primary me-2"></i>210 Students
                </small>
              </div>
            </div>
          </Col>
          {/* ... Répétez le bloc Col pour chaque cours supplémentaire */}
          <Col lg={4} md={6} className="wow fadeInUp" data-wow-delay="0.1s">
            <div className="course-item bg-light">
              <div className="position-relative overflow-hidden">
                <img className="img-fluid" src={design} alt="" />
                <div className="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4">
                  <Button
                    href="#"
                    className="flex-shrink-0 btn btn-sm btn-primary px-3 border-end"
                    style={{ borderRadius: "30px 0 0 30px" }}
                  >
                    Lire plus
                  </Button>
                  <Button
                    href="#"
                    className="flex-shrink-0 btn btn-sm btn-primary px-3"
                    style={{ borderRadius: "0 30px 30px 0" }}
                  >
                    Inscrivez-vous
                  </Button>
                </div>
              </div>
              <div className="text-center p-4 pb-0">
                <h3 className="mb-0">$149.00</h3>
                <div className="mb-3">
                  <small className="fa fa-star text-primary"></small>
                  <small className="fa fa-star text-primary"></small>
                  <small className="fa fa-star text-primary"></small>
                  <small className="fa fa-star text-primary"></small>
                  <small className="fa fa-star text-primary"></small>
                  <small>(123)</small>
                </div>
                <h5 className="mb-4">marketing digital Cours</h5>
                <br />
              </div>
              <div className="d-flex border-top">
                <small className="flex-fill text-center border-end py-2">
                  <i className="fa fa-user-tie text-primary me-2"></i>John Doe
                </small>
                <small className="flex-fill text-center border-end py-2">
                  <i className="fa fa-clock text-primary me-2"></i>1.49 Hrs
                </small>
                <small className="flex-fill text-center py-2">
                  <i className="fa fa-user text-primary me-2"></i>67 Students
                </small>
              </div>
            </div>
          </Col>
          <Col lg={4} md={6} className="wow fadeInUp" data-wow-delay="0.1s">
            <div className="course-item bg-light">
              <div className="position-relative overflow-hidden">
                <img className="img-fluid" src={cours3} alt="" />
                <div className="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4">
                  <Button
                    href="#"
                    className="flex-shrink-0 btn btn-sm btn-primary px-3 border-end"
                    style={{ borderRadius: "30px 0 0 30px" }}
                  >
                    Lire plus
                  </Button>
                  <Button
                    href="#"
                    className="flex-shrink-0 btn btn-sm btn-primary px-3"
                    style={{ borderRadius: "0 30px 30px 0" }}
                  >
                    Inscrivez-vous
                  </Button>
                </div>
              </div>
              <div className="text-center p-4 pb-0">
                <h3 className="mb-0">$149.00</h3>
                <div className="mb-3">
                  <small className="fa fa-star text-primary"></small>
                  <small className="fa fa-star text-primary"></small>
                  <small className="fa fa-star text-primary"></small>
                  <small className="fa fa-star text-primary"></small>
                  <small className="fa fa-star text-primary"></small>
                  <small>(123)</small>
                </div>
                <h5 className="mb-4">Finance et comptabilité</h5>
                <br />
              </div>
              <div className="d-flex border-top">
                <small className="flex-fill text-center border-end py-2">
                  <i className="fa fa-user-tie text-primary me-2"></i>John Doe
                </small>
                <small className="flex-fill text-center border-end py-2">
                  <i className="fa fa-clock text-primary me-2"></i>1.49 Hrs
                </small>
                <small className="flex-fill text-center py-2">
                  <i className="fa fa-user text-primary me-2"></i>30 Students
                </small>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default PopularCourses;
