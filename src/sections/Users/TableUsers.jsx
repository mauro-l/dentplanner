import React, { useState } from "react";
import Button from "../../components/Button";
import { AiOutlineUserDelete } from "react-icons/ai";
import PropTypes from "prop-types";
import { apiDeleteUserById } from "../../api/users/apiUsers";
import ModalDeleted from "../../components/ModalDeleted";
import { Toaster, toast } from "react-hot-toast";
import {useDecode} from "../../hooks/useDecode"

const TableUsers = ({ users }) => {
  const token = localStorage.getItem("token");
  const decode = useDecode(token);
  const [modalDeleted, setModalDeleted] = useState(false);
  const [userDeleted, setUserDeleted] = useState(null);
console.log(decode);

  const handleDeletedModal = (data) => {
    setModalDeleted(true);
    setUserDeleted(data);
  };

  const handleDeletedUser = async () => {
    try {
    if (userDeleted) {
     const response=  await apiDeleteUserById(userDeleted.id);
     if (response.status === 200) {
      toast.success("Usuario eliminado exitosamente");
      setTimeout(() => {
        window.location.reload(); // Recargar la página después de eliminar el usuario 
      }, 500);
    }
      
    }
  }catch (error) {
    console.error("Error de la API:", error);
  }
  };

  const handleRole = (role) => {
    if (role === 1) {
      return "Administrador";
    } else if (role === 2) {
      return "Secretario";
    } else if (role === 3) {
      return "Odontólogo";
    }
  };

  return (
    <div className="max-w-[744px] border pt-1 rounded-md bg-bgTable h-[20rem] overflow-y-auto">
      <table className="w-full ">
        <thead className="space-y-1">
          <tr className="space-y-1 space-x-3 rounded-md">
            <td className="p-1 text-center w-1/4">
              <h3 className="border text-[14px] sm:text-[18px] rounded-md p-2 bg-custom-gradient">ROL</h3>
            </td>
            <td className="p-1 hidden sm:table-cell w-1/4 text-center">
              <h3 className=" text-[14px] sm:text-[18px]  border rounded-md p-2 bg-custom-gradient">DNI</h3>
            </td>
            <td className="p-1 w-full text-center">
              <h3 className="border text-[14px] sm:text-[18px]  rounded-md p-2 mr-2 bg-custom-gradient">NOMBRE Y APELLIDO</h3>
            </td>
          </tr>
        </thead>
        <tbody className="space-y-1 rounded-md">
          {users.map((user, index) => (
            <tr key={index} className="space-x-3">
              <td className="text-center p-1 w-1/4">
                <p className="border text-[14px] sm:text-[18px]  rounded-md p-2 bg-white">{handleRole(user.role_id)}</p>
              </td>
              <td className="hidden sm:table-cell text-center p-1 w-1/4">
                <p className="border text-[14px] sm:text-[18px]  rounded-md p-2 bg-white">{user.dni}</p>
              </td>
              <td className="p-1 w-full">
                <div className="flex items-center justify-center relative">
                  <p className="w-full text-[14px] sm:text-[18px]  p-2 rounded-md border text-center mr-2 bg-white">
                    {user.first_name} {user.last_name}
                  </p>
                  { decode.user_id !== user.id &&
                  (<Button
                    type="button"
                    onClick={() => handleDeletedModal(user)}
                    className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 bg-transparent p-1"
                  >
                   <AiOutlineUserDelete className="text-[#7d8693]  text-[14px] sm:text-[18px] " />
                  </Button>)}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ModalDeleted
        isVisible={modalDeleted}
        setIsVisible={setModalDeleted}
        deletedModal={handleDeletedUser}
        titleModal={"Eliminar usuario"}
        infoModal={"¿Estás seguro que querés eliminar este usuario? Se eliminarán todos sus datos."}
      />
      <Toaster position="top-right" />
    </div>
  );
};

TableUsers.propTypes = {
  users: PropTypes.array.isRequired,
};

export default TableUsers;
