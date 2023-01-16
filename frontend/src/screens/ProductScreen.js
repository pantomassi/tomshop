import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, ListGroupItem } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productActions'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'


function ProductScreen() {

    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const params = useParams()

    useEffect(() => {
        dispatch(listProductDetails(params.id))
    }, [dispatch, params.id])

    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>
            {loading ?
                <Loader />
                : error ?
                    <Message variant='info'>{error}</Message>
                    :
                    <div>
                        <Row>
                            <Col md={6}>
                                <Image src={product.image} alt={product.name} fluid />
                            </Col>
                            <Col md={3}>
                                <ListGroup variant='flush'>
                                    <ListGroupItem>
                                        <h3>{product.name}</h3>
                                    </ListGroupItem>

                                    <ListGroupItem>
                                        <Rating value={product.rating} text={`${product.numReviews} reviews`} color='#f8e825' />
                                    </ListGroupItem>

                                    <ListGroupItem>
                                        Price: ${product.price}
                                    </ListGroupItem>

                                    <ListGroupItem>
                                        {product.description}
                                    </ListGroupItem>

                                </ListGroup>
                            </Col>
                            <Col md={3}>
                                <Card>
                                    <ListGroup variant='flush'>
                                        <ListGroupItem>
                                            <Row>
                                                <Col>Price: </Col>
                                                <Col>
                                                    <strong>${product.price}</strong>
                                                </Col>
                                            </Row>
                                        </ListGroupItem>

                                        <ListGroupItem>
                                            <Row>
                                                <Col>Status: </Col>
                                                <Col>
                                                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                                </Col>
                                            </Row>
                                        </ListGroupItem>

                                        <ListGroupItem>
                                            <Button className='btn-block w-100' disabled={product.countInStock === 0} type='button'>Add to cart</Button>
                                        </ListGroupItem>

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