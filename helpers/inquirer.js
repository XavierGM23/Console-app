const inquirer = require('inquirer');
require('colors');

const preguntas = [
	{
		type: 'list',
		name: 'opcion',
		message: 'Que desea hacer?\n',
		choices: [
			{
				value: '1',
				name: `${'1'.red.bold}. Crear Tarea`
			},
			{
				value: '2',
				name: `${'2'.red.bold}. Listar Tareas`
			},
			{
				value: '3',
				name: `${'3'.red.bold}. Listar Tareas Completadas`
			},
			{
				value: '4',
				name: `${'4'.red.bold}. Listar Tareas Pendientes`
			},
			{
				value: '5',
				name: `${'5'.red.bold}. Completar tarea(s)`
			},
			{
				value: '6',
				name: `${'6'.red.bold}. Borrar tarea`
			},
			{
				value: '7',
				name: `${'7'.red.bold}. Salir`
			},
			new inquirer.Separator()
		]
	}
];

const p = [
	{
		type: 'input',
		name: 'pausa',
		message: `\nPresione ${'ENTER'.green} para continuar...\n`
	}
];

const inquirerMenu = async () => {
	console.clear();
	console.log('==========================='.rainbow);
	console.log('   Seleccione una opcion   '.black.bgBrightYellow);
	console.log('==========================='.rainbow);

	const { opcion } = await inquirer.prompt(preguntas);

	return opcion;
};

const pausa = async () => {
	const { pausa } = await inquirer.prompt(p);
	return pausa;
};

const leerInput = async (message) => {
	const question = [
		{
			type: 'input',
			name: 'desc',
			message,
			validate(value) {
				if (value.length === 0) {
					return `${'Por favor ingrese un valor'.red}`;
				} else {
					return true;
				}
			}
		}
	];

	const { desc } = await inquirer.prompt(question);
	return desc;
};

const listadoTareasBorrar = async (tareas = []) => {
	const choices = tareas.map((tarea, i) => {
		const idx = `${i + 1}.`.green;
		return {
			value: tarea.id,
			name: `${idx} ${tarea.desc}`
		};
	});

	choices.unshift({
		value: '0',
		name: '0'.green + ' Cancelar'
	});

	const preguntas_borrar = [
		{
			type: 'list',
			name: 'id',
			message: 'Borrar',
			choices
		}
	];

	const { id } = await inquirer.prompt(preguntas_borrar);
	return id;

	// {
	// 	value: '1',
	// 	name: `${'1'.red.bold}. Crear Tarea`
	// },
};

const confirmar = async (message) => {
	const question = [
		{
			type: 'confirm',
			name: 'ok',
			message
		}
	];

	const { ok } = await inquirer.prompt(question);
	return ok;
};

const mostrarListadoChecklist = async (tareas = []) => {
	const choices = tareas.map((tarea, i) => {
		const idx = `${i + 1}.`.green;
		return {
			value: tarea.id,
			name: `${idx} ${tarea.desc}`,
			checked: tarea.completadoEn ? true : false
		};
	});

	const preguntas_check = [
		{
			type: 'checkbox',
			name: 'ids',
			message: 'Selecciones',
			description: '',
			choices
		}
	];

	const { ids } = await inquirer.prompt(preguntas_check);
	return ids;

	// {
	// 	value: '1',
	// 	name: `${'1'.red.bold}. Crear Tarea`
	// },
};

module.exports = {
	inquirerMenu,
	pausa,
	leerInput,
	listadoTareasBorrar,
	confirmar,
	mostrarListadoChecklist
};
