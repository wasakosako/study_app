import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { DecodedToken } from "../../type/atom";
import { json } from "stream/consumers";

// Chart.jsの必要なコンポーネントを登録
ChartJS.register(ArcElement, Tooltip, Legend);

// Doughnutチャートのコンポーネント
export const Report = () => {
  type SubjectProps = {
    name: string;
    status: boolean;
    priority: number;
  };
  useEffect(() => {
    const Token = localStorage.getItem("jwt");
    if (Token === null) return;
    const { username } = jwtDecode<DecodedToken>(Token);

    axios.get(`/proxy/api/fetch/studydata/${username}`).then((res) => {
      const data = res.data;
      console.log(data);
    });
  }, []);
  // const data = {
  //   labels: ["Red", "Blue", "Yellow"],
  //   datasets: [
  //     {
  //       label: "My First Dataset",
  //       data: [300, 50, 100],
  //       backgroundColor: [
  //         "rgb(255, 99, 132)",
  //         "rgb(54, 162, 235)",
  //         "rgb(255, 205, 86)",
  //       ],
  //       hoverOffset: 4,
  //     },
  //   ],
  // };

  // const options = {
  //   responsive: true,
  //   animation: {
  //     animateRotate: true, // グラフの回転をアニメーションさせる
  //   },
  // };

  // return <Doughnut data={data} options={options} />;
  return <div>Report</div>;
};
