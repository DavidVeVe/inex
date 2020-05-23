import React, { Fragment } from "react";

import "./Description.css";

import Button from "../UI/Button/Button";

const Description = (props) => {
  return (
    <div className="description__container">
      {props.descriptionData.description ? (
        <Fragment>
          <p className="description__name">Nombre :</p>
          <span>{props.descriptionData.itemName}</span>
          <h3>Descripción:</h3>
          <p className="description__text">
            {props.descriptionData.description}
          </p>
        </Fragment>
      ) : (
        <p className="noDescription">Este registro no tiene descripción.</p>
      )}
      <Button
        color="white"
        with="auto"
        fontSize=".8rem"
        btnType="add"
        clicked={props.showDescriptionInfo}
      >
        Ok
      </Button>
    </div>
  );
};

export default Description;
