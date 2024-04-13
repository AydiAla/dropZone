// ActivationPage.js
import { useParams } from "react-router-dom";
import axios from "axios";

function ActivationPage() {
  const { activationCode } = useParams();

  axios.post(`http://localhost:3000/api/auth/verif/${activationCode}`); //

  return (
    <div>
      <h1>Activation Page</h1>
      <p>Activation code: {activationCode}</p>
    </div>
  );
}

export default ActivationPage;
