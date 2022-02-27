import "./App.css";
import React, {useEffect, useState} from "react";
import useFetch from "./useFetch";


function App() {
  //const [selectedColor, setSelectedColor] = useState(null);
  const [genders, setGenders] = useState(null);
  const [selectedGender, setSelectedGender] = useState("");
  
  const [brands, setBrands] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState();
  const [products, setProducts] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(null);
  const { get } = useFetch(" http://localhost:3001/");

  useEffect(() => {
    get("products_get_product_filter")
      .then((data) => {
        setProducts(data);
        // console.log(products)
      })
      .catch((error) => console.log("Could not load product details", error));
  }, []);

  useEffect(() => {
    get("common_get_gender")
      .then((data) => {
        setGenders(data.data);
      })
      .catch((error) => console.log("Could not load product details", error));
  }, []);

  useEffect(() => {
    get("common_get_brands")
      .then((data) => {
        setBrands(data);
      })
      .catch((error) => console.log("Could not load product details", error));
  }, []);

  /* const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
    
  };  */
  /* -------------handleBrandChange--------- */
  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
    const value = event.target.value;
    const filterBrands =
      products &&
      products.data.filter((product) => {
        return product.brand_id === value;
      });

    setFilteredProducts(filterBrands);
  };


  /* Select gender filter */
  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
    const value = event.target.value;

    const filterGender = filteredProducts.filter((item) => {
      console.log("item: ", item);
      return value === item.product_sex;
    });
    setFilteredProducts(filterGender);
  };




  return (
    <div>
      <div>
        <p>Choose the size of the t-shirt</p>

        {/* ------------- Select Brand ------------- */}
        <select defaultValue={selectedBrand} onChange={handleBrandChange}>
          <option value="Brand">---Brand---</option>
          {brands &&
            brands.data.map((brand) => {
              return (
                <option key={brand.id} value={brand.id}>
                  {brand.brand_name}
                </option>
              );
            })}
        </select>
        {/* ------------- Select Color ------------- */}
        {/* <option value="Rot">Rot</option>
          <option value="Weiss">Weiss</option> */}
        {/* <select
          onChange={handleColorChange}
        >
          <option selected value="Brand">
            ---Farbe---
          </option>
          {brands &&
            brands.data.map((brand) => {
              return (
                <option key={brand.id} value={brand.id}>
                  {brand.brand_name}
                </option>
              );
            })}
        </select> */}

        {/* ------------- Select Gender ------------- */}
        <select onChange={handleGenderChange}>
          <option value="Gender">---Gender---</option>

          {genders &&
            genders.map((gender) => {
              return (
                <option key={gender.id} value={gender.sex}>
                  {gender.sex}
                </option>
              );
            })}
        </select>
      </div>

      <div>
        {
          /* products &&
          products.data
            .filter((product) => {
              
              return product.brand_id === selectedBrand; 
            }) */

          filteredProducts &&
            filteredProducts.map((product, index) => {
              return <li key={index}>{product.product_name}</li>;
            })
        }
      </div>
      <div></div>
    </div>
  );
}

export default App;
