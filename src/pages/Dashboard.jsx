import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { barDatasetStyle, chartOptions } from "../utils/chartStyles";

// DATA
import { users } from "../data/users";
import { productsData } from "../data/products";
import { orders } from "../data/orders";

ChartJS.register(CategoryScale, LinearScale, BarElement);

export default function Dashboard() {

  const totalUsers = users.length;
  const totalProducts = productsData.length;
  const totalOrders = orders.length;

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  const data = {
    labels: ["1", "5", "10", "15", "20", "25", "30"],
    datasets: [
      {
        label: "Sales",
        data: [500, 800, 1200, 900, 1500, 1800, 2000],
        ...barDatasetStyle
      }
    ]
  };

  return (
    <div className="container-fluid py-3">

      {}
      <div className="mb-4">
        <h3 className="fw-bold mb-1">Dashboard Overview</h3>
        <small className="text-muted">Real-time business performance summary</small>
      </div>

      {}
      <div className="row g-3">

        <div className="col-md-3">
          <div className="card p-3 shadow-sm border-0 rounded-3 hover-card">
            <div className="d-flex justify-content-between">
              <small className="text-muted">Revenue</small>
              <span>💰</span>
            </div>
            <h4 className="fw-bold text-success">${totalRevenue.toFixed(2)}</h4>
            <small className="text-success">▲ 12% this month</small>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 shadow-sm border-0 rounded-3 hover-card">
            <div className="d-flex justify-content-between">
              <small className="text-muted">Orders</small>
              <span>📦</span>
            </div>
            <h4 className="fw-bold">{totalOrders}</h4>
            <small className="text-primary">▲ 5% growth</small>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 shadow-sm border-0 rounded-3 hover-card">
            <div className="d-flex justify-content-between">
              <small className="text-muted">Users</small>
              <span>👤</span>
            </div>
            <h4 className="fw-bold">{totalUsers}</h4>
            <small className="text-warning">▲ New signups</small>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 shadow-sm border-0 rounded-3 hover-card">
            <div className="d-flex justify-content-between">
              <small className="text-muted">Products</small>
              <span>📊</span>
            </div>
            <h4 className="fw-bold">{totalProducts}</h4>
            <small className="text-info">Stable inventory</small>
          </div>
        </div>

      </div>

      {}
      <div className="row mt-4">

        {}
        <div className="col-md-8">
          <div className="card p-3 shadow-sm border-0 rounded-3">

            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0 fw-semibold">Sales Performance</h5>
              <small className="text-muted">Last 30 days</small>
            </div>

            <div style={{ height: "320px" }}>
              <Bar data={data} options={chartOptions} />
            </div>

          </div>
        </div>

        {}
        <div className="col-md-4">

          <div className="card p-3 shadow-sm border-0 rounded-3 mb-3">
            <small className="text-muted">Today Revenue</small>
            <h5 className="fw-bold text-success">
              ${Math.round(totalRevenue / 30)}
            </h5>
          </div>

          <div className="card p-3 shadow-sm border-0 rounded-3 mb-3">
            <small className="text-muted">Avg Order Value</small>
            <h5 className="fw-bold">
              ${(totalRevenue / totalOrders).toFixed(2)}
            </h5>
          </div>

          <div className="card p-3 shadow-sm border-0 rounded-3 mb-3">
            <small className="text-muted">Orders Per User</small>
            <h5 className="fw-bold">
              {(totalOrders / totalUsers).toFixed(1)}
            </h5>
          </div>

          <div className="card p-3 shadow-sm border-0 rounded-3">
            <small className="text-muted">System Status</small>
            <h5 className="fw-bold text-primary">Healthy 🟢</h5>
          </div>

        </div>

      </div>

    </div>
  );
}