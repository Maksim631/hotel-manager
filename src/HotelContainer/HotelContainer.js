import React from 'react';
import axios from 'axios';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import './HotelContainer.css';
import Hotel from '../Hotel/Hotel';
const { url } = require('../config.json');

class HotelContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: props.isLogin,
            rooms: [],
            renderedRooms: '',
            startDate: null,
            endDate: null,
            focusedInput: null
        }

        this.onBook = this.onBook.bind(this);
        this.renderRooms = this.renderRooms.bind(this);
        this.onDatesChange = this.onDatesChange.bind(this);
        this.initHotelRooms = this.initHotelRooms.bind(this);
    }

    componentDidMount() {
        this.initHotelRooms();
    }

    componentDidUpdate(prevProps) {
        if (this.props.isLogin !== prevProps.isLogin) {
            this.setState({
                isLogin: this.props.isLogin
            });
            this.initHotelRooms();
        }
    }

    async initHotelRooms() {
        const response = await axios.get(`${url}/hotels`);
        const rooms = response.data;
        this.renderRooms(rooms);
    }

    renderRooms(rooms) {
        const renderedRooms = rooms.map(room =>
            <Hotel
                _id={room._id}
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

    async onBook(hotelId) {
        if (!this.state.startDate && !this.state.endDate) {
            alert('Please select dates');
        } else {
            const data = {
                hotelId: hotelId,
                startDate: this.state.startDate,
                endDate: this.state.endDate
            };
            const response = await axios.post(`${url}/bookHotel`, data);
            this.setState({
                startDate: null,
                endDate: null
            });
        }
    }

    async onDatesChange(startDate, endDate) {
        this.setState({ startDate, endDate });
        if (startDate && endDate) {
            const response = await axios.get(`${url}/hotels/date?startDate=${startDate}&endDate=${endDate}`);
            this.renderRooms(response.data);
        }
    }

    render() {
        return (
            <div className="HotelContainer">
                <div className="Date-pickers">
                    <DateRangePicker
                        startDate={this.state.startDate}
                        startDateId="startDateId"
                        endDate={this.state.endDate}
                        endDateId="endDateId"
                        onDatesChange={({ startDate, endDate }) => this.onDatesChange(startDate, endDate)}
                        focusedInput={this.state.focusedInput}
                        onFocusChange={focusedInput => this.setState({ focusedInput })}
                    />
                </div>
                <div className="Container-grid">
                    {this.state.renderedRooms}
                </div>
            </div>
        );
    }
}

export default HotelContainer;