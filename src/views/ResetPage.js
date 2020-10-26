import React,{useEffect,useState} from "react"
import { useParams } from "react-router-dom";
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

const ResetPage = (props) =>{

    const { userid,reset_token } = useParams();

    const [squares,setSquares ] = useState({squares1to6: "",squares7and8: ""})

    const [notification,setNotification] = useState(false)
    const [message,setMessage] = useState("")

    const [password,setPassword] = useState("");
    const [confirmpassword,setConfirmpassword] = useState("");
    const [email,setEmail] = useState("")
    const [isvalid,setIsvalid] = useState(false);

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

    useEffect(()=>{
        fetch(`https://burntracker.herokuapp.com/reset/${userid}/${reset_token}`)
        .then(async (res)=>{
            let data = await res.json()
            //console.log(data)
            if(data.message==="Valid RESET URL"){
                setEmail(data.email)
                setIsvalid(true)
            }else{
                alert(data.message)
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    },[reset_token,userid])

    const onSubmit = (event) => {
        event.preventDefault()
        setNotification(false)
        setMessage("")
        let data = {email,password}
        fetch('https://burntracker.herokuapp.com/reset', {
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
          setPassword("")
          setConfirmpassword("")
          props.history.push("/login")
          
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
                  {  isvalid ?
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
                          <CardTitle style={{marginLeft:"10px"}} tag="h6">Reset</CardTitle>
                        </CardHeader>
                        <CardBody>
                          <Form onSubmit={onSubmit} className="form">
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
                                placeholder="Enter Password"
                                type="password"
                                required
                                value={password}
                                onChange={event=>setPassword(event.target.value)}
                                onFocus={e => setSquares({ emailFocus: true })}
                                onBlur={e => setSquares({ emailFocus: false })}
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
                                placeholder="Confirm Password"
                                type="password"
                                required
                                value={confirmpassword}
                                onChange={event=>setConfirmpassword(event.target.value)}
                                onFocus={e => setSquares({ emailFocus: true })}
                                onBlur={e => setSquares({ emailFocus: false })}
                              />
                            </InputGroup>
                            <CardFooter>
                              <Button type="submit" className="btn-round" color="primary" size="lg">
                                Reset
                              </Button>
                           </CardFooter>
                            
                          </Form>
                        </CardBody>
                        
                      </Card>
                    </Col>
                  </Row>:<h2>Invalid URL</h2>
                  }
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

export default ResetPage;