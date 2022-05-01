import { collection } from "firebase/firestore";
import { useState } from "react";
import TableFilter from "../../components/TableFilter/TableFilter";
import { db } from "../../firebase/firebase.config";
// import classes from "./UsersReports.module.css";

const UsersReports = () => {
  const [reportsCollection, setReportsCollection] = useState(
    collection(db, "users/1/reports")
  );

  return (
    <>
      <TableFilter
        title="Reportes"
        columns={[
          { key: "reporterName", label: "Usuario reportado", filter: true },
          { key: "reportedName", label: "Usuario reportador", filter: true },
          { key: "opinionText", label: "Opinión", filter: false },
          { key: "description", label: "Descripción", filter: false },
          { key: "response", label: "Respuesta", filter: false },
          {
            key: "status",
            label: "Estado",
            filter: false,
            render: (data) => (data === 0 ? "Rechazado" : "Aceptado"),
          },
        ]}
        collection={reportsCollection}
      />
    </>
  );
};

export default UsersReports;
