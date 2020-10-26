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
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    UncontrolledAlert
  } from "reactstrap";

const Category = (props)=>{

    const [ui,setUi] = useState({textTabs: 4})

    const [name,setName] = useState("")

    const [notification,setNotification] = useState()

    const [categories,setCategories] = useState()

    const { url } = useRouteMatch();

    const toggleTabs = (e, stateName, index) => {
        e.preventDefault();
        setUi({
          [stateName]: index
        });
    };

    useEffect(()=>{
        let token = localStorage.getItem("token")
        if(token){
            fetch('https://burntracker.herokuapp.com/category',{
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
                "authorization": token,
            }
        })
        .then(async (res)=>{
            let data = await res.json()
            console.log(data)
            setCategories(data.categoryData)
            
        })
        .catch((error)=>console.log(error))
        }else{
            // pass
        }
    },[])

    const addCategory = async (event)=>{
        event.preventDefault()
        let token = localStorage.getItem("token")
        if(token){
            let data = {name}
            let res = await fetch("https://burntracker.herokuapp.com/category/add",{
                method:"POST",
                body:JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": token,
                }
            })
            //console.log(res)
            setName("")
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
                                    Categories
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
                                    Add Category
                                </NavLink>
                                </NavItem>
                                <NavItem>
                                <NavLink
                                    className={classnames({
                                    active: ui.textTabs === 6
                                    })}
                                    onClick={e => toggleTabs(e, "textTabs", 6)}
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
                                    <Container>
                                            {categories ? 
                                            <ol>
                                            {categories.map((category,index)=>{
                                                return (
                                                    <li key={index}>
                                                        <Link to={url + "/" + category._id}>
                                                            <h2>{category.name}</h2>
                                                        </Link>
                                                    </li>
                                                );
                                            })}
                                            </ol>
                                            :<div></div> }
                                    </Container>
                                </TabPane>
                                <TabPane tabId="link5">
                                    <Form onSubmit={addCategory} className="form">
                                        <FormGroup>
                                            <Label style={{fontSize:"20px"}} for="name">Category Name</Label>
                                            <Input required value={name} onChange={(event)=>setName(event.target.value)} placeholder="Enter Category Name" type="text" id="name"/>
                                        </FormGroup>
                                        
                                        <Button className="btn-round" color="primary" type="submit">
                                            Add
                                        </Button>
                                    </Form>
                                </TabPane>
                                <TabPane tabId="link6">
                                <p>
                                But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?

                                </p>
                                </TabPane>
                            </TabContent>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
    )
}

export default Category;