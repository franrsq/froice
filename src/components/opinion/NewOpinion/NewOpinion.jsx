import React, { useState, useRef } from "react";
import { Button, Card, Form, Image } from "react-bootstrap";
import classes from "./NewOpinion.module.css";
import defUserImg from "../../../assets/icons/user.png";
import ImageInput from "../../../ui/ImageInput";
import { MdSend } from "react-icons/md";
import AutocompleteInput from "../../../components/autocompleteInput/AutocompleteInput";
import CustomModal from "../../modals/CustomModal/CustomModal";
import { AiOutlineUser, AiOutlineLink } from "react-icons/ai";
import { useSelector } from "react-redux";
import Tags from "../../Tags/Tags";
import { tags } from "../../../utils/tags";

const NewOpinion = (props) => {
  const ref = useRef();
  const [value, setValue] = useState({ formatted_address: "" });
  const [message, setMessage] = useState(props.message ? props.message : "");
  const [imagePreview] = useState(props.imagePreview);
  const [imageFile, setImageFile] = useState(props.image); //useState(isModify ? product.image : "");
  const [urlPeopeModalShow, setUrlPeopeModalShow] = useState(false);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [urls, setUrls] = useState([]);
  const [showtags, setShowTags] = useState(false);
  const [taglist, setTagList] = useState(tags);
  const [lista, setLista] = useState([]);

  const userData = useSelector((state) => state.user.userData);
  const notInModal = props.message === undefined;
  const hint = notInModal ? "Realizar nueva queja" : "Realizar comentario";

  const addTag = (name) => {
    setLista((lista) => (lista.includes(name) ? lista : lista.concat(name)));
  };

  const send = (message) => {
    setShowTags(false);
    setLista([]);
    const descriptionChanged = message !== "" && message !== props.message;
    const imageChanged = imageFile !== props.image;
<<<<<<< HEAD
    setValue({ formatted_address: "" });
    console.log(ref.current.value);
    ref.current.value = "";
    console.log(ref.current.value);
    props.onSend(message, imageFile, descriptionChanged || imageChanged,value.formatted_address ?? "", urls);
=======
    props.onSend(
      message,
      imageFile,
      descriptionChanged || imageChanged,
      urls,
      lista
    );
>>>>>>> 4422847b00ef2da0a3dc00b1a9345a43b71ba4cc
    setUrls([]);
    setMessage("");
  };

  const changeModal = (setModal) => {
    setModal((prevModalShow) => !prevModalShow);
  };

  const addUrl = () => {
    setMessage((prev) => `${prev}@${name}`);
    setUrls((prev) => [...prev, url]);
    setName("");
    setUrl("");
    changeModal(setUrlPeopeModalShow);
  };

  return (
    <Card className={notInModal && classes.myrow}>
      <Card.Body>
        <div className={classes.container}>
          <Image
            src={userData?.photoURL ? userData.photoURL : defUserImg}
            roundedCircle
            width="76"
            height="76"
          />
          <textarea
            placeholder={hint}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={classes.ta}
          />
        </div>
        <div>
          <div className={`${classes.image} my-2`}>
            <ImageInput url={imagePreview} onFileChange={setImageFile} />
          </div>
<<<<<<< HEAD
          
          <div className={classes.buttonsContainer}>
            <AutocompleteInput ref={ref} value={value} setValue={setValue} />
            <Button className={classes.tagButton} onClick={changeModal.bind(null, setUrlPeopeModalShow)}>
=======

          <div className={`${classes.buttonsContainer} mt-4`}>
            <AutocompleteInput />
            <Button onClick={changeModal.bind(null, setUrlPeopeModalShow)}>
>>>>>>> 4422847b00ef2da0a3dc00b1a9345a43b71ba4cc
              @
            </Button>
          </div>

          {showtags && (
            <div className="my-3">
              {taglist.map((tag) => (
                <Tags
                  key={tag}
                  name={tag}
                  onChange={(checked) => {
                    if (checked) {
                      addTag(tag);
                    } else {
                      setLista((list) => list.filter((el) => el !== tag));
                    }
                  }}
                />
              ))}
            </div>
          )}

          <Button
            onClick={() => {
              send(message);
            }}
            variant="primary"
            className={classes.send}
          >
            <MdSend />
          </Button>
          {notInModal && (
            <Button
              onClick={() => {
                setShowTags(true);
              }}
              variant="primary"
              className={classes.send}
            >
              Agregar Tags
            </Button>
          )}
        </div>
      </Card.Body>

      {/*Commet Modal */}
      {urlPeopeModalShow && (
        <CustomModal
          show={urlPeopeModalShow}
          title="Agregar enlace a usuario"
          message=""
          myButtonTitle="Agregar"
          onConfirm={addUrl}
          onHide={() => changeModal(setUrlPeopeModalShow)}
        >
          <Form onSubmit={changeModal}>
            <Form.Group className="py-2">
              <span className="p-2 input-icon">
                <AiOutlineUser />
              </span>
              <Form.Control
                className="input-spacing"
                type="text"
                placeholder="Nombre del usuario"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Ingrese un usuario válido.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="py-2">
              <span className="p-2 input-icon">
                <AiOutlineLink />
              </span>
              <Form.Control
                className="input-spacing"
                type="text"
                placeholder="Url del usuario"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Ingrese un usuario válido.
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </CustomModal>
      )}
    </Card>
  );
};

export default NewOpinion;
