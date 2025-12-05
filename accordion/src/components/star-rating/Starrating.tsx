import { FaStar } from "react-icons/fa";
import "./styles.css";
import { useState } from "react";

export default function Starrating() {
    const [rating, setRating] = useState(0);
    return(
        <div className="container-star">
            {Array.from({ length: 5 }).map((_, i) => {
                const starValue = i + 1;
                return (
                    <FaStar
                        key={i}
                        size={40}
                        onClick={() => setRating(starValue)}
                        color={starValue <= rating ? "blue" : "lightgrey"}
                        style={{ cursor: "pointer" }}
                    />
                )
            })}
        </div>
    )
}