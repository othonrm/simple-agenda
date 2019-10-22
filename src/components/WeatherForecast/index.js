import React, { Component } from 'react';

import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBIcon
} from 'mdbreact';

import axios from 'axios';

import { proxyUrl } from './../../services/api';

export default class WeatherForecast extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            forecast: null,
            forecastData: null,
            coords: {
                lat: null,
                lng: null
            },
            address: null
        };
    }

    componentDidMount() {

        if ("geolocation" in navigator) {
            
            navigator.geolocation.getCurrentPosition((position) => {
                    this.setState({
                        coords: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    }, () => { this.carregarInfos() });
                },
                (error) => {
                    console.log(error); // "User denied Geolocation"
                    
                    this.setState({
                        coords: {
                            lat: -23.5503898,
                            lng: -46.6330809563329
                        }
                    }, () => { this.carregarInfos() });
            });
            
        }       
    }

    carregarInfos = () => {
        this.getCurrentLocationGeolocation();

        setTimeout(() => {
            this.getCurrentWeatherForrecast();
        }, 500); 
    }

    getCurrentLocationGeolocation = async () => {
        let geolocationApiUrl = `https://us1.locationiq.com/v1/reverse.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&lat=${this.state.coords.lat}&lon=${this.state.coords.lng}&format=json`;

        const response = await axios.get(geolocationApiUrl);

        if(response.data !== null)
        {
            console.log(response.data.address);

            this.setState({ address: response.data.address });
        }
    }

    getCurrentWeatherForrecast = async () => {

        let forecastApiUrl = `https://api.darksky.net/forecast/${process.env.REACT_APP_DARKSKY_API_KEY}/${this.state.coords.lat},${this.state.coords.lng},2019-10-22T13:00:00?lang=pt&exclude=currently,minutely,hourly,alerts,flags&units=si`;

        const response = await axios.get(proxyUrl + forecastApiUrl);

        if(response.data !== null)
        {
            // console.log(response.data);

            this.setState({
                forecast: response.data,
                forecastData: response.data.daily.data[0]
            });
        }

        console.log(response.data.daily.data[0])

    }

    render() {

        return (
            <MDBContainer>
                {
                    this.state.forecast == null ?
                    <MDBRow>
                        <div className="mx-auto spinner-border text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </MDBRow>
                    :
                    <React.Fragment>
                        
                            <MDBRow className="mb-1">
                                <MDBCol xs="3" className="text-center my-auto mr-2">
                                    <MDBIcon icon="sun" size="2x" fixed />
                                </MDBCol>
                                <MDBCol className="h4 my-auto" xs="9">
                                    {this.state.forecastData.summary}
                                </MDBCol>                                
                            </MDBRow>
                            <MDBRow className="mb-3">
                                <MDBCol xs="3" className="text-center my-auto mr-2">
                                    <MDBIcon icon="map-marker-alt" size="1x" fixed />
                                </MDBCol>
                                <MDBCol className="h5 my-auto" xs="9">
                                    Em {this.state.address.city_district}, {this.state.address.city}-{this.state.address.state.split(" ")[0][0] + this.state.address.state.split(" ")[1][0] }
                                </MDBCol>                                
                            </MDBRow>
                            <MDBRow>
                                <MDBCol xs="3" className="text-center my-auto">
                                    <MDBIcon icon="thermometer-three-quarters" size="2x" fixed />
                                </MDBCol>
                                <MDBCol className="my-auto" xs="9">
                                    <h4>{this.state.forecastData.temperatureMax}°C</h4>
                                    <h6>{this.state.forecastData.temperatureMin}°C</h6>
                                </MDBCol>
                            </MDBRow>
                        
                        {/* <p>
                            Today will dry and sunny, becoming
                            warm in the afternoon with temperatures of between 20 and 25
                            degrees.
                        </p> */}
                    </React.Fragment>
                }
                
            </MDBContainer>
        );
    }
}
