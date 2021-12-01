import * as React from "react";
import { useRef } from "react";
import Chart from "react-apexcharts";




export const ChartComp: React.FC<{ data:any, categories:any, annotation:string, title:string}> = (props) => {
  
  //const [data, updateData] = React.useState([0, 1, 2, 3, 4, 5, 6]);

    const options = {
      chart: {
        id: "basic-bar",
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: props.categories,
      },
      annotations: {
        yaxis: [
          {
            y: `${props.annotation}`,
            borderColor: "red",
            label: {
              borderColor: "#00E396",
              orientation: "vertical",
            },
          },
        ],
      },
      dataLabels: {
        enabled: false,
      },
    };

    const series= [
      {
        name: props.title,
        data: props.data,
      }
    ];

 

  

   

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            
            
            options={options}
            series={series}
            type="bar"
            width="100%"
            height="300px"
          />
        </div>
      </div>
    </div>
  );

};

