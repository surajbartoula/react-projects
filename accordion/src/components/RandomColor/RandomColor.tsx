import style from "./RandomColor.module.css"

export default function RandomColor() {
    return (
        <div className={style.container}>
            <h1>Random Color Generator</h1>
            <div>
                <button>Create HEX Color</button>
                <button>Create RGB Color</button>
                <button>Generate Random Color</button>
                <h1>HEX Color</h1>
                <h1>#A8475D</h1>
            </div>
        </div>
    )
}