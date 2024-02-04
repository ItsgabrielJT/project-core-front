import {
  Backdrop,
  Box,
  CircularProgress,
  Fab,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { StyledBackdrop } from "@constants/styles";
import ModalDialog from "@components/modals/ModalDialog";
import { Link, useNavigate } from "react-router-dom";
import LargeCard from "@components/cards/LargeCard";
import notificationService from "@services/notificationService";
import WorkOffIcon from "@mui/icons-material/WorkOff";
import { useProjects } from "@hook/projects/useProjects";
import { accountService } from "@services/account/accountService";
import { PrimeReactProvider } from "primereact/api";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import DeleteIcon from "@mui/icons-material/Delete";
import { Tag } from "primereact/tag";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import SearchIcon from "@mui/icons-material/Search";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { useUsers } from "@hook/colaborators/useUsers";

function Users() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [success, setSuccess] = useState(false);
  const { users, loading } = useUsers();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    full_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    email_user: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    university_name: { value: null, matchMode: FilterMatchMode.IN },
    id: { value: null, matchMode: FilterMatchMode.EQUALS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const handleConfirm = () => {
    accountService
      .deleteUser(user.id)
      .then((res) => {
        if (res.data.status) {
          notificationService.success("Se ha eliminado correctamente");
          setSuccess(true);
        }
      })
      .catch((err) => {
        notificationService.error(err.message);
        setSuccess(false);
      })
      .finally(() => {
        setOpen(false);
      });
  };

  const handleDetail = () => {
    navigate(`/admin/user/${user.id}`);
  };


  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-end " style={{ display: "flex", justifyContent: 'space-between', gap: 15 }}>
        <span className="p-input-icon-left">
          <SearchIcon
            sx={{
              fontSize: "25px",
              top: 0,
              marginTop: "10px",
              color: "#9BBEC8",
            }}
          />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Buscar por correo, nombres, id, universidad"
          />
        </span>
        {user && (
          <div>
            <Tooltip title="Ver perfil">
              <Fab
                size="small"
                aria-label="edit"
                onClick={() => handleDetail()}
                style={{
                  boxShadow: "none",
                  zIndex: 0,
                  marginRight: "10px",
                }}
              >
                <PersonSearchIcon />
              </Fab>
            </Tooltip>
            <Tooltip title="Eliminar">
              <Fab
                size="small"
                aria-label="edit"
                onClick={() => setOpen(true)}
                style={{
                  backgroundColor: "#FFB1B8",
                  boxShadow: "none",
                  zIndex: 0,
                }}
              >
                <DeleteIcon
                  sx={{
                    color: "#DC3545",
                  }}
                />
              </Fab>
            </Tooltip>
          </div>
        )}
      </div>
    );
  };

  const header = renderHeader();

  const selectedValue = (e) => {
    setSelectedProducts(e.value);
    setUser(e.value[0]);
  };

  return (
    <>
      {users ? (
        <Box
          sx={{
            marginTop: "120px",
            height: "100%",
            backgroundColor: "#FFFDFA",
            position: "overflow",
            paddingX: "10px",
            boxShadow: "none",
          }}
        >
          <ModalDialog
            title={`Quieres eliminar al usuario ${user ? user.full_name : ""}?`}
            open={open}
            onClose={() => setOpen(false)}
            onConfirm={handleConfirm}
            slots={{ backdrop: StyledBackdrop }}
          />
          <PrimeReactProvider>
            <DataTable
              value={users}
              selectionMode="multiple"
              selection={selectedProducts}
              onSelectionChange={selectedValue}
              dataKey="id"
              filters={filters}
              filterDisplay="row"
              loading={loading}
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 25, 50]}
              tableStyle={{ minWidth: "50rem", backgroundColor: "#FFFDFA" }}
              globalFilterFields={[
                "full_name",
                "email_user",
                "university_name",
                "id",
              ]}
              header={header}
              emptyMessage="No se encontro al usuario."
            >
              <Column field="id" header="ID"></Column>
              <Column field="full_name" header="NOMBRES"></Column>
              <Column field="email_user" header="CORREO"></Column>
              <Column field="university_name" header="UNIVERSIDAD"></Column>
            </DataTable>
          </PrimeReactProvider>
        </Box>
      ) : (
        <Box
          sx={{
            marginTop: "60px",
            height: "100%",
            backgroundColor: "#FFFDFA",
            position: "overflow",
            paddingX: "15px",
            boxShadow: "none",
          }}
        >
          <Backdrop
            sx={{ color: "#blue", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
            invisible={true}
          >
            <CircularProgress color="primary" size={40} />
          </Backdrop>
        </Box>
      )}
    </>
  );
}

export default Users;
