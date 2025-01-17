import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [cars, setCars] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    brand: "",
    model: "",
    year: "",
  });
  const navigate = useNavigate();

  // Fetch cars
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/cars", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add new car
  const handleAddCar = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/api/cars", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCars([...cars, response.data]);
      setFormData({ id: "", brand: "", model: "", year: "" });
      alert("Car added successfully!");
    } catch (error) {
      console.error("Error adding car:", error);
      alert("Failed to add car.");
    }
  };

  // Update car
  const handleUpdateCar = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`/api/cars/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCars(
        cars.map((car) => (car.id === id ? { ...car, ...formData } : car))
      );
      setFormData({ id: "", brand: "", model: "", year: "" });
      alert("Car updated successfully!");
    } catch (error) {
      console.error("Error updating car:", error);
      alert("Failed to update car.");
    }
  };

  // Delete car
  const handleDeleteCar = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/cars/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCars(cars.filter((car) => car.id !== id));
      alert("Car deleted successfully!");
    } catch (error) {
      console.error("Error deleting car:", error);
      alert("Failed to delete car.");
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <div className="container">
      <h1>Dashboard</h1>
      {/* Add/Update Form */}
      <form onSubmit={formData.id ? () => handleUpdateCar(formData.id) : handleAddCar}>
        <div>
          <label>Brand</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Enter car brand"
            required
          />
        </div>
        <div>
          <label>Model</label>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            placeholder="Enter car model"
            required
          />
        </div>
        <div>
          <label>Year</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            placeholder="Enter car year"
            required
          />
        </div>
        <button type="submit">
          {formData.id ? "Update Car" : "Add Car"}
        </button>
      </form>

      {/* Cars Table */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.id}>
              <td>{car.id}</td>
              <td>{car.brand}</td>
              <td>{car.model}</td>
              <td>{car.year}</td>
              <td>
                <button
                  onClick={() =>
                    setFormData({
                      id: car.id,
                      brand: car.brand,
                      model: car.model,
                      year: car.year,
                    })
                  }
                >
                  Edit
                </button>
                <button onClick={() => handleDeleteCar(car.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="logout" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
