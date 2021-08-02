import { ICourse } from './../interfaces/course.interface';
import data from './../data';

const mutationResolvers = {
    Mutation: {
        addCourse(_:object, args: {course: ICourse}): {
            status: boolean,
            message: string,
            item?: ICourse | undefined
        } {
            // Validar antes de introducir
            // Si existe, no se puede añadir
            if (data.courses.filter(
                (courseItem: ICourse) => courseItem.title === args.course.title
            ).length > 0) {
                // Existe ese valor
                return {
                    status: false,
                    message: `Ya existe el curso ${args.course.title}. Prueba con otro por favor`
                }
            }

            // Si el titulo no existe, se puede añadir
            const idValue = +data.courses[data.courses.length - 1].id + 1;
            args.course.id = String(idValue);
            data.courses.push(args.course);
            return {
                status: true,
                message: `Curso con título ${args.course.title} añadido correctamente`,
                item: args.course
            };
        },
        updateCourse(_:object, args: {course: ICourse}): {
            status: boolean,
            message: string,
            item?: ICourse | undefined
        } {
            // Buscar si existe el curso por título, si existe, para adelante
            if (data.courses.filter(
                (courseItem: ICourse) => courseItem.id === args.course.id
            ).length === 0) {
                // NO Existe ese valor
                return {
                    status: false,
                    message: `NO existe el curso ${args.course.title}. Prueba con otro por favor para actualizar.`
                }
            }

            for (let i = 0; i < data.courses.length; i++) {
                if (data.courses[i].id === args.course.id) {
                    data.courses[i] = args.course;
                    break;
                }
            }
            return {
                status: true,
                message: `Actualizado correctamente ${args.course.title}`,
                item: args.course
            }
        },
        deleteCourse(_: object, args: { id: string }): {
            status: boolean,
            message: string
        } {
            let deleteItem = false;
            for (let i = 0; i < data.courses.length; i++) {
                if (data.courses[i].id === args.id) {
                    data.courses.splice(i, 1);
                    deleteItem = true;
                    break;
                }
            }
            return {
                status: deleteItem,
                message: deleteItem ? 'Eliminado' : 'No se ha eliminado nada'
            }
        }
    }
}

export default mutationResolvers;