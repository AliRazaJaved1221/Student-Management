import React from "react";
import { RxUpdate } from "react-icons/rx";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState, useEffect } from "react";


export default function Users() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [list, setList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem("studentList")) || [];
    setList(storedList);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      const updatedList = list.map((user) =>
        currentUser.id === user.id ? { ...user, name, email } : user,
      );
      localStorage.setItem("studentList", JSON.stringify(updatedList));
      setList(updatedList);
    } else {
      const id = list.length > 0 ? list[list.length - 1].id + 1 : 1;
      const newStudent = { id, name, email };
      const updatedList = [...list, newStudent];
      localStorage.setItem("studentList", JSON.stringify(updatedList));
      setList(updatedList);
      setName("");
      setEmail("");
      setIsEditing(false);
    }
  };

  const handleDelete = (id) => {
    const updatedList = list.filter((student) => student.id !== id);
    localStorage.setItem("studentList", JSON.stringify(updatedList));
    setList(updatedList);
  };

  const handleView = (student) => {
    setCurrentUser(student);
    setIsViewModalOpen(true);
  };

  const handleUpdate = (student) => {
    setIsEditing(true);
    setCurrentUser(student);
    setIsModalOpen(true);
    setName(student.name);
    setEmail(student.email);
  };
  return (
    <div>
      <div>
      <div className="row bg-purple-700 h-20 items-center justify-center">
      <div className="flex text-white h-full items-center justify-between w-full px-5">
      <div className="w-1/2 flex justify-center">
      <img src="logo-s.png" alt="logo" className="h-16 ml-5" />
      </div>
      <div className="w-1/2 flex justify-center">
      <button
        className="bg-purple-300 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded mr-5"
        onClick={() => setIsModalOpen(true)}
      >
        Add New Student
      </button>
    </div>
  </div>
</div>
<div className="flex justify-center mt-10">
<table className="table-fixed border border-green-600 hover:border-green-300 border-separate border-spacing-1 text-center">
  <thead>
  <tr>
    <th className="border border-green-600 hover:border-green-300 hover:text-white px-10 py-4">ID</th>
    <th className="border border-green-600 hover:border-green-300 hover:text-white px-10 py-4">Name</th>
    <th className="border border-green-600 hover:border-green-300 hover:text-white px-10 py-4">Email</th>
    <th className="border border-green-600 hover:border-green-300 hover:text-white px-10 py-4">Action</th>
  </tr>
  </thead>
  <tbody>
  {list.map((a) => {
  
  return (
  <tr key={a.id}>
    <td className="border border-purple-800 px-10 hover:border-purple-300 hover:text-white  py-4">{a.id}</td>
    <td className="border border-yellow-600 px-10 hover:border-yellow-300 hover:text-white py-4">{a.name}</td>
    <td className="border border-green-600 px-10 hover:border-green-300 hover:text-white py-4">{a.email}</td>
    <td className="border border-red-800 hover:border-red-300 px-10 py-4">
    <button className="dlt_icon mr-3 hover:text-red-400" onClick={() => handleView(a)}><FaEye/></button>
    <button className="dlt_icon2 mr-3 hover:text-green-400" onClick={() => handleUpdate(a)}><RxUpdate /></button>
    <button className="dlt_icon3 hover:text-blue-600" onClick={() => handleDelete(a.id)}><MdDelete /></button>
    </td>
    </tr>
    );
    })}
    </tbody>
    </table>
    </div>
    </div>

    <div>
      {isModalOpen && (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-800 bg-opacity-50"
    aria-hidden="true">
    <div className="relative w-full max-w-md p-4">
    <div className="relative bg-purple-500 rounded-lg shadow dark:bg-gray-700">
    <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
    <h3 className="text-xl font-bold text-white dark:text-white">{isEditing ? "Edit Student" : "Add New Student"}</h3>
    <button onClick={() => setIsModalOpen(false)}
    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
    >
    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
    </svg>
    <span className="sr-only">Close modal</span>
    </button>
    
    </div>
    <div className="p-4 md:p-5">
    <form className="space-y-4" onSubmit={handleSubmit}>
    <div>
    <label htmlFor="name" className="block mb-2 text-sm font-medium text-white dark:text-white">Student Name</label>
    <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)}
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
    placeholder="Name" required/>
    </div>
    <div>
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-white dark:text-white">Email</label>
    <input type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
    required/>
    </div>

    <button type="submit" onSubmit={handleSubmit}
    className="w-full text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    {isEditing ? "Update" : "Add User"}</button>
    </form>
    </div>
    </div>
    </div>
    </div>
    )}

    {isViewModalOpen && currentUser && (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-800 bg-opacity-50"
    aria-hidden="true">
    <div className="relative w-full max-w-md p-4">
    <div className="relative bg-purple-500 rounded-lg shadow dark:bg-gray-700">
    <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
    <button onClick={() => setIsViewModalOpen(false)}
    className="text-white hover:bg-purple-800 hover:text-white rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
    </svg>
    <span className="sr-only">Close modal</span>
    </button>
    </div>

    <div className="p-4 md:p-5">
    <form className="space-y-4">
    <div>
    <label htmlFor="name" className="block mb-2 text-sm font-medium text-white dark:text-white">Student Name</label>
    <input type="text" name="name" id="name" value={currentUser.name}
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
    readOnly/>
    </div>
    <div>
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-white dark:text-white">Email</label>
    <input type="text" value={currentUser.email}
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
    readOnly/>
    </div>
    </form>
    </div>
    </div>
    </div>
    </div>
      )}
    </div>
    </div>
  );
}
