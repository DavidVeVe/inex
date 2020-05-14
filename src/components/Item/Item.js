import React from "react";

import "./Item.css";
import deleteIcon from "../../assets/icons/delete.png";
import editIcon from "../../assets/icons/edit2.png";

const item = (props) => {
  return (
    <article
      onClick={props.clicked}
      className={[
        "item__container",
        props.version ? "item__income" : "item__expense",
      ].join(" ")}
    >
      <span className="item__id">{props.itemId}</span>
      <span className="item__name">{props.itemName}</span>
      <span className="item__amount">${props.amount}.00</span>
      <span className="item__date">{props.date}</span>
      {props.version ? null : (
        <span className="item__category">{props.category}</span>
      )}
      <div className="item__actions">
        <img
          onClick={props.itemEdited}
          className="item__icons"
          src={editIcon}
          alt="edit icon"
        />
        <img
          onClick={props.togglePopup}
          className="item__icons"
          src={deleteIcon}
          alt="trash icon"
        />
      </div>
    </article>
  );
};

export default item;
