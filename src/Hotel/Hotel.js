import React from 'react';
import {Card, Button} from 'react-bootstrap';
import './Hotel.css';


class Hotel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            img: props.img,
            name: props.name,
            cost: props.cost,
            description: props.description,
            onBook: props.onBook,
            isLogin: props.isLogin
        }
    }

    render() {
        return (
            <Card className="Card" style={{ width: '18rem' }}>
                <Card.Img variant="top" src="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUA
    AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO
        9TXL0Y4OHwAAAABJRU5ErkJggg==" />
                <Card.Body>
                    <Card.Title>{this.state.name}</Card.Title>
                    <Card.Text>
                        {this.state.description}
                    </Card.Text>
                    
                </Card.Body>
                <Card.Body className="Card-row">
                    <Card.Text>
                        Cost: {this.state.cost}
                    </Card.Text>
                    <Button 
                        variant="primary"
                        onClick={this.state.onBook}
                        disabled={!this.state.isLogin}
                        >
                            <span className="Card-book-button">Book</span>
                    </Button>
                </Card.Body>
            </Card>
        );
    }

}

export default Hotel;