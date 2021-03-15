const companies = [
    {name: "Company One", category: "Finance", start: 1981, end:2003},
    {name: "Company Two", category: "Retail", start: 1992, end: 2008},
    {name: "Company Three", category: "Auto", start: 1999, end: 2007},
    {name: "Company Four", category: "Retail", start: 1989, end: 2010},
    {name: "Company Five", category: "Technology", start: 2009, end: 2014},
    {name: "Company Six", category: "Finance", start: 1987, end: 2010},
    {name: "Company Seven", category: "Auto", start: 1986, end: 1996},
    {name: "Company Eight", category: "Technology", start: 2011, end: 2016},
    {name: "Company Nine", category: "Retail", start: 1981, end: 1989},
    {name: "Company Ten", category: "Auto", start: 1986, end: 2012}
];

const ages = [33,12,20,16,5,54,21,44,61,13,15,45,25,64,32];

// for (let i = 0; i < companies.length; i++ ){
//     console.log(companies[i].start);
// }


// forEach
// companies.forEach(company => {
//     console.log(company.category);
// })




// filter  21 and older
// let canDrink = [];
// for (let i = 0; i < ages.length; i++) {
//     const element = ages[i];
//     if (element >= 21){
//         canDrink.push(element);
//     }
// }

// const canDrink = ages.filter(age => {if (age>= 21) { return true }});

// const canDrink = ages.filter(age => age >= 21)
// console.log(canDrink);



// filter   companies in retail
// const retailCompanies = companies.filter(function(company){
//     if(company.category === 'Retail') {
//         return true;
//     }
// })

// const retailCompanies = companies.filter(company => company.category === 'Retail');



// filter   companies started in the 80s
// const retailCompanies = companies.filter(({start}) => start >= 1980 && start<= 1989);
// console.log(retailCompanies);


// filter  companies that lasted 10 years and more
// const  lastedTenYears = companies.filter(({start,end}) => (end-start)>=10)
// console.log(lastedTenYears);


// map   companies name
// const nameCompanies = companies.map(({name}) => name);
// console.log(nameCompanies);


// const testMap = companies.map(({name, start, end}) => `${name} [${start} - ${end}]`);
// console.log(testMap);

// const ageMap = ages
//     .map(age => Math.pow(age,2))
//     .map(age => age*2);
// console.log(ageMap);


// sort   companies by his start year
// const sortCompanies = companies.sort(function(c1, c2) {
//     if (c1.start > c2.start){
//         return 1;
//     } else {
//         return -1;
//     }
// });
// const sortCompanies = companies.sort((a,b) => (a.start > b.start ? 1 : -1));
// console.log(sortCompanies);


//sort ages
// const sortAges = ages.sort((a, b) => a - b);
// console.log(sortAges);


// reduce   show su of ages
// let ageSum = 0;
// for (let i = 0; i < ages.length; i++){
//     ageSum += ages[i];
// }
// const ageSum = ages.reduce((total, age) => total + age, 0);
// console.log(ageSum);

// const totalYears = companies.reduce((total, {start, end}) => total + (end - start),0);
// console.log(totalYears);



// combine Methods
// oldest company
const ageCompany = companies.map(({name, start, end}) => { age = end-start;
    return {name, age}
})
.sort((a,b) => b.age - a.age );
console.log(ageCompany[0].name, ageCompany[0].age);