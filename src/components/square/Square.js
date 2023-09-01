import "./square.css"
const Square = ({ color, handleClick, status }) => {
  return (
    <td className="square" onClick={status ? null : handleClick}>
      <div
        className="circle"
        style={{
          color: color,
          backgroundColor: color,
          borderColor: color,
        }}
      ></div>
    </td>
  )
}

export default Square
