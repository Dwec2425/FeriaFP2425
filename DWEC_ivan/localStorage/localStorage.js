localStorage.setItem('nombre', 'John'),
    localStorage.setItem('apellido', 'Doe'),
    localStorage.setItem('edad', 30)

array = [
    localStorage.getItem('nombre'),
    localStorage.getItem('apellido'),
    localStorage.getItem('edad')
];

array.forEach(element => {
    console.log(element);
});
