import React,{useState,useEffect} from "react";
import classnames from "classnames";
import { Link,useRouteMatch } from "react-router-dom";

import {
    TabContent,
    TabPane,
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Nav,
    NavItem,
    NavLink,
    FormGroup,
    Input,
    Form,
    Label,
    Button,
    UncontrolledAlert
  } from "reactstrap";

const Exercise = (props)=>{

    const [exercises,setExercises] = useState([])
    const [notification,setNotification] = useState()

    const [ui,setUi] = useState({textTabs: 4})

    const [name,setName] = useState("")
    const [type,setType] = useState("")

    const { url } = useRouteMatch();

    useEffect(()=>{
        let token = localStorage.getItem("token")
        if(token){
            fetch('http://localhost:5000/exercise',{
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
                "authorization": token,
            }
        })
        .then(async (res)=>{
            let data = await res.json()
            console.log(data)
            setExercises(data.exerciseData)
            
        })
        .catch((error)=>console.log(error))
        }else{
            // pass
        }
    },[])

    const toggleTabs = (e, stateName, index) => {
        e.preventDefault();
        setUi({
          [stateName]: index
        });
    };

    const addExercise = async (event)=>{
        event.preventDefault()
        let token = localStorage.getItem("token")
        if(token){
            let data = {name,type}
            let res = await fetch("http://localhost:5000/exercise/add",{
                method:"POST",
                body:JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": token,
                }
            })
            //console.log(res)
            setName("")
            setType("")
            let resData = await res.json()
            setNotification(resData.message)
        }else{
            // pass
        }
    }

    return (     
            <Container>
                {notification ? <Container style={{width:"490px",marginRight:"820px"}}>
            
                                    <UncontrolledAlert className="alert-with-icon" color="success">
                                    <span data-notify="icon" className="tim-icons icon-bell-55" />
                                    <span>
                                        <b>{notification}</b>
                                    </span>
                                    </UncontrolledAlert>
                            </Container>
              : 
              <div></div>}
                <Row>
                    <Col className="container-fluid" md="12" xl="12">
                        <Card>
                            <CardHeader>
                            <Nav className="nav-tabs-info" role="tablist" tabs>
                                <NavItem>
                                <NavLink
                                    className={classnames({
                                    active: ui.textTabs === 4
                                    })}
                                    onClick={e => toggleTabs(e, "textTabs", 4)}
                                    href="#pablo"
                                >
                                    Exercises
                                </NavLink>
                                </NavItem>
                                <NavItem>
                                <NavLink
                                    className={classnames({
                                    active: ui.textTabs === 5
                                    })}
                                    onClick={e => toggleTabs(e, "textTabs", 5)}
                                    href="#pablo"
                                >
                                    Add Exercise
                                </NavLink>
                                </NavItem>
                            </Nav>
                            </CardHeader>
                            <CardBody>
                            <TabContent
                                className="tab-space"
                                activeTab={"link" + ui.textTabs}
                            >
                                <TabPane tabId="link4">
                                    <Container>
                                        {exercises ? 
                                        <ol>
                                        {exercises.map((exercise,index)=>{
                                            return (
                                                <li key={index}>
                                                    <Link to={url + "/" + exercise._id}>
                                                        <h2>{exercise.name}</h2>
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                        </ol>
                                        :<div></div> }
                                    </Container>
                                </TabPane>
                                <TabPane tabId="link5">
                                    <Form onSubmit={addExercise} className="form">
                                        <FormGroup>
                                            <Label style={{fontSize:"20px"}} for="name">Exercise Name</Label>
                                            <Input required value={name} onChange={(event)=>setName(event.target.value)} placeholder="Enter Exercise Name" type="text" id="name"/>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label style={{fontSize:"20px"}} for="exampleSelect">Type</Label>
                                            <Input required value={type} onChange={(event)=>setType(event.target.value)} type="select" name="select" id="exampleSelect">
                                            <option>---</option>
                                            <option value="Cardio">Cardio</option>
                                            <option value="Strength">Strength</option>
                                            </Input>
                                        </FormGroup>
                                        <Button className="btn-round" color="primary" type="submit">
                                            Add
                                        </Button>
                                    </Form>
                                </TabPane>
                            </TabContent>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
    )
}

export default Exercise;