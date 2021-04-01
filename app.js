require('colors');

const {
	inquirerMenu,
	pausa,
	leerInput,
	listadoTareasBorrar,
	confirmar,
	mostrarListadoChecklist
} = require('./helpers/inquirer');
const Tareas = require('./models/Tareas');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');

const main = async () => {
	let opt = '';
	const tareas = new Tareas();

	const tareasDB = leerDB();
	if (tareasDB) {
		//cargar tareas
		tareas.cargarTareasFromArray(tareasDB);
	}

	do {
		// IMPRIMO EL MENU
		opt = await inquirerMenu();

		switch (opt) {
			case '1':
				// CREANDO TAREA
				const desc = await leerInput('Descripcion: ');
				// console.log(desc);
				tareas.crearTarea(desc);
				break;

			case '2':
				// console.log(tareas.listadoArr);
				tareas.listadoCompleto(tareas.listadoArr);
				break;

			case '3':
				tareas.listarPendientesCompletadas(false);
				break;

			case '4':
				tareas.listarPendientesCompletadas(true);
				break;

			case '5': // COMPLETADO | PENDIENTE
				const ids = await mostrarListadoChecklist(tareas.listadoArr);
				tareas.toggleCompletadas(ids);
				break;

			case '6': //BORRAR
				const id = await listadoTareasBorrar(tareas.listadoArr);
				if (id !== '0') {
					const ok = await confirmar('Esta seguro? ');
					if (ok) {
						tareas.borrarTarea(id);
					}
					break;
				}

			default:
				break;
		}

		// GUARDO EN LA BASE DE DATOS
		guardarDB(tareas.listadoArr);

		// PAUSA HASTA EL ENTER
		await pausa();
	} while (opt !== '7');

	console.clear();
};

main();

// NOTAS=======================================================

// const { mostrarMenu, pausa } = require('./helpers/mensajes');

// tareas._listado[tarea.id] = tarea;

// const tareas = new Tareas();
