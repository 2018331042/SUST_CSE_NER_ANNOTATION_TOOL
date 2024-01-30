import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../../components/adminNavbar";
import LoaderBar from "../../components/loaderbar";
import { Select } from "tabler-icons-react";
import { Table } from "@mantine/core";

const ValidatorSrat = () => {
  const [validatedData, setValidatedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/count-validate");
        // Handle the response data here
        console.log(response.data);
        setValidatedData(response.data.response);
      } catch (error) {
        // Handle the error here
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const stats = validatedData.map((e) => {
    console.log(e.validate_user_info[0].name);
    return (
      <tr>
        <td>{e.validate_user_info[0].name}</td>
        <td>{e.count}</td>
      </tr>
    );
  });

  return (
    <AdminNavbar>
      {!validatedData ? (
        // <LoaderBar />
        <div>No data</div>
      ) : (
        <div>
          <div style={{ marginTop: "2rem" }}>
            <Table withBorder withColumnBorders>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody>{stats}</tbody>
            </Table>
          </div>
        </div>
      )}
    </AdminNavbar>
  );
};

export default ValidatorSrat;
