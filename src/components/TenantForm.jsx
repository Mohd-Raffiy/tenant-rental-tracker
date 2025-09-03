import { useState, useEffect } from "react";

export default function TenantForm({ onSave, editingTenant, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    apartment: "",
    room: "",
    entranceDate: "",
    rent: "",
  });

useEffect(() => {
  if (editingTenant) {
    setFormData(editingTenant);
  } else {
    setFormData({
      name: "",
      apartment: "",
      room: "",
      entranceDate: "",
      rent: "",
    });
  }
}, [editingTenant]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData({ name: "", apartment: "", room: "", entranceDate: "", rent: "" });
  };

  return (
    <form className="tenant-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Tenant Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="apartment"
        placeholder="Apartment Location"
        value={formData.apartment}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="room"
        placeholder="Room No."
        value={formData.room}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="rent"
        placeholder="Rent Amount (₹)"
        value={formData.rent}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="entranceDate"
        value={formData.entranceDate}
        onChange={handleChange}
        required
      />
      <button className="edit-btn" type="submit">{editingTenant ? "Update" : "Add Tenant"}</button>
      {editingTenant && (
        <button type="button" onClick={onCancel} className="cancel-btn">
          Cancel
        </button>
      )}
    </form>
  );
}
