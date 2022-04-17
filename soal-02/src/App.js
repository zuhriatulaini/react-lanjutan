import { useEffect, useState } from "react";
import CardProduct from "./components/CardProduct";
import CartListItem from "./components/CartListItem";
import Navbar from "./components/Navbar";

import menus from "./dummy-data";


export default function App() {
  const [total, setTotal] = useState(0);
  const [purchasedItem, setPurchasedItem] = useState(0);
  const [cart, setCart] = useState([]);


  //Tambah item ke cart
  const addToCart = (id) => {
    const my_menu = menus.find((menu) => menu.id === id);
    const id_cart = cart.find((menu) => menu.id === id);
      if (!id_cart) {
        setCart([
          ...cart,
          {
            id,
            name: my_menu.name,
            price: my_menu.price,
            amount: 1
          }
        ]);
      }
        else {
          increaseCartAmount(id);
        }
      
  };

  const decreaseCartAmount = (id) => {
    const index_Cart = cart.find((menu)=> menu.id === id);
    index_Cart.amount = index_Cart.amount - 1;
    const cartActive = cart.filter((menu) => menu.id !== id);
    if ( index_Cart.amount <= 0){
      setCart(cartActive)
    }
      else {
        setCart([...cartActive, index_Cart]);
      }
    }

  const increaseCartAmount = (id) => {
    const index_Cart = cart.find((menu)=> menu.id=== id);
    index_Cart.amount = index_Cart.amount + 1;
    const cartActive = cart.filter((menu) => menu.id !== id);
    setCart([...cartActive, index_Cart]);
  };

  useEffect(()=>{
    setPurchasedItem(cart.reduce((acc, current) => current.amount+ current, 0));
    setTotal(cart.reduce((acc, current)=> current.amount * current.price + acc,0));
  });

  return (
    <div className="bg-secondary">
      <Navbar totalItem={purchasedItem} />
      <div className="container py-5">
        <div className="row">
          <div className="col-md-8">
            <div className="card w-100">
              <div className="card-body">
                <div className="row">
                  {menus.map((menu) => (
                    <div
                      key={menu.id}
                      className="col-md-4 col-sm-6 col-12 my-2"
                    >
                      <CardProduct
                        {...menu}
                        addToCart={() => addToCart(menu.id)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <ol className="list-group">
              {cart.map((c) => {
                return (
                  <CartListItem
                    key={c.id}
                    {...c}
                    increase={() => increaseCartAmount(c.id)}
                    decrease={() => decreaseCartAmount(c.id)}
                  />
                );
              })}
              <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Total Harga</div>
                </div>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD"
                }).format(total)}
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
