import { Link } from "react-router-dom";

import Back from '@/assets/images/back.svg';

const BackButton = () => {
  return (
    <div className="py-4">
      <Link to={`/`} className="back-button" >
        <img src={Back} alt="back" className="w-6 stroke-white"/>
        Go back
      </Link>
    </div>
  );
};

export default BackButton;