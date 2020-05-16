import React, { Component } from "react";

import "./NewItemForm.css";

import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";

class NewItemForm extends Component {
  state = {
    newItemForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Nombre",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      amount: {
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: "Monto",
        },
        value: null,
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      date: {
        elementType: "input",
        elementConfig: {
          type: "date",
          placeholder: "Fecha",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      description: {
        elementType: "textarea",
        elementConfig: {
          type: "text",
          placeholder: "Descripción",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },

      category: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "Comida", displayValue: "Comida" },
            { value: "Salud", displayValue: "Salud" },
            { value: "Servicios", displayValue: "Servicios" },
            { value: "Transporte", displayValue: "Transporte" },
            { value: "Otro", displayValue: "Otro" },
          ],
        },
        value: "",
        validation: {},
        valid: true,
      },
    },
  };

  render() {
    let form: null;
    return <form className="newExpense_form"></form>;
  }
}

// const options = props.options.map((option, i) => {
//   return (
//     <option key={option + i} value={option}>
//       {option}
//     </option>
//   );
// });

//   return (
//     <form action="" className="newExpense__form">
//       <input
//         name="itemName"
//         type="text"
//         placeholder="Nombre"
//         value={props.values.itemName}
//         onChange={props.changed}
//         />
//         {props.incomeVersion ? null : (
//         <select
//         name="category"
//         value={props.values.category}
//           ref={props.reference}
//           onChange={props.changed}
//         >
//         <option value="" hidden disabled>
//         --categoría--
//         </option>
//         {options}
//         </select>
//       )}
//       <input
//       name="amount"
//       type="number"
//         placeholder="Monto"
//         value={props.values.amount}
//         onChange={props.changed}
//       />
//       <input
//         name="date"
//         type="date"
//         placeholder="Fecha"
//         value={props.values.date}
//         onChange={props.changed}
//         />
//         <textarea
//         name="description"
//         type="text"
//         placeholder="Descripción (opcional)"
//         value={props.values.description}
//         onChange={props.changed}
//       />
//       {!props.formValidated ? (
//         <p className="newExpense__formValidation">Hay campos vacios</p>
//         ) : null}
//         <div className="newExpense__btnWrapper">
//           <Button color="white" btnType="add" clicked={props.clicked}>
//             Guardar
//           </Button>
//           <Button color="white" btnType="cancel" clicked={props.clickClosed}>
//             Cancelar
//           </Button>
//         </div>
//     </form>
//     );
// };

export default NewItemForm;
