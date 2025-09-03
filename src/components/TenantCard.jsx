import { calculateDaysSince, getRentStatus } from "../utils/dateUtils";

export default function TenantCard({ tenant, onEdit, onDelete, onMarkPaid }) {
  const lastDate = tenant.lastPaidDate || tenant.entranceDate;
  const days = calculateDaysSince(lastDate);
  const { color, label } = getRentStatus(days);

  return (
    <div className="tenant-card" style={{ borderLeft: `6px solid ${color}` }}>
      <h3>{tenant.name}</h3>
      <p>Apartment: {tenant.apartment}</p>
      <p>Room: {tenant.room}</p>
      <p>Rent Amount: ₹{tenant.rent}</p>
      <p>Entrance Date: {tenant.entranceDate}</p>
      <p>Last Paid Date: {tenant.lastPaidDate || "Not Paid Yet"}</p>
      <p className={`status ${color}`}>{label}</p>

      <div className="actions">
        <button className="edit-btn" onClick={() => onEdit(tenant)}>Edit</button>
        <button className="delete-btn" onClick={() => onDelete(tenant.id)}>Delete</button>
        <button className="mark-paid-btn" onClick={() => onMarkPaid(tenant.id)}>Mark as Paid</button>
      </div>
    </div>
  );
}
