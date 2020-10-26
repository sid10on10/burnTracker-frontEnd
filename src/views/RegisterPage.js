import React,{useEffect,useState} from "react";
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  UncontrolledAlert
} from "reactstrap";



// new functional component
const RegisterPage = (props) => {

  const [squares,setSquares ] = useState({squares1to6: "",squares7and8: ""})
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [notification,setNotification] = useState(false)
  const [message,setMessage] = useState("")

  const followCursor = event => {
    let posX = event.clientX - window.innerWidth / 2;
    let posY = event.clientY - window.innerWidth / 6;
    setSquares({
      squares1to6:
        "perspective(500px) rotateY(" +
        posX * 0.05 +
        "deg) rotateX(" +
        posY * -0.05 +
        "deg)",
      squares7and8:
        "perspective(500px) rotateY(" +
        posX * 0.02 +
        "deg) rotateX(" +
        posY * -0.02 +
        "deg)"
    });
  };

  useEffect(()=>{
    document.body.classList.toggle("register-page");
    document.documentElement.addEventListener("mousemove", followCursor);

    return () =>{
      document.body.classList.toggle("register-page");
      document.documentElement.removeEventListener(
      "mousemove",
      followCursor
    );
    }
  },[])

  const onSubmit = (event) => {
    event.preventDefault()
    setNotification(false)
    setMessage("")
    let data = {name,email,password}
    fetch('https://burntracker.herokuapp.com/signup', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(async (res)=>{
      // console.log(res)
      let data = await res.json()
      //alert(data.message)
      setNotification(true)
      setMessage(data.message)
      setName("")
      setEmail("")
      setPassword("")
    })
    .catch((error)=>{
      console.log(error)
    })
}

    return (
      <>
        <div className="wrapper">
          <div className="page-header">
            <div className="page-header-image" />
            <div className="content">
            {notification?
                <Container style={{width:"490px",marginRight:"820px"}}>
            
                  <UncontrolledAlert className="alert-with-icon" color="success">
                    <span data-notify="icon" className="tim-icons icon-bell-55" />
                    <span>
                      <b>{message}</b>
                    </span>
                  </UncontrolledAlert>
                  
                    </Container>:<div></div>}
              <Container>
                <Row>
                  <Col className="offset-lg-0 offset-md-3" lg="5" md="6">
                    <div
                      className="square square-7"
                      id="square7"
                      style={{ transform: squares.squares7and8 }}
                    />
                    <div
                      className="square square-8"
                      id="square8"
                      style={{ transform: squares.squares7and8 }}
                    />
                    <Card className="card-register">
                      <CardHeader>
                        <CardImg
                          alt="..."
                          src={require("assets/img/square-purple-1.png")}
                        />
                        <CardTitle style={{marginLeft:"15px"}} tag="h4">Register</CardTitle>
                      </CardHeader>
                      <CardBody>
                        <Form className="form" onSubmit={onSubmit}>
                          <InputGroup
                            className={classnames({
                              "input-group-focus": squares.fullNameFocus
                            })}
                          >
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-single-02" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Full Name"
                              required
                              type="text"
                              value={name}
                              onChange={(event)=>setName(event.target.value)}
                              onFocus={e =>
                                setSquares({ fullNameFocus: true })
                              }
                              onBlur={e =>
                                setSquares({ fullNameFocus: false })
                              }
                            />
                          </InputGroup>
                          <InputGroup
                            className={classnames({
                              "input-group-focus": squares.emailFocus
                            })}
                          >
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-email-85" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Email"
                              required
                              value={email}
                              onChange={(event)=>setEmail(event.target.value)}
                              type="email"
                              onFocus={e => setSquares({ emailFocus: true })}
                              onBlur={e => setSquares({ emailFocus: false })}
                            />
                          </InputGroup>
                          <InputGroup
                            className={classnames({
                              "input-group-focus": squares.passwordFocus
                            })}
                          >
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-lock-circle" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Password"
                              type="password"
                              required
                              value={password}
                              onChange={(event)=>setPassword(event.target.value)}
                              onFocus={e =>
                                setSquares({ passwordFocus: true })
                              }
                              onBlur={e =>
                                setSquares({ passwordFocus: false })
                              }
                            />
                          </InputGroup>
                          <CardFooter>
                            <Button type="submit" className="btn-round" color="primary" size="lg">
                                Register
                            </Button>
                          </CardFooter>
                        </Form>
                      </CardBody>
                      
                    </Card>
                  </Col>
                </Row>
                <div className="register-bg" />
                <div
                  className="square square-1"
                  id="square1"
                  style={{ transform: squares.squares1to6 }}
                />
                <div
                  className="square square-2"
                  id="square2"
                  style={{ transform: squares.squares1to6 }}
                />
                <div
                  className="square square-3"
                  id="square3"
                  style={{ transform: squares.squares1to6 }}
                />
                <div
                  className="square square-4"
                  id="square4"
                  style={{ transform: squares.squares1to6 }}
                />
                <div
                  className="square square-5"
                  id="square5"
                  style={{ transform: squares.squares1to6 }}
                />
                <div
                  className="square square-6"
                  id="square6"
                  style={{ transform: squares.squares1to6 }}
                />
              </Container>
            </div>
          </div>
        </div>
      </>
    )
}

export default RegisterPage;
