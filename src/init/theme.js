
const colors = ["#3498db","#9b59b6","#34495e","#95a5a6","#2ecc71","#1abc9c"]

export const randomColor = ()=>{
   return colors[Math.floor(Math.random()*colors.length)];
}
