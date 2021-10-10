import alert from "../../img/warn.png";

function RequiredAlert() {
  return (
    <div className="should-check__alert">
      <img src={alert} />
      這是必填問題
    </div>
  );
}

export default RequiredAlert;
