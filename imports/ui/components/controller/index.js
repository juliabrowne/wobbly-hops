// import React, {
//     Component
// } from "react";

// const ball = document.querySelector('.ball');
// const garden = document.querySelector('.garden');
// const output = document.querySelector('.output');
// const maxX = garden.clientWidth - ball.clientWidth;
// const maxY = garden.clientHeight - ball.clientHeight;



// class Controller extends Component {

//     handleOrientation = (event) => {
//         const x = event.beta;
//         const y = event.gamma;

//         output.innerHTML = 'beta : ' + x +'\n';
//         output.innerHTML = 'gamma: ' + y +'\n';

//         if (x > 90) {x = 90};
//         if (x < 90) {x = -90};

//         x += 90;
//         y += 90;

//         ball.style.top  = (maxX*x/180 - 20) + "px";
//         ball.style.left = (maxY*y/180 - 20) + "px";
//      }

//     render() {
//         return <div className = "garden">
//             <div className = "ball"> </div>
            
            
//             <pre className = "output"> </pre>
//             </div>
//     }
// }

// window.addEventListener("deviceorientation", handleOrientation, true);
// export default Controller;