import React from "react";
import { ACTION_TYPE } from "../../../../store/Actions";
import { useData } from "../../../../store/data/DataContext";
import { useFilter } from "../../../../store/data/FilterContext";
function Range() {
  const { data } = useData();
  const {
    filterState:{range},
    filterDispatch,
  } = useFilter();

  const highPrice = data
    .map((item) => Number(item.price))
    .reduce((acc,cur)=>acc>cur?acc:cur,0);

  const handleChange = (e) => {
    filterDispatch({ type: ACTION_TYPE.RANGE, payload: `${e.target.value}` });
  };

  return (
    <div>
      <div class="filter-item filter-price">
        <h3>Price</h3>
        <div class="price-range">
          <p>range:{range}</p>
          <p>{highPrice}</p>
        </div>
        <label>
          <input
            type="range"
            name="filter"
            value={range}
            min="500"
            step={200}
            max={highPrice}
            onChange={handleChange}
          />
        </label>
      </div>
    </div>
  );
}

export default Range;
