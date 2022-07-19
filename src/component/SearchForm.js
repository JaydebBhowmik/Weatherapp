
import axios from 'axios';
import { useEffect, useState } from 'react';
import {KEY} from '../env'

import './SearchForm.css';
import Moment from 'moment';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function SearchForm() {
    const [data, setData] = useState("");
    const [inputCity, setInputCity] = useState("");

    const getWeatherDetails = (cityName) => {
        if(!cityName) return
        const apiUrl = "http://api.weatherapi.com/v1/forecast.json?key="+ KEY +"&q=" + cityName +"&days=10&aqi=yes&alerts=yes"
        axios.get(apiUrl).then((res) => {
            console.log("response", res.data)
            setData(res.data)
        }).catch((err) => {
            console.log("Error", err)
        })
    }
    
    const handleChangeInput = (e) => {
        setInputCity(e.target.value)
        // console.log("value", e.target.value) 
    }
    const handleSearch = () => {
        getWeatherDetails(inputCity)
    }

    useEffect(()=> {
        getWeatherDetails("Kolkata")
    },[])
    
    // const forecast = data.forecast;
    // console.log(forecast.forecastday);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentdate = data.current.last_updated
    const formatDate = Moment(currentdate).format("MMM Do");

    return (
        <> 
            <Container>
                <Row>
                    <Col>
                        <Form className='searchCity'>
                            <Form.Control 
                            className='searchField' 
                            size="lg" type="text" 
                            value={inputCity}
                            placeholder="Enter city name"
                            onChange={handleChangeInput} />

                            <Button 
                            className='primary' 
                            variant="primary"
                            onClick={handleSearch}> Button as link </Button>
                        </Form>
                    </Col>
                </Row>
                
                <Row className='mb-5'>
                    <Col className='mt-5'>
                        <h2 className='current-city'>{data.location.name}</h2>
                        <h4 className='current-date'>{days[new Date(currentdate).getDay()]}, {formatDate}</h4>

                        <h4>overcast</h4>
                        <h4 className='ctemp'>
                            <span className='ctemp-icon'><img alt='icon' src={data.current.condition.icon}/> </span>
                            <strong className='ctemp-unit'>{data.current.temp_c} °C</strong>
                        </h4>
                    </Col>

                    <Col className='mt-5 col-3 left-box'>
                        <h4>Precipitation : {data.current.precip_in} %</h4>
                        <h4>Humidity : {data.current.humidity} %</h4>
                        <h4>Wind : {data.current.wind_kph} khp {data.current.wind_dir}</h4>
                    </Col>

                </Row>
    
                <hr />
                <Row>
                    {
                        data.forecast.forecastday.map((items, index) =>
                        <Col className='mt-5'>
                            <div key={index}>
                                <h5> <strong>{days[new Date(items.date).getDay()]}</strong> </h5>
                                <img alt='icon' src={items.day.condition.icon}/>
                                <h4> {parseInt(items.day.maxtemp_c)}°C {parseInt(items.day.mintemp_c)}°C  </h4>
                                <p className='mb-0'> Humidity {items.day.avghumidity}</p>
                                <p className='mb-0'>{items.day.condition.text}</p>
                            </div>
                    
                        </Col>
                        )
                    }
                </Row>
            </Container>
            
        </>
    )
}

export default SearchForm