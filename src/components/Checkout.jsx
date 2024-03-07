import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { useContext } from "react";
import UserProgressContext from "../store/UserProgressContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import useHttp from "../use-http.js";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);



  const { data, isLoading, error, sendRequest, clearData } = useHttp(
    "http://localhost:3000/orders",
    requestConfig
  );

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleCloseButton() {
    userProgressCtx.hideCheckout();
  }
  function handleFinish() {
    userProgressCtx.hideCheckout();

    cartCtx.clearCart()
    clearData()
  }
  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  }

  let actions = (<>
   <Button onClick={handleCloseButton} type="button" textOnly>
            Close
          </Button>
          <Button>Submit Form</Button>
  
  </>)
  if(isLoading){
    actions = <span>Sending order data...</span>
  }

  if(data && !error) {
     return <Modal  onClose={handleCloseButton} open={userProgressCtx.progress === 'showCheckout'}>
      <h2>Sucsees!</h2>
      <p>Your order was submeted succesfuly</p>
      <p className="modal-actions">
        <Button onClick={handleFinish}>OK</Button>
      </p>
     </Modal>
  }
 

  return (
    <Modal
      onClose={handleFinish}
      open={userProgressCtx.progress === "showCheckout"}
    >
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label="Full Nane" type="text" id="name" />
        <Input label="E-mail Address" type="email" id="email" />
        <Input label="Stret" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        {error && <Error title='Failed to submit order' message={error} />} 
        <p className="modal-actions">{actions}</p>
       
      </form>
    </Modal>
  );
}
