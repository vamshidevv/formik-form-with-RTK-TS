import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";

const Dashboard = () => {
  const [isLoading, setIsloading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsloading(false);
    }, 1000);
  });

  return (
    <>
      {isLoading === true ? (
        <HashLoader
          color="white"
          className="pre-loader"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            // transform: "translate(-50%, -50%)",
          }}
        />
      ) : (
        <div>
          <div className="data-container">
            <h2>User Details</h2>
            <table border={1}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>State</th>
                  <th>City</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Vamshi</td>
                  <td>Vamshi@gmail.com</td>
                  <td>8866265053</td>
                  <td>Male</td>
                  <td>Gujarat</td>
                  <td>State</td>
                  <td>City</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
