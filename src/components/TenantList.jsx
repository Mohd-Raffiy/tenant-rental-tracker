import TenantCard from "./TenantCard";

export default function TenantList({ tenants, onEdit, onDelete, onMarkPaid }) {
  if (tenants.length === 0) {
    return <p className="empty-msg">No tenants found.</p>;
  }

  return (
    <div className="tenant-list">
      {tenants.map((tenant) => (
        <TenantCard
          key={tenant.id}
          tenant={tenant}
          onEdit={onEdit}
          onDelete={onDelete}
          onMarkPaid={onMarkPaid}
        />
      ))}
    </div>
  );
}
