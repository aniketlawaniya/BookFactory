import React from "react";
import { toast } from "react-toastify";
import { ACTION_TYPE } from "../../../../store/Actions";
import {useFilter} from "../../../../store/data/FilterContext"
function FilterHeader() {
  const {filterDispatch} =useFilter();

  const clearFilter = () => {
    filterDispatch({type:ACTION_TYPE.RESET})
    toast.success("All filters are cleared")
  }

  return (
    <div>
        <div class="filter-item filter-header">
          <h2>Filters</h2>
          <button class="btn btn-s btn-link" onClick={clearFilter}>clear</button>
        </div>
    </div>
  );
}

export default FilterHeader;
