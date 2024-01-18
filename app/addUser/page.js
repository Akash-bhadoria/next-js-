"use client";
import { useForm } from "react-hook-form";
// import { createNewUser } from "@/actions";
import Modal from "react-modal";
import "./style.css";
import { useState } from "react";

export default function AddUser() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openAddUserModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  async function createNewUser(formData) {
    const response = await fetch("http://localhost:3000/api/addUsers", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async function onSubmit(data) {
    try {
      let res = await createNewUser(data);
      if (res && res.status == 200) {
        setValue("name", "");
        setValue("email", "");
        setValue("mobile", "");
      }
    } catch (error) {
      console.error("Error creating user:", error.message);
    }
  }

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={openAddUserModal}
      >
        ADD USER
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add User Modal"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Name</label>
          <input {...register("name", { required: true })} />
          {errors?.name && <span>This field is required</span>}
          <label>Email</label>
          <input {...register("email", { required: true })} />
          {errors?.email && <span>This field is required</span>}
          <label>Mobile</label>
          <input {...register("mobile", { required: true })} />
          {errors?.mobile && <span>This field is required</span>}
          <input type="submit" />
        </form>
      </Modal>
    </div>
  );
}
