import React, {useEffect} from "react";
import {Badge, Button, Card, CloseButton, FloatingLabel, Form, Toast} from "react-bootstrap";
import axios from "axios";

function New() {
    const [imagesArray, setImagesArray] = React.useState([]);

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
        console.log(imagesArray)
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
    const onUpload = (e) => {
        e.preventDefault()
        const textData = document.getElementById('newText').value;
        console.log(textData)
        const formData = new FormData()
        imagesArray.forEach(file => {
            formData.append('imagesArray', file)
        });
        formData.append('text', textData)
        axios.post("/api/v1/content/upload", formData)
            .then(res => {
                window.location.href = "/home"
                console.log(res)
            })
            .catch(err => {
                alert("작성실패")
                console.log(err)
            })
    }
    return (
        <Card>
            <Card.Body>
                <div className="m-3">
                    <div onSubmit={onUpload}>
                        <Form.Group controlId="newPost" className="mb-3">
                            <Form.Label><h4>게시물 작성</h4></Form.Label>
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
                        <div id="test">{imagesArray.map((image, idx) => {
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

export default New;