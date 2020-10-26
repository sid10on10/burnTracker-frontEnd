import React,{useState,useEffect} from "react";
import classnames from "classnames";
import { useParams,Link } from "react-router-dom";
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
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    UncontrolledAlert
  } from "reactstrap";

const Logs = (props)=>{

    const [ui,setUi] = useState({textTabs: 4})

    const { categoryid } = useParams();
    //console.log(exercisename)

    const [notification,setNotification] = useState()

    const [catexercise,setCatexercise] = useState([])

    const [exercises,setExercises] = useState([])
    const [exercise,setExercise] = useState("")


    const toggleTabs = (e, stateName, index) => {
        e.preventDefault();
        setUi({
          [stateName]: index
        });
    };

    useEffect(()=>{
        let token = localStorage.getItem("token")
        if(token){
            fetch(`https://burntracker.herokuapp.com/category/${categoryid}/exercises`,{
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
                "authorization": token,
            }
        })
        .then(async (res)=>{
            let data = await res.json()
            console.log(data)
            setCatexercise(data.exerciseData)
        })
        .catch((error)=>console.log(error))
        }else{
            // pass
        }
    },[categoryid])

    useEffect(()=>{
        let token = localStorage.getItem("token")
        if(token){
            fetch("https://burntracker.herokuapp.com/exercise",{
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
                "authorization": token,
            }
        })
        .then(async (res)=>{
            let data = await res.json()
            //console.log(data)
            setExercises(data.exerciseData)
        })
        .catch((error)=>console.log(error))
        }else{
            // pass
        }
    },[])

    let exerciseOptions = exercises.map((exercise,index)=>{
        return (
            <option key={index} value={exercise._id}>{exercise.name}</option>
        )
    })

    const addExercise = async (event)=>{
        event.preventDefault()
        let token = localStorage.getItem("token")
        if(token){
            let data = {exercise,categoryid}
            let res = await fetch("https://burntracker.herokuapp.com/category/exercise/add",{
                method:"POST",
                body:JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": token,
                }
            })
            //console.log(res)
            let resData = await res.json()
            setExercise("")
            setNotification(resData.message)
        }else{
            // pass
        }
    }

    return(     
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
                                    Add Exercises
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
                                    <h2>Exercises</h2>
                                    <Container>
                                        {catexercise ? 
                                        <ol>
                                        {catexercise.map((exercise,index)=>{
                                            return (
                                                <li key={index}>
                                                    <Link to={"/dashboard/exercise/" + exercise._id}>
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
                                    <Container>
                                        <Form onSubmit={addExercise} className="form">
                                            <h3>Add Exercise</h3>
                                            <FormGroup>
                                                <Label style={{fontSize:"20px"}} for="exampleSelect">Select Exercise</Label>
                                                <Input required value={exercise} onChange={(event)=>setExercise(event.target.value)} type="select" name="select" id="exampleSelect">
                                                <option>---</option>
                                                {exerciseOptions}
                                            </Input>
                                            </FormGroup>
                                            <Button className="btn-round" color="primary" type="submit">
                                                Add Exercise
                                            </Button>
                                        </Form>
                                    </Container>
                                </TabPane>
                                
                            </TabContent>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
    )
}

export default Logs;