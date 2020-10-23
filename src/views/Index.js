import React,{useEffect} from "react";

// core components
import PageHeader from "components/PageHeader/PageHeader.js";

import {
  Container,
  Row,
  Col
} from "reactstrap";


const Index = (props) =>{

  useEffect(()=>{
    document.body.classList.toggle("index-page")

    return ()=>{
      document.body.classList.toggle("index-page");
    }

  },[])

  

  return (
      <>
        <div className="wrapper">
          <PageHeader />
          <Container>
              <Row className="justify-content-center">
                <Col lg="12">
                  <h1 className="text-center">Features</h1>
                  <Row className="row-grid justify-content-center">
                    <Col lg="3">
                      <div className="info">
                        <div className="icon icon-primary">
                          <i className="tim-icons icon-money-coins" />
                        </div>
                        <h4 className="info-title">Exercises</h4>
                        <hr className="line-primary" />
                        <p>
                          You can add exercises and can view the history.
                        </p>
                      </div>
                    </Col>
                    <Col lg="3">
                      <div className="info">
                        <div className="icon icon-warning">
                          <i className="tim-icons icon-chart-pie-36" />
                        </div>
                        <h4 className="info-title">Routines</h4>
                        <hr className="line-warning" />
                        <p>
                          Add a routine and follow it with ease with the help of app.
                        </p>
                      </div>
                    </Col>
                    <Col lg="3">
                      <div className="info">
                        <div className="icon icon-success">
                          <i className="tim-icons icon-single-02" />
                        </div>
                        <h4 className="info-title">Profile</h4>
                        <hr className="line-success" />
                        <p>
                          User Profile can track their history and goals
                        </p>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
        </div>
      </>
  )
}

export default Index;
