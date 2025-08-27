"use client";
import React, { useEffect, useState } from "react";
import styles from "./RandomDrink.module.css";

export default function RandomDrink() {
  const [drinks, setDrinks] = useState([]);
  const [randomDrink, setRandomDrink] = useState(null); //データ取得後にランダムなドリンクをいれる

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        setDrinks(data);
        if (data.length > 0) {
          const random = data[Math.floor(Math.random() * data.length)];
          setRandomDrink(random);
        }
      });
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>今日の一杯</div>
      {randomDrink && (
        <div className={styles.card}>
          <img src={randomDrink.image} alt={randomDrink.name} />
          <div className={styles["card-title"]}>{randomDrink.name}</div>
          <div className={styles["card-sub"]}>
            {randomDrink.type}
            {randomDrink.category}　アルコール{randomDrink.alcohol}%
          </div>
          <div className={styles["card-desc"]}>{randomDrink.description}</div>
          <div className={styles["card-mood"]}>{randomDrink.mood}</div>
        </div>
      )}
    </div>
  );
}
