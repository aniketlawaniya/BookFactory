import React from "react";
import { useData } from "../../../../store/data/DataContext";
import { useFilter } from "../../../../store/data/FilterContext";
import {ACTION_TYPE} from "../../../../store/Actions"

function SortBy() {
  const {filterState:{sort},filterDispatch}=useFilter();
  return (
    <div>
      <div className="filter-item filter-sortBy">
      <h3>Sort By</h3>
      <label class="filter-label">
        <input type="radio" name="sort" value="LOW_TO_HIGH" class="filter-check" onChange={()=>filterDispatch({type:ACTION_TYPE.SORT_TYPE,payload:"LOW_TO_HIGH"})} checked={sort==="LOW_TO_HIGH"?true:false}/>
        low-to-high
      </label>
      <label class="filter-label">
        <input type="radio" name="sort" value="HIGH_TO_LOW" class="filter-check" onChange={()=>filterDispatch({type:ACTION_TYPE.SORT_TYPE,payload:"HIGH_TO_LOW"})} checked={sort==="HIGH_TO_LOW"?true:false}/>
        high-to-low
      </label>
      </div>
    </div>
  );
}

export default SortBy;
