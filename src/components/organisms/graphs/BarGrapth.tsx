import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Bar } from "react-chartjs-2"; // Barチャートコンポーネントをインポート

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

export const BarChart = () => {
  const data = {
    labels: ["11月", "12月", "1月"], // 月のラベル
    datasets: [
      {
        label: "My First Dataset", // データセットのラベル
        data: [65, 59, 80], // 実際のデータ
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true, // レスポンシブ対応
    plugins: {
      title: {
        display: true,
        text: "月別データの棒グラフ", // タイトル
      },
    },
  };

  return <Bar data={data} options={options} />;
};
