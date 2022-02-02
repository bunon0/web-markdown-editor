import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export const History: React.VFC = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  let navigate = useNavigate();

  const handleBackLink = () => {
    navigate("/");
  };

  return (
    <div>
      <h1>History</h1>
      <Button onClick={handleBackLink}>エディタに戻る</Button>
    </div>
  );
};
