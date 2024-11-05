import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../../redux/feature/authSlice";
import moment from "moment";

const WelcomeHeaderUser = () => {
  const currentUser = useSelector(selectCurrentUser);
  const date = new Date();
  const dateFormat = moment(date).format("MMMM DD YYYY");

  return (
    <div className="bg-white shadow-lg rounded-lg  text-gray-800  mb-4 p-10">
      <p className="mb-8">{dateFormat} </p>
      <h1 className="text-4xl my-2">Welcome Back, {currentUser?.name} </h1>
      <p className="text-lg">Alawys stay updated in your student portal </p>
    </div>
  );
};
export default WelcomeHeaderUser;
