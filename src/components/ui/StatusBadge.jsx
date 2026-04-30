export default function StatusBadge({ status }) {
  const color =
    status === "Active" ? "success" :
    status === "Pending" ? "warning" :
    status === "Processing" ? "info" :
    status === "Shipped" ? "primary" :
    status === "Delivered" ? "success" :
    "secondary";

  return <span className={`badge bg-${color}`}>{status}</span>;
}