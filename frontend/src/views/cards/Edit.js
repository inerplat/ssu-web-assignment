import React, {useEffect} from "react";
import {Badge, Button, Card, CloseButton, FloatingLabel, Form, Toast} from "react-bootstrap";
import axios from "axios";

function Edit(props) {
    const [imagesArray, setImagesArray] = React.useState([]);
    const [prevImageArray, setPrevImagesArray] = React.useState([""]);
    const [wantDeleteArray, setWantDeleteArray] = React.useState([]);
    useEffect(async () => {
        if (props.postId !== 0) {
            let result = await axios.get("/api/v1/content/specific/" + props.postId)
            let images = result.data.data.file.trim().split(" ")
            setPrevImagesArray(images)
            const textData = document.getElementById('newText').value = result.data.data.text
        }
        console.log(imagesArray)
    }, [])
    const onChange = (e) => {
        const files = e.target.files;
        const images = []
        for (let i = 0; i < imagesArray.length; i++) {
            images.push(imagesArray[i]);
        }
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (!file.type.startsWith('image/')) {
                continue;
            }
            images.push(file)
        }
        setImagesArray(images)
    }
    const onDelete = (idx, err) => {
        const images = []
        for (let i = 0; i < imagesArray.length; i++) {
            if (i !== idx) {
                images.push(imagesArray[i]);
            }
        }
        setImagesArray(images)
    }
    const onPrevDelete = (idx, err) => {
        const images = []
        for (let i = 0; i < prevImageArray.length; i++) {
            if (i !== idx) {
                images.push(prevImageArray[i]);
            } else {
                setWantDeleteArray(image => [...image, prevImageArray[i]])
            }
        }
        setPrevImagesArray(images)
    }
    const onUpload = (e) => {
        e.preventDefault()
        const textData = document.getElementById('newText').value;
        console.log(textData)
        const formData = new FormData()
        imagesArray.forEach(file => {
            formData.append('imagesArray', file)
        });
        formData.append('postid', props.postId)
        formData.append('text', textData)
        formData.append('prev', prevImageArray.toString())
        axios.post("/api/v1/content/modify", formData)
            .then(res => {
                window.location.href = "/home"
            })
            .catch(err => {
                alert("수정실패")
                window.location.href = "/home"
            })
    }
    return (
        <Card>
            <Card.Header>
                <Button onClick={() => {
                    axios.delete('/api/v1/content/specific/' + props.postId)
                        .then(res => {
                            window.location.href = "/home"
                        })
                        .catch(err => {
                            alert("삭제실패")
                            window.location.href = "/home"
                        })
                }} variant={"danger"}>
                    삭제
                </Button>
            </Card.Header>
            <Card.Body>
                <div className="m-3">
                    <div onSubmit={onUpload}>
                        <Form.Group controlId="newPost" className="mb-3">
                            <Form.Label><h4>게시물 편집</h4></Form.Label>
                            <FloatingLabel label="본문">
                                <Form.Control
                                    id="newText"
                                    as="textarea"
                                    placeholder="내용을 입력해 주세요"
                                    style={{height: '100px'}}
                                />
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group controlId="formFileMultiple" className="mb-3">
                            <Form.Label><h4>첨부파일</h4></Form.Label>
                            <Form.Control accept="image/*" type="file" multiple onChange={onChange}/>
                        </Form.Group>
                        <div id="test">
                            {prevImageArray.map((image, idx) => {
                                return (
                                    <Badge key={-idx} color="secondary" className="p-2 m-2" pill>{image}
                                        <CloseButton key={-idx} variant="white" onClick={e => onPrevDelete(idx)}/>
                                    </Badge>
                                )
                            })}
                            {imagesArray.map((image, idx) => {
                                return (
                                    <Badge key={idx} color="secondary" className="p-2 m-2" pill>{image.name}
                                        <CloseButton key={idx} variant="white" onClick={e => onDelete(idx)}/>
                                    </Badge>
                                )
                            })}
                        </div>
                        <Button className="w-100 mt-3" variant="primary" type="submit"
                                onClick={onUpload}>Submit</Button>
                    </div>
                </div>
            </Card.Body>

        </Card>
    );
}

export default Edit