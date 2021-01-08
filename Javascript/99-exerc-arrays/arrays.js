const names = ['jose', 'bryan', 'michael','kevin', 'mario'];
const grades = [16, 18, 14, 15, 12];

let obj = [];
names.forEach((element, i) => obj.push({name: element, grade: grades[i]}));

console.log(obj.sort(obj => obj.grade));