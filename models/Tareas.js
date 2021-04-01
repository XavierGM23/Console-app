const Tarea = require('./tarea');
const colors = require('colors');

class Tareas {
	_listado = {};

	get listadoArr() {
		const listado = [];
		Object.keys(this._listado).forEach((key) => {
			const tarea = this._listado[key];
			listado.push(tarea);
		});

		return listado;
	}

	constructor() {
		this._listado = {};
	}

	borrarTarea(id = '') {
		if (this._listado[id]) {
			delete this._listado[id];
		}

		console.log(`Tarea eliminada correctamente`.green);
	}

	crearTarea(desc = '') {
		const tarea = new Tarea(desc);
		this._listado[tarea.id] = tarea;
	}

	cargarTareasFromArray(tareas = []) {
		tareas.forEach((tarea) => {
			this._listado[tarea.id] = tarea;
		});
	}

	listadoCompleto(tareas = []) {
		tareas.forEach((tarea, idx) => {
			console.log(
				`${colors.green(idx + 1)}. ${tarea.desc}\t::\t${tarea.completadoEn === null
					? colors.red('Pendiente')
					: colors.green('Completada')}`
			);
		});
	}

	listarPendientesCompletadas(completadas = false) {
		let contador = 0;
		this.listadoArr.forEach((tarea) => {
			if (completadas) {
				if (tarea.completadoEn === null) {
					contador += 1;
					console.log(`${colors.green(contador + '. ')} ${tarea.desc}\t::\t${colors.red('Pendiente')}`);
				}
			} else {
				if (tarea.completadoEn !== null) {
					contador += 1;
					console.log(
						`${colors.green(contador + '. ')} ${tarea.desc}\t::\t${colors.green(tarea.completadoEn)}`
					);
				}
			}
		});
	}

	toggleCompletadas(ids = []) {
		ids.forEach((id) => {
			const tarea = this._listado[id];
			if (!tarea.completadoEn) {
				tarea.completadoEn = new Date().toISOString();
			}
		});

		this.listadoArr.forEach((tarea) => {
			if (!ids.includes(tarea.id)) {
				this._listado[tarea.id].completadoEn = null;
			}
		});
	}
}

module.exports = Tareas;
