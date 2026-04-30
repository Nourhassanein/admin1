import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { barDatasetStyle, chartOptions } from "../utils/chartStyles";

// ✅ IMPORT DATA
import { users } from "../data/users";
import { productsData } from "../data/products";
import { orders } from "../data/orders";

ChartJS.register(CategoryScale, LinearScale, BarElement);

export default function Dashboard() {

  // ✅ DYNAMIC STATS
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
    <div>
      <h3 className="mb-4">Dashboard Overview</h3>

      {/* ✅ FIXED CARDS */}
      <div className="row g-3">

        <div className="col-md-3">
          <div className="card p-3">
            Revenue
            <h4>${totalRevenue.toFixed(2)}</h4>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3">
            Orders
            <h4>{totalOrders}</h4>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3">
            Users
            <h4>{totalUsers}</h4>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3">
            Products
            <h4>{totalProducts}</h4>
          </div>
        </div>

      </div>

      {/* ✅ CHART */}
      <div className="row mt-4">
        <div className="col-md-8">
          <div className="card p-3">
            <h5>Sales Performance</h5>
            <Bar data={data} options={chartOptions} />
          </div>
        </div>
      </div>

    </div>
  );
}
