import { useState, useEffect } from "react";
import TenantForm from "./components/TenantForm";
import TenantList from "./components/TenantList";
import FilterBar from "./components/FilterBar";
import { calculateDaysSince, getRentStatus } from "./utils/dateUtils";
import "./index.css";

export default function App() {
  const [tenants, setTenants] = useState(() => {
    const saved = localStorage.getItem("tenants");
    return saved ? JSON.parse(saved) : [];
  });

  const [editingTenant, setEditingTenant] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tenants", JSON.stringify(tenants));
  }, [tenants]);

  // Save tenant (add new or update existing)
  const handleSave = (tenant) => {
    if (editingTenant) {
      setTenants(
        tenants.map((t) =>
          t.id === editingTenant.id ? { ...tenant, id: t.id, lastPaidDate: t.lastPaidDate || null } : t
        )
      );
      setEditingTenant(null);
    } else {
      setTenants([...tenants, { ...tenant, id: Date.now(), lastPaidDate: null }]);
    }
  };

  // Delete tenant
  const handleDelete = (id) => {
    setTenants(tenants.filter((t) => t.id !== id));
  };

  // Mark rent as paid
  const handleMarkPaid = (id) => {
    setTenants(
      tenants.map((t) =>
        t.id === id
          ? { ...t, lastPaidDate: new Date().toISOString().split("T")[0] }
          : t
      )
    );
  };

  // Filter tenants for search and rent status
  const filteredTenants = tenants.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;

    if (filter === "all") return true;

    const lastDate = t.lastPaidDate || t.entranceDate;
    const days = calculateDaysSince(lastDate);
    const { color } = getRentStatus(days);

    if (filter === "delayed" && days > 30) return true;
    return filter === color;
  });

  return (
    <div className="app">
      <h1>Tenant Rental Tracker</h1>
      <TenantForm
        onSave={handleSave}
        editingTenant={editingTenant}
        onCancel={() => setEditingTenant(null)}
      />
      <FilterBar
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
      />
      <TenantList
        tenants={filteredTenants}
        onEdit={setEditingTenant}
        onDelete={handleDelete}
        onMarkPaid={handleMarkPaid}
      />
    </div>
  );
}
