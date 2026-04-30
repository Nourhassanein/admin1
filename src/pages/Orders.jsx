import { useState } from "react";
import { orders } from "../data/orders";
import StatusBadge from "../components/ui/StatusBadge";
import Pagination from "../components/common/Pagination";
import { showToast } from "../utils/toast"; // ✅ ADD THIS

export default function Orders() {

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const perPage = 3;

  const filtered = orders.filter(o =>
    o.customer.toLowerCase().includes(search.toLowerCase()) ||
    o.id.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filtered.slice(
    (page - 1) * perPage,
    page * perPage
  );

  return (
    <div>

      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <div>
          <h6 className="text-muted mb-1">Orders / Order List</h6>
          <h3 className="fw-bold">Order List</h3>
        </div>

        <div className="d-flex gap-2">

          <select className="form-select" style={{ width: 150 }}>
            <option>Date Range</option>
            <option>Today</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>

          <input
            className="form-control"
            placeholder="Search Customer Name/ID"
            style={{ width: 220 }}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />

        </div>
      </div>

      <div className="card shadow-sm border-0">

        <div className="table-responsive">
          <table className="table align-middle mb-0">

            <thead className="bg-light">
              <tr>
                <th>OrderID</th>
                <th>Customer</th>
                <th>Date / Status</th>
                <th>Items</th>
                <th className="text-end">Total</th>
              </tr>
            </thead>

            <tbody>

              {paginated.map((o, i) => (
                <tr key={i}>

                  <td>
                    <b>{o.id}</b><br />

                    {}
                    <small
                      className="text-primary cursor-pointer d-inline-flex align-items-center gap-1"
                      style={{ fontWeight: 500 }}
                      onClick={() =>
                        showToast(
                          `Order Details:\nID: ${o.id}\nCustomer: ${o.customer}\nDate: ${o.date}\nStatus: ${o.status}\nItems: ${o.items}\nTotal: $${o.total}`
                        )
                      }
                    >
                      View Details →
                    </small>

                  </td>

                  <td>{o.customer}</td>

                  <td>
                    {o.date}<br />
                    <StatusBadge status={o.status} />
                  </td>

                  <td>{o.items}</td>

                  <td className="text-end"><b>${o.total}</b></td>

                </tr>
              ))}

              {paginated.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center p-4">
                    No orders found
                  </td>
                </tr>
              )}

            </tbody>

          </table>
        </div>

      </div>

      <Pagination
        page={page}
        setPage={setPage}
        totalPages={Math.ceil(filtered.length / perPage)}
      />

    </div>
  );
}