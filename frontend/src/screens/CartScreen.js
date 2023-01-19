import React, { useEffect } from 'react'
import { Link, useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form, ListGroupItem } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../actions/cartActions'
import Message from '../components/Message'


function CartScreen() {

    const [searchParams, setSearchParams] = useSearchParams();
    const params = useParams()
    const productId = params.id
    const qty = Number(searchParams.get('qty'))

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        console.log('Proceeding to checkout')
        navigate('/login?redirect=shipping')
    }

    return (
        <Row>
            <h1>Shopping Cart</h1>
            <Col md={8}>
                {cartItems.length === 0 ? (
                    <Message variant="dark">
                        Your cart is empty.
                        <Link to='/'> Back To Store</Link>
                    </Message>
                ) : (
                    <ListGroup variant="flush">
                        {cartItems.map(item => (
                            <ListGroup.Item key={item._id}>
                                <Row className="align-items-center">
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item._id}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        ${item.price}
                                    </Col>
                                    <Col md={2}>
                                        <Form.Control
                                            aria-label="Default select example"
                                            as="select"
                                            className="form-select"
                                            value={item.qty}
                                            onChange={(e) => dispatch(addToCart(item._id, Number(e.target.value)))}
                                        >
                                            {
                                                [...Array(item.countInStock).keys()].map((x) => (
                                                    <option key={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))
                                            }
                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>Subtotal: ${Number(item.qty * item.price).toFixed(2)}
                                    </Col>
                                    <Col md={1}>
                                        <Button
                                            type="button"
                                            variant="light"
                                            onClick={() => removeFromCartHandler(item._id)}
                                        >
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )
                }
            </Col>



            <Col md={4}>
                <ListGroup className="border border-2 border-secondary">
                    <ListGroup.Item>
                        <Row className="align-items-center">
                            <Col xs={8} className="d-flex justify-content-start">
                                Order total:
                            </Col>

                            <Col xs={4} className="d-flex justify-content-end">
                                <strong>${Number(cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)).toFixed(2)}</strong>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                </ListGroup>

                <Button
                    variant="success"
                    type="button"
                    className="btn-block w-100 mt-1 border border-2 border-dark"
                    disabled={cartItems.length === 0}
                    onClick={() => checkoutHandler()}
                >
                    Checkout
                </Button>
            </Col>


        </Row >
    )
}

export default CartScreen