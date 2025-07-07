import { useState, useRef } from "react";
import axios from "axios";

function Recipe() {
  const [query, setQuery] = useState("");
  const [msg, setMsg] = useState("");
  const [meals, setMeals] = useState([]);


  const rQuery = useRef();

  const hQuery = (event) => {
    setQuery(event.target.value);
  };

  const show = (event) => {
    event.preventDefault();

    if (query.trim().length === 0) {
      alert("Please enter recipe name!!!");
      setMsg("");
      setQuery("");
      rQuery.current.focus();
      return;
    }

    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
    axios
      .get(url)
      .then((res) => {
        const meals = res.data.meals;
        if (meals) {
          setMeals(meals);
          setMsg(`Found ${meals.length} recipes for "${query}"`);
        } else {
          setMeals([]);
          setMsg(`No recipes found for "${query}"`);
        }
        setQuery("");
        rQuery.current.focus();
      })
      .catch((err) => {
        alert("Msg: " + err);
      });
  };


  return (
    <>
      <div>
        <h1>🍽️ Recipe Finder</h1>
        <form onSubmit={show}>
          <input
            type="text"
            placeholder="Enter Recipe You want to search for"
            value={query}
            ref={rQuery}
            onChange={hQuery}
          />
          <input type="submit" value="Search" />
        </form>
        <br />
        <div>{msg}</div>

        <div className="meal-container">
          {meals.map((meal) => (
            <div key={meal.idMeal} className="meal-card">
              <h3>{meal.strMeal}</h3>
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                width="250"
                style={{ borderRadius: "10px", marginBottom: "10px" }}
              />
              <p>
                <b>Category:</b> {meal.strCategory}
              </p>
              <ul>
                {[1, 2, 3, 4, 5].map((i) => {
                  const ing = meal[`strIngredient${i}`];
                  return ing ? <li key={i}>{ing}</li> : null;
                })}
              </ul>

              <br />

              {meal.strYoutube && (
                <a href={meal.strYoutube} target="_blank" rel="noreferrer">
                  ▶️ Watch Recipe Video
                </a>
              )}


            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Recipe;
