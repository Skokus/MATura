import React, { useState, useEffect } from "react";
import "./Modal.css";

export default function Modal(props) {
  const [modal, setModal] = useState(props.isActive);

  useEffect(() => {
    setModal(props.isActive);
  }, [props.isActive]);

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <div className="modal-content-header">Zadanie rozwiązane!</div>
            <div className="modal-content-text">Cieszymy się, że idzie ci coraz lepiej!</div>
            <button className="close-modal modal-btn" onClick={toggleModal}>
              X
            </button>
          </div>
        </div>
      )}
    </>
  );
}