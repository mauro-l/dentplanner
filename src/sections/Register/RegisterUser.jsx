import React from 'react'
import Button from '../../components/Button'
import Input from '../../components/Input'
import Options from '../../components/Options';
import InputPassword from '../../components/InputPassWord'
import CardWhite from '../../components/CardWhite';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import registerSchema from '../../validations/register';
import { apiRegister } from '../../api/apiRegister';
import { Toaster, toast } from "react-hot-toast";

const RegisterUser = () => {
 
  const navigate = useNavigate();
  //esquema de zod para las validaciones
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit =async (data) => {
    
    try {
      const response = await apiRegister(data); // Enviamos el objeto data directamente
      
      if (response.status === 200) {
        toast.success("El usuario se creo con éxito");
        setTimeout(() => {
          window.location.href = "/usuarios";
        }, 500);
      }

    } catch (error) {
     
        console.log(error.response);
        
        // El servidor respondió con un estado diferente a 2xx
        
        toast.error("No se pudo crear el usuario, DNI o email duplicados")
      
    console.error('Register failed with response:', error);
    }
  };
  //con esto paso los roles al campo con opciones
  const roleOptions = [
    { value: "odontologo", label: "Odontólogo" },
    { value: "secretario", label: "Secretario" }
  ];
  //funcion para el boton cancelar 
  const handleCancel =()=>{
    navigate('/usuarios');
  }
  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-6 lg:px-8">
        <CardWhite className="sm:mx-auto sm:w-full sm:max-w-md p-6 pt-[48px] rounded-lg gap-[24px]">
          <div className="sm:w-full">
            <h2 className="text-start text-2xl font-bold leading-9 mx-2 tracking-tight text-gray-900">
              Añadir Usuario
            </h2>
          </div>

          <div className="sm:w-full">
            <form className="flex flex-col gap-[24px]" onSubmit={handleSubmit(onSubmit)}>
              {/* Inputs de nombre y apellido */}
              <div className='flex flex-col sm:flex-row gap-4'>
                <div className="w-full sm:w-1/2">

                  <label
                    htmlFor="name"

                    className="block text-sm font-medium mx-2 leading-6 text-gray-900 "
                  >
                    Nombre *
                  </label>
                  <div className="mt-2">
                    <Input placeholder="Ingrese su nombre" type="text" className="block w-full"  {...register("name")} />
                    {errors.name && <p className="text-error">{errors.name.message}</p>}
                  </div>
                </div>
                <div className="w-full sm:w-1/2">
                  <label
                    htmlFor="lastName"

                    className="block text-sm font-medium mx-2 leading-6 text-gray-900 "
                  >
                    Apellido *
                  </label>
                  <div className="mt-2">
                    <Input placeholder="Ingrese su apellido" type="text" className="block w-full" {...register("lastName")} />

                    {errors.lastName && <p className="text-error">{errors.lastName.message}</p>}
                  </div>
                </div>
              </div>
               {/* Input de los telefono y DNI */}
               <div className=' flex flex-col sm:flex-row gap-4'>
                <div className="w-full sm:w-1/2">
                  <label
                    htmlFor="phone1"

                    className="block text-sm font-medium mx-2 leading-6 text-gray-900 "
                  >
                    Telefono *
                  </label>
                  <div className="mt-2">
                    <Input placeholder="Ingrese su número" type="text" className="block w-full"  {...register("phone1")} />
                    {errors.phone1 && <p className="text-error">{errors.phone1.message}</p>}
                  </div>
                </div>
                <div className="w-full sm:w-1/2">
                <label
                    htmlFor="dni"

                    className="block text-sm font-medium mx-2 leading-6 text-gray-900 "
                  >
                    DNI *
                  </label>
                  <div className="mt-2" >
                  <Input placeholder="Ingrese su Dni" type="text" className="block w-full"  {...register("dni")} />
                  {errors.dni && <p className="text-error">{errors.dni.message}</p>}
                </div>
               
                </div>
              </div>


              {/* Input del email */}
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="email"

                    className="block text-sm font-medium leading-6 mx-2 text-gray-900 "
                  >
                    Correo electrónico *
                  </label>
                </div>
                <div>
                  <Input placeholder="Ingrese su correo electrónico" type="text" className="block w-full" {...register("email")} />
                  {errors.email && <p className="text-error">{errors.email.message}</p>}
                </div>
              </div>


              {/* Input de la contraseña*/}
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 mx-2 text-gray-900 "
                  >
                    Contraseña *
                  </label>
                </div>
                <div>
                  <InputPassword placeholder="Ingrese su contraseña" className="block w-full" {...register('password')} />
                  {errors.password && <p className="text-error">{errors.password.message}</p>}
                </div>
              </div>

             

              {/* Input del Rol */}
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="role"

                    className="block text-sm font-medium mx-2 leading-6 text-gray-900 "
                  >
                    ROL *
                  </label></div>
                <div className="mt-2">
                  <Options className="block w-full" options={roleOptions} {...register("role")} />
                  {errors.role && <p className="text-error">{errors.role.message}</p>}
                </div>

              </div>

              {/* Boton añadir usuario*/}

              <div className="items-center justify-between">
                <Button
                  type="submit"
                  className="flex w-full justify-center rounded-md px-6 bg-mainBlue py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-hoverBlue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Añadir
                </Button>
              </div>
            </form>

            {/*Boton cancelar*/}
            <Button
              onClick={handleCancel}
              type="button"
              className="flex w-full justify-center rounded-md px-6 bg-white py-1.5 text-sm font-semibold leading-6 text-textBlue "
            >
              Cancelar
            </Button>
          </div>
          </CardWhite>
        </div>
        <Toaster position="top-right" />
    </>
  )
}

export default RegisterUser