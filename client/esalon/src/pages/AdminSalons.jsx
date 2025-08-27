import { useEffect, useState } from "react";
import API from "../utils/api";
import { toast } from "react-toastify";

const AdminSalons = () => {
  const [salons, setSalons] = useState([]);
  const [form, setForm] = useState({ name: "", address: "", location: "" });
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);

  // ✅ Fetch salons
  const fetchSalons = async () => {
    try {
      const res = await API.get("/salons");
      setSalons(res.data);
    } catch {
      toast.error("Failed to load salons");
    }
  };

  useEffect(() => {
    fetchSalons();
  }, []);

  // ✅ Handle Form Input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Handle Create or Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("address", form.address);
    formData.append("location", form.location);
    if (image) formData.append("image", image);

    try {
      if (editingId) {
        await API.put(`/salons/${editingId}`, formData);
        toast.success("Salon updated");
      } else {
        await API.post("/salons", formData);
        toast.success("Salon created");
      }
      setForm({ name: "", address: "", location: "" });
      setImage(null);
      setEditingId(null);
      fetchSalons();
    } catch {
      toast.error("Failed to save salon");
    }
  };

  // ✅ Handle Edit
  const handleEdit = (salon) => {
    setForm({
      name: salon.name,
      address: salon.address,
      location: JSON.stringify(salon.location),
    });
    setEditingId(salon._id);
  };

  // ✅ Handle Delete
  const handleDelete = async (id) => {
    if (!confirm("Delete this salon?")) return;
    try {
      await API.delete(`/salons/${id}`);
      toast.success("Salon deleted");
      fetchSalons();
    } catch {
      toast.error("Failed to delete salon");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Salons</h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-3 bg-white dark:bg-gray-900 p-4 rounded shadow mb-6"
      >
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Salon Name"
          className="border p-2 w-full"
          required
        />
        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
          className="border p-2 w-full"
          required
        />
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder='{"coordinates":[7.4, 9.1]}'
          className="border p-2 w-full"
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="border p-2 w-full"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingId ? "Update Salon" : "Add Salon"}
        </button>
      </form>

      {/* Salon List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {salons.map((salon) => (
          <div
            key={salon._id}
            className="border p-4 rounded shadow bg-white dark:bg-gray-800"
          >
            {salon.image && (
              <img
                src={salon.image}
                alt={salon.name}
                className="w-full h-40 object-cover rounded mb-3"
              />
            )}
            <h3 className="text-lg font-bold">{salon.name}</h3>
            <p>{salon.address}</p>

            <div className="mt-3 flex gap-2">
              <button
                onClick={() => handleEdit(salon)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(salon._id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSalons;
