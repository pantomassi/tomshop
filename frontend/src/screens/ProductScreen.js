import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productActions'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'


function ProductScreen() {
    const [qty, setQty] = useState(1)

    const params = useParams()
    const productId = params.id
    let navigate = useNavigate()

    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    useEffect(() => {
        dispatch(listProductDetails(productId))
    }, [dispatch, productId])

    const addToCartHandler = () => {
        navigate(`/cart/${productId}?qty=${qty}`)
    }

    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>
            {loading ?
                <Loader />
                : error ?
                    <Message variant='danger'>{error}</Message>
                    :
                    <div>
                        <Row>
                            <Col md={6}>
                                <Image src={product.image} alt={product.name} fluid />
                            </Col>
                            <Col md={3}>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h3>{product.name}</h3>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Rating value={product.rating} text={`${product.numReviews} reviews`} color='#f8e825' />
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        Price: ${product.price}
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        {product.description}
                                    </ListGroup.Item>

                                </ListGroup>
                            </Col>
                            <Col md={3}>
                                <Card>
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Price: </Col>
                                                <Col>
                                                    <strong>${product.price}</strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Status: </Col>
                                                <Col>
                                                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        {product.countInStock > 0 && (
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Qty: </Col>
                                                    <Col className="my-1">
                                                        <Form.Control
                                                            aria-label="Default select example"
                                                            as="select"
                                                            className="form-select"
                                                            value={qty}
                                                            onChange={(e) => setQty(e.target.value)}
                                                        >
                                                            {
                                                                [...Array(product.countInStock).keys()].map((x) => (
                                                                    <option key={x + 1}>
                                                                        {x + 1}
                                                                    </option>
                                                                ))
                                                            }
                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )}


                                        <ListGroup.Item>
                                            <Button
                                                onClick={addToCartHandler}
                                                className='btn-block w-100'
                                                disabled={product.countInStock === 0}
                                                type='button'>
                                                Add to cart
                                            </Button>
                                        </ListGroup.Item>

                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>
                    </div>
            }
        </div>
    )
}

export default ProductScreen