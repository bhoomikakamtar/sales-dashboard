const chartCtx = document.getElementById('salesChart').getContext('2d');

const data = [
  { region: "North", product: "Laptop", sales: 150 },
  { region: "North", product: "Mobile", sales: 90 },
  { region: "South", product: "Laptop", sales: 100 },
  { region: "South", product: "Mobile", sales: 120 },
];

let chart;

function updateChart(region, product) {
  const filtered = data.filter(item =>
    (region === "All" || item.region === region) &&
    (product === "All" || item.product === product)
  );

  const labels = filtered.map(item => `${item.region} - ${item.product}`);
  const salesData = filtered.map(item => item.sales);

  if (chart) chart.destroy();

  chart = new Chart(chartCtx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Sales ($k)',
        data: salesData,
        backgroundColor: '#4CAF50',
        borderRadius: 8,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true }
      }
    }
  });
}

document.getElementById("regionSelect").addEventListener("change", () => {
  const region = document.getElementById("regionSelect").value;
  const product = document.getElementById("productSelect").value;
  updateChart(region, product);
});

document.getElementById("productSelect").addEventListener("change", () => {
  const region = document.getElementById("regionSelect").value;
  const product = document.getElementById("productSelect").value;
  updateChart(region, product);
});

window.onload = () => {
  updateChart("All", "All");
};
