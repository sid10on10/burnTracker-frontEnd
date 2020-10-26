import React,{useState,useEffect} from "react";
import classnames from "classnames";
import { useParams } from "react-router-dom";
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

    const { exerciseid } = useParams();
    //console.log(exercisename)

    const [notification,setNotification] = useState()

    const [logs,setLogs] = useState([])

    const [reps,setReps] = useState()
    const [weight,setWeight] = useState()
    const [notes,setNotes] = useState()

    const toggleTabs = (e, stateName, index) => {
        e.preventDefault();
        setUi({
          [stateName]: index
        });
    };

    useEffect(()=>{
        let token = localStorage.getItem("token")
        if(token){
            fetch(`http://localhost:5000/exercise/${exerciseid}/logs`,{
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
                "authorization": token,
            }
        })
        .then(async (res)=>{
            let data = await res.json()
            console.log(data)
            setLogs(data.logs)
        })
        .catch((error)=>console.log(error))
        }else{
            // pass
        }
    },[exerciseid])

    const addLogs = async (event)=>{
        event.preventDefault()
        let token = localStorage.getItem("token")
        if(token){
            let today = new Date()
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            var datetime = time+" "+date
            let data = {reps,weight,notes,datetime,exerciseid}
            let res = await fetch("http://localhost:5000/exercise/logs/add",{
                method:"POST",
                body:JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": token,
                }
            })
            //console.log(res)
            setReps("")
            setWeight("")
            setNotes("")
            let resData = await res.json()
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
                                    Create
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
                                    History
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
                                    <Form onSubmit={addLogs} className="form">
                                            <FormGroup>
                                                
                                            </FormGroup>
                                            <FormGroup>
                                                <h3>Set</h3>
                                                <Row>
                                                    <Col md="6">
                                                        <Label style={{fontSize:"20px"}} for="exampleSelect">Reps</Label>
                                                        <Input  value={reps} onChange={(event)=>setReps(event.target.value)} required type="number" name="select" id="exampleSelect" />
                                                    </Col>
                                                    <Col md="6">
                                                        <Label style={{fontSize:"20px"}} for="exampleSelect">Weight</Label>
                                                        <Input  value={weight} onChange={(event)=>setWeight(event.target.value)} required type="number" name="select" id="exampleSelect" />
                                                    </Col>
                                                </Row>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label style={{fontSize:"20px"}} for="name"> Notes</Label>
                                                <Input value={notes} onChange={(event)=>setNotes(event.target.value)} placeholder="Enter Notes" type="text" id="name"/>
                                            </FormGroup>
                                            <Button className="btn-round" color="primary" type="submit">
                                                Finish Set
                                            </Button>
                                        </Form>
                                </TabPane>
                                <TabPane tabId="link5">
                                    <Container>
                                        {logs ? 
                                        <ol>
                                        {logs.map((log,index)=>{
                                            return (
                                                <li key={index}>
                                                    <p style={{fontSize:"20px"}}>Date Time : {log.datetime}</p>
                                                    <p style={{fontSize:"20px"}}>Reps : {log.reps}</p>
                                                    <p style={{fontSize:"20px"}}>Weight : {log.weight}</p>
                                                    <p style={{fontSize:"20px"}}>Notes : {log.notes}</p>
                                                </li>
                                            );
                                        })}
                                        </ol>
                                        :<div></div> }
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