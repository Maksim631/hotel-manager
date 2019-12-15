import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './Hotel.css';


class Hotel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: props._id,
            img: props.img,
            name: props.name,
            cost: props.cost,
            description: props.description,
            onBook: props.onBook,
            isLogin: props.isLogin
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.isLogin !== prevProps.isLogin) {
            this.setState({
                isLogin: this.props.isLogin
            });
        }
    }

    render() {
        return (
            <Card className="Card">
                <Card.Img variant="top" className="Card-img" src={'data:image/png;base64,' + this.state.img} />
                <Card.Body>
                    <Card.Title>{this.state.name}</Card.Title>
                    <Card.Text>
                        {this.state.description}
                    </Card.Text>
                    <Card.Text>
                        Cost: {this.state.cost}
                    </Card.Text>
                </Card.Body>

                <Card.Body className="Card-button-container">
                    <Button
                        variant="primary"
                        onClick={() => {
                            console.log(this.state._id)
                            this.state.onBook(this.state._id)
                        }}
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