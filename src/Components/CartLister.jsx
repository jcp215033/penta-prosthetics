import React, { useState, useEffect } from "react";
import RemoveCartLogo from "./RemoveCartLogo";
import Image from "./Image";
import OutOfStockCard from "./OutOfStockCard";
const CartLister = ({ cartCount, setCartCount, outOfStock, setOutOfStock }) => {
  const [button, setButton] = useState(1);
  const [cardsVisible, setCardsVisible] = useState(true);

  return (
    <>
      <div id="cardDiv">
        {Object.entries(localStorage).map(([key, value]) => {
          let item = "";
          if (key !== "partner" && key !== "notes") {
            item = JSON.parse(value);
          }
          return item ? (
            outOfStock.has(item['Item ID']) ? <OutOfStockCard item={item} button={button} setButton={setButton} setCartCount={setCartCount} cartCount={cartCount} setOutOfStock={setOutOfStock}/> :(
            <div
              className={`card ${cardsVisible ? "visible" : ""}`}
              // style={{ animationDelay: `${index * 200}ms` }}
              key={item.id}
            >
              <div>
                <header className="card-header">
                  <div className="has-text-centered" style={{ width: "100%" }}>
                    <p
                      className="has-text-weight-bold ml-3 my-3"
                      style={{ fontSize: "18px" }}
                    >
                      {item["Description (from SKU)"]}
                    </p>
                    <p
                      style={{ marginTop: "-12px" }}
                      className="has-text-grey ml-3 mb-3"
                    >
                      {item["Item ID"]}
                    </p>
                  </div>
                </header>
                <div className="">
                  <p
                    className="has-text-weight-bold has-text-centered mt-4"
                    style={{ fontSize: "18px" }}
                  >
                    {item["Tag"]}
                  </p>
                  <hr
                    className="mb-4 mt-3"
                    style={{ margin: "0 auto", width: "80%" }}
                  ></hr>
                </div>
                <div className="content mx-5 mb-5">
                  {item["Manufacturer"] && (
                    <div
                      className="mb-4 has-text-centered"
                      style={{ width: "50%" }}
                    >
                      <p
                        className="has-text-weight-bold"
                        style={{ margin: "0" }}
                      >
                        Manufacturer
                      </p>
                      <p>{item["Manufacturer"]}</p>
                    </div>
                  )}
                  {item["Size"] && (
                    <div className="has-text-centered" style={{ width: "50%" }}>
                      <p
                        className="has-text-weight-bold has-text-centered"
                        style={{ margin: "0" }}
                      >
                        Size
                      </p>
                      <p>{item["Size"]}</p>
                    </div>
                  )}
                  {item["Model/Type"] && (
                    <div className="has-text-centered" style={{ width: "50%" }}>
                      <p
                        className="has-text-weight-bold has-text-centered"
                        style={{ margin: "0" }}
                      >
                        Model
                      </p>
                      <p>{item["Model/Type"]}</p>
                    </div>
                  )}
                </div>
              </div>
              <footer className="card-footer">
                <a
                  className={`button card-footer-item ${
                    !localStorage.getItem([item["Item ID"]])
                      ? "images-button-red"
                      : "images-button-blue"
                  }`}
                  href={`https://www.google.com/search?q=${encodeURIComponent(
                    item.StringSearch
                  )}&tbm=isch`}
                  target="_blank"
                >
                  <Image color={"black"}></Image>
                </a>
                <button
                  className="button card-footer-item remove-button"
                  style={{
                    color: "white",
                  }}
                  onClick={() => {
                    localStorage.removeItem(item["Item ID"]);
                    setButton(button + 1);
                    setCartCount(cartCount - 1);
                    // setIsPulsing(true);
                    // setTimeout(() => {
                    //   setIsPulsing(false);
                    // }, 1000);
                    setIsCartPressed(true);
                    setTimeout(() => {
                      setIsCartPressed(false);
                    }, 1000);
                  }}
                >
                  <RemoveCartLogo></RemoveCartLogo>
                </button>
              </footer>
            </div>)
          ) : (
            <></>
          );
        })}
        {/* {console.log(ids)} */}
      </div>
    </>
  );
};

export default CartLister;
