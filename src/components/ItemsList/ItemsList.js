import React, { Fragment } from "react";

import "./ItemsList.css";

import ListControls from "../ListControls/ListControls";
import Item from "../Item/Item";

const itemsList = (props) => {
  const items = props.itemsValues.map((item, index) => {
    return (
      <Item
        version={props.version}
        key={item.itemName + index}
        itemId={index + 1}
        itemName={item.itemName}
        amount={item.amount}
        date={item.date}
        category={item.category}
        itemEdited={(e) => props.clickedEdited(index, e)}
        itemDeleted={(e) => props.itemDeleted(index, e)}
        clicked={() => props.descriptionToggle(index)}
        togglePopup={(e) => props.togglePopup(index, e)}
      />
    );
  });

  return (
    <Fragment>
      <section className="itemList__container">
        <ListControls
          version={props.version}
          total={props.totalAmount}
          openForm={props.clickedOpened}
        />
        <section className="itemList__tags">
          <span>Id</span>
          <span>Nombre</span>
          <span>Cantidad</span>
          <span>Fecha</span>
          {props.version ? null : <span>Categoria</span>}
          <span></span>
        </section>
        {props.itemsValues.length >= 1 ? (
          items
        ) : (
          <p className="itemList__empty">
            No hay registros{" "}
            <span role="img" aria-label="astronaut">
              👨‍🚀
            </span>
          </p>
        )}
      </section>
    </Fragment>
  );
};

export default itemsList;
