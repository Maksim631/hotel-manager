import React from 'react';
import axios from 'axios';
import Hotel from '../Hotel/Hotel';

class HotelContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: props.isLogin,
            rooms: [],
            renderedRooms: ''
        }

        this.initHotelRooms = this.initHotelRooms.bind(this);

        
    }

    componentDidMount() {
        this.initHotelRooms();
    }

    initHotelRooms() {
        const rooms = [
            {
                name: "Hotel Name 1",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                cost: "100$",
                img: "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
            },
            {
                name: "Hotel Name 2",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                cost: "100$",
                img: "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
            },
            {
                name: "Hotel Name 3",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                cost: "100$",
                img: "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
            }

        ];
        const renderedRooms = rooms.map(room => 
            <Hotel
                key={room.name}
                isLogin={this.state.isLogin}
                name={room.name}
                cost={room.cost}
                onBook={this.onBook}
                description={room.description}
                img={room.img}
            ></Hotel>
        );
        this.setState({
            rooms: rooms,
            renderedRooms: renderedRooms
        });
    }

    onBook() {
        console.log('Boook');
    }


    render() {
        return (
            <div className="Container-grid">
                {this.state.renderedRooms}
            </div>
        );
    }
}

export default HotelContainer;