import React, {useEffect} from 'react';
import {Button, ButtonGroup, Card, Carousel, Col, Form, Modal, Nav, Pagination, Row} from 'react-bootstrap';
import axios from "axios";
import Edit from "./Edit";

function Home(props) {
    const [contentArray, setContentArray] = React.useState([])
    const [modalShow, setModalShow] = React.useState(false)
    const [editModalShow, setEditModalShow] = React.useState(0)
    const [page, setPage] = React.useState(1)
    const [modalContent, setModalContent] = React.useState({
        files: [],
        file: "",
        id: "",
        upload_at: "",
        text: "",
        idx: 0
    })
    const searchContent = (api) => {
        axios.get(api)
            .then(res => {
                let newContent = []
                for (let i = 0; i < res.data.data.length; i++) {
                    newContent.push(res.data.data[i])
                    newContent[i].files = newContent[i].file.trim().split(' ')
                    if (newContent[i].files == '') {
                        newContent[i].files = []
                    }
                }
                let tempContent = newContent.map((data, idx) => {
                    return (
                        <Col key={idx}>
                            <Card key={data.seq}>
                                {data.files.length > 0 ?
                                    <Card.Img onClick={e => {
                                        setModalContent(data)
                                        setModalShow(true)
                                    }} variant="top" src={"/file/upload/" + data.files[0]}/>
                                    : ""
                                }
                                <Card.Body>
                                    <Card.Title>
                                        <a href={"/home/search/user/" + data.id}>{data.id}</a>{" / "}{data.upload_at.split(".")[0].replace("T", " ")}
                                    </Card.Title>
                                    <Card.Text>{
                                        data.text.match(/#\S+/g) ?
                                            data.text.match(/#\S+/g).map((tag, idx) => {
                                                return (
                                                    <Button key={idx} variant="outline-primary" size="sm"
                                                            className="mr-1" onClick={() => {
                                                        window.location.href = "/home/search/hashtag/" + tag.replace("#", "")
                                                    }
                                                    }>{tag}</Button>
                                                )
                                            })
                                            : ""
                                    }
                                    </Card.Text>
                                    <Card.Text onClick={e => {
                                        setModalContent(data)
                                        setModalShow(true)
                                    }}>
                                        {data.text.substring(0, 100)}{data.text > 100 ? "..." : ""}
                                    </Card.Text>
                                </Card.Body>{
                                props.userId === data.id ?
                                    <Card.Footer>
                                        <Button onClick={e => {
                                            setEditModalShow(data.seq)
                                        }}>
                                            Edit
                                        </Button>
                                    </Card.Footer> :
                                    <></>
                            }
                            </Card>
                        </Col>
                    )
                })
                let newContentArray = []
                for (let i = 0; i < tempContent.length; i++) {
                    if (i % 9 === 0) {
                        newContentArray.push([])
                    }
                    newContentArray[Math.floor(i / 9)].push(tempContent[i])
                }
                setContentArray(newContentArray)
            })
            .catch(err => {
                console.log(err)
            });
    }
    const getContent = (p) => {
        return contentArray[p]
    }
    useEffect(() => {
        console.log(window.location.pathname)
        let pathname = window.location.pathname.trim()
        if (pathname === "/home") {
            searchContent('/api/v1/content/page');

        } else {
            let pathList = pathname.split("/")
            console.log(pathList)
            if (pathList.length > 2 && pathList[2] === "search") {
                switch (pathList[3]) {
                    case "hashtag":
                        searchContent('/api/v1/content/search/hashtag/' + pathList[4])
                        break;
                    case "user":
                        searchContent('/api/v1/content/search/user/' + pathList[4])
                        break;
                    case "text":
                        searchContent('/api/v1/content/search/text/' + pathList[4])
                        break;
                    default:
                        searchContent('/api/v1/content/page')
                        break;
                }
            } else {
                searchContent('/api/v1/content/page')
            }
        }

    }, [])

    return (
        <>
            <Card>
                <Row xs={1} md={3} className="g-4 p-5">
                    {getContent(page - 1)}
                </Row>
                <Pagination className="m-auto">
                    {
                        contentArray.map((data, idx) => {
                            return (
                                <Pagination.Item key={idx} active={page === idx + 1} onClick={e => {
                                    setPage(idx + 1)
                                }}>{idx + 1}</Pagination.Item>
                            )
                        })
                    }
                </Pagination>
            </Card>
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered className="m-auto"
                show={modalShow}
                onHide={() => setModalShow(false)}>
                <Modal.Header closeButton>
                    {modalContent.id === props.userId ?
                        <Button onClick={() => {
                            setModalShow(false)
                            console.log(modalContent)
                            setEditModalShow(modalContent.seq)
                        }}>
                            Edit
                        </Button>
                        : <></>
                    }
                </Modal.Header>
                <Modal.Body>
                    <Card>
                        {modalContent.files.length > 0 ? <>
                                <Card.Img variant="top"
                                          className="mb-3"
                                          src={"/file/upload/" + modalContent.files[modalContent.idx ? modalContent.idx : 0]}/>
                                <Pagination className="m-auto">
                                    {modalContent.files.map((file, idx) => {
                                        return (
                                            <Pagination.Item key={idx} active={modalContent.idx === idx}
                                                             onClick={e => {
                                                                 setModalContent({...modalContent, idx: idx})
                                                             }}
                                            >
                                                {idx + 1}
                                            </Pagination.Item>
                                        )
                                    })}
                                </Pagination>
                            </>
                            : ""
                        }
                        {modalContent ?
                            <Card.Body>
                                <Card.Title><a
                                    href={"/home/search/user/" + modalContent.id}>{modalContent.id}</a>{" / "}{modalContent.upload_at.split(".")[0].replace("T", " ")}
                                </Card.Title>
                                <Card.Text>
                                    {modalContent.text.trim().replaceAll("\n", " ").split(" ").map((word, idx) => {
                                        if (word.match(/#\S+/g)) {
                                            return (
                                                <Button key={idx} variant="outline-primary" size="sm"
                                                        className="mr-1" onClick={() => {
                                                    window.location.href = "/home/search/hashtag/" + word.replace("#", "")
                                                }}>{word} </Button>
                                            )
                                        } else {
                                            return (
                                                <span key={idx}>{word} </span>
                                            )
                                        }
                                    })}
                                </Card.Text>
                            </Card.Body> : ""
                        }
                    </Card>
                </Modal.Body>
            </Modal>

            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered className="m-auto"
                show={editModalShow !== 0}
                onHide={() => setEditModalShow(0)}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <Edit postId={editModalShow}/>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Home;