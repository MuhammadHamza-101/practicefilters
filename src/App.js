import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/iamspruce/search-filter-painate-reactjs/main/data/countries.json"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setLoading(true);
          setValues(result);
          console.log(result);
        },
        (error) => {
          setLoading(true);
          setError(error);
        }
      );
  }, []);

  const data = Object.values(values);
  if (error) {
    return <>{error.message}</>;
  } else if (!loading) {
    return <>Loading......</>;
  } else {
    return (
      <div className="wrapper">
        <ul className="card-grid">
          {data.map((item) => (
            <li key={item.alpha3Code}>
              <article className="card">
                <div className="card-image">
                  <img src={item.flag.large} alt={item.name} />
                </div>
                <div className="card-content">
                  <h2 className="card-name">{item.name}</h2>
                  <ol className="card-list">
                    <li>
                      population: <span>{item.population}</span>
                    </li>
                    <li>
                      Region: <span>{item.region}</span>
                    </li>
                    <li>
                      Capital: <span>{item.capital}</span>
                    </li>
                  </ol>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
