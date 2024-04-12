import React, { useContext, useState } from "react";
import "./CSS/ShopCategory.css";
import { ShopContext } from "../Context/ShopContext";
import Item from "../Components/Item/Item";

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);

  const [sortOption, setSortOption] = useState("");
  const handleSortChange = (option) => {
    setSortOption(option);
  };

  let sortedProducts = [...all_product];
  if (sortOption === "price_lowest") {
    sortedProducts.sort((a, b) => a.new_price - b.new_price);
  } else if (sortOption === "price_highest") {
    sortedProducts.sort((a, b) => b.new_price - a.new_price);
  }

  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of {sortedProducts.length} products
        </p>
        <div className="shopcategory-sort">
          Sort by{" "}
          <select onChange={(e) => handleSortChange(e.target.value)}>
            <option value="">Select</option>
            <option value="price_highest">Price: High to Low</option>
            <option value="price_lowest">Price: Low to High</option>
          </select>
        </div>
      </div>

      <div className="shopcategory-products">
        {sortedProducts.map((item, i) => {
          if (props.category === item.category) {
            return (
              <Item
                key={i}
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            );
          } else {
            return null;
          }
        })}
      </div>

      <div className="shopcategory-loadmore">Explore More</div>
    </div>
  );
};

export default ShopCategory;
