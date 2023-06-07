import axios from "axios";
import React, { useEffect, useState } from "react";
import { ACTION_TYPE } from "../../../../store/Actions";
import { useFilter } from "../../../../store/data/FilterContext";


function Category() {
  const { filterState, filterDispatch } = useFilter();
  const {category}=filterState;


  const [categories, setCategories] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/categories");
        setCategories((prev) => [...prev, ...response.data.categories]);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div>
      <div class="filter-item filter-category">
        <h3>Category</h3>
        {categories.map((item) => {
          const {categoryName}=item;
          return (
            <label htmlFor={categoryName} class="filter-label">
              <input
                type="checkbox"
                name="category"
                id={categoryName}
                class="filter-check"
                value={categoryName.toUpperCase()}
                onChange={() => filterDispatch({ type: ACTION_TYPE.CATEGORY,payload:categoryName })}
                checked={category.includes(categoryName)}
              />
              {categoryName}
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default Category;
