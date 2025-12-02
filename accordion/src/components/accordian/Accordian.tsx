import data from "./data";
import styles from "./Accordian.module.css";
import { useState } from "react";

function Accordian() {
  const [multiSelect, setMultiSelect] = useState(false);
  //Track open items
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    if (multiSelect) {
      if (openIds.includes(id)) {
        setOpenIds(openIds.filter((openId) => openId !== id));
      } else {
        setOpenIds([...openIds, id]);
      }
    } else {
      setOpenIds(openIds.includes(id) ? [] : [id]);
    }
  };
  return (
    <div className={styles.container}>
      <button
        className={styles.btn}
        onClick={() => setMultiSelect(!multiSelect)}
      >
        {multiSelect ? "Disable Multi Selection" : "Enable Multi Selection"}
      </button>
      {data.map((item) => (
        <div key={item.id} className={styles.article}>
          <div className={styles.question}>
            <h3>{item.question}</h3>
            <button onClick={() => toggleItem(item.id)}>+</button>
          </div>
          {openIds.includes(item.id) && <p>{item.answer}</p>}
        </div>
      ))}
    </div>
  );
}

export default Accordian;
