const fs = require('fs');
const archivo = './db/data.json'; // Extension .txt o .json

const guardarDB = (data) => {
	// ESCRIBO EN EL ARCHIVO DE TEXTO
	fs.writeFileSync(archivo, JSON.stringify(data)); //transforma un objeto a string
};

const leerDB = () => {
	if (!fs.existsSync(archivo)) {
		return null;
	}

	const info = fs.readFileSync(archivo, { encoding: 'utf-8' });
	const data = JSON.parse(info);

	// console.log(data);

	return data;
};

module.exports = {
	guardarDB,
	leerDB
};
