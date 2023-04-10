import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../api/config";
import { getlocalstorage } from "../../localstorage";
import Loader from "../../components/molecule/Loader";
import { useParams, useNavigate, Link } from "react-router-dom";

function OtherProfile() {
  const email = getlocalstorage("user").user_email;
  const { user_id } = useParams();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (email === user_id + "@gmail.com") {
      navigate("/profile");
    } else {
      axios
        .get(config.apiUrl + "/profile/" + user_id + "@gmail.com")
        .then((response) => {
          let user = JSON.parse(
            response.data.user
              .replace(/'/g, '"')
              .replace(/True/g, "true")
              .replace(/False/g, "false")
          );
          setUser(user);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }, []);

  return (
    <div className="container">
      <h1 className="text-center">Profile</h1>
      {loading ? (
        <Loader />
      ) : (
        <div className="d-flex justify-content-center mt-3">
          <div
            className=" card border-0 col-xxl-5 col-xl-6 col-lg-7 col-md-9 col-12"
            style={{ backgroundColor: "#3E3E3E", borderRadius: "16px" }}
          >
            <div className="card-body p-4">
              <div>
                <div className="d-flex justify-content-center">
                  <img
                    src={user.profile_pic}
                    className="rounded-circle shadow-4"
                    style={{ width: "100px" }}
                    alt="Avatar"
                  />
                </div>
                <div className="mt-4">
                  <p className="fs-6">Name : {user.name}</p>
                  <p className="fs-6">Email : {user.email}</p>
                </div>
              </div>
              <Link
                to="#"
                onClick={(e) => {
                  window.location.href = "mailto:" + user.email;
                  e.preventDefault();
                }}
              >
                <button className="btn cust-profile-btn mt-4" style={{width:"100%"}}>Send Email</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OtherProfile;
