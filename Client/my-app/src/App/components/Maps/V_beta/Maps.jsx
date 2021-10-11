import React, { Component } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const loader = new Loader({
    apiKey: "AIzaSyC9FtL0Nsz0ROcYVY7hOkp9JL2tU4ECjqY",
    version: "weekly",
    libraries: ["places"]
});

export default class DemoComponent extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {};
    }

    componentDidMount() {
        let self = this;
        console.log(self)
        
        loader.load().then((google) => {
            const map = new google.maps.Map(
                self.googleMapDiv,
                {
                    center: {
                        lat: 40.762312,
                        lng: -73.979345
                    },
                    fullscreenControl: true,
                    zoom: 11,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    mapTypeControl: false,
                    panControl: true,
                    zoomControl: true,
                    scaleControl: false,
                    streetViewControl: false,
                });
            /*
                store them in the state so you can use it later
                E.g. call a function on the map object:
                    this.state.map.panTo(...)
                E.g. create a new marker:
                    new this.state.google.maps.Marker(...)
            */
           
           console.log(google)
            this.setState({
                google: google,
                map: map
            });

            
            const componentForm = [
                'location',
                'locality',
                'administrative_area_level_1',
                'country',
                'postal_code',
              ];
            
            const marker = new this.state.google.maps.Marker({map: map, draggable: true, animation:this.state.google.maps.Animation.DROP});
            const autocompleteInput = document.getElementById('location');
            const autocomplete = new this.state.google.maps.places.Autocomplete(autocompleteInput, {
            fields: ["address_components", "geometry", "name"],
            types: ["address"],
            });
            autocomplete.addListener('place_changed', function () {
            const place = autocomplete.getPlace();
            if (!place.geometry) {
                // User entered the name of a Place that was not suggested and
                // pressed the Enter key, or the Place Details request failed.
                window.alert('No details available for input: \'' + place.name + '\'');
                return;
            }
            renderAddress(place);
            fillInAddress(place);
            });

            function fillInAddress(place) {  // optional parameter
            const addressNameFormat = {
                'street_number': 'short_name',
                'route': 'long_name',
                'locality': 'long_name',
                'administrative_area_level_1': 'short_name',
                'country': 'long_name',
                'postal_code': 'short_name',
            };
            const getAddressComp = function (type) {
                for (const component of place.address_components) {
                if (component.types[0] === type) {
                    return component[addressNameFormat[type]];
                }
                }
                return '';
            };
            document.getElementById('location').value = getAddressComp('route') + ' ' + getAddressComp('street_number');
/*             for (const component of componentForm) {
                // Location field is handled separately above as it has different logic.
                if (component !== 'location') {
                document.getElementById(component).value = getAddressComp(component);
                }
            } */
            }

            function renderAddress(place) {
            map.setCenter(place.geometry.location);
            marker.setPosition(place.geometry.location);
            console.log(marker)
            console.log(place.geometry.location)
            marker.setVisible(true);
            }
        });
    }

    render() {
        return (
            <div>
                <input type="text" placeholder="Address" id="location" style={{width:"30%"}}/>
                <div
                    ref={(ref) => { this.googleMapDiv = ref }}
                    style={{ height: '88.5vh', width: '100%' }}>
                </div>
                <button></button>
            </div>
        )
    }
}