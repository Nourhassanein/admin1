import { useState } from "react";
import { users } from "../data/users";
import Pagination from "../components/common/Pagination";
import { showToast } from "../utils/toast"; // ✅ ADD THIS

export default function Users() {

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const perPage = 2;

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.id.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filtered.slice(
    (page - 1) * perPage,
    page * perPage
  );

  return (
    <div>

      {}
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <div>
          <h6 className="text-muted mb-1">Customers / Users</h6>
          <h3 className="fw-bold">Users List</h3>
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

      {}
      <div className="card shadow-sm border-0">

        <div className="table-responsive">
          <table className="table align-middle mb-0">

            <thead className="bg-light">
              <tr>
                <th>UserID</th>
                <th>Customer</th>
                <th>Join Date / Status</th>
                <th>Orders</th>
                <th className="text-end">Total Spent</th>
              </tr>
            </thead>

            <tbody>
              {paginated.map((u, i) => (
                <tr key={i} className="border-top">

                  <td>
                    <div className="fw-bold">{u.id}</div>

                    {/* ✅ NOW PROFESSIONAL + TOAST */}
                    <small
                      className="text-primary cursor-pointer"
                      style={{ fontWeight: 500 }}
                      onClick={() =>
                        showToast(
                          `User: ${u.name}\nID: ${u.id}\nOrders: ${u.orders}\nTotal Spent: $${u.total}`
                        )
                      }
                    >
                      View Details →
                    </small>
                  </td>

                  <td>{u.name}</td>

                  <td>
                    <div>{u.joinDate}</div>
                    <span
                      className={`badge ${
                        u.status === "Active"
                          ? "bg-success"
                          : "bg-secondary"
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>

                  <td>{u.orders}</td>

                  <td className="text-end fw-bold">
                    ${u.total}
                  </td>

                </tr>
              ))}

              {paginated.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-muted p-4">
                    No users found
                  </td>
                </tr>
              )}

            </tbody>

          </table>
        </div>

      </div>

      {}
      <Pagination
        page={page}
        setPage={setPage}
        totalPages={Math.ceil(filtered.length / perPage)}
      />

    </div>
  );
}