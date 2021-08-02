import data from '../data';
import { IStudent, ICourse } from './../interfaces';
const queryResolvers = {
    Query: {
      hello(): string {
        return "Hola a todo el mundo";
      },
      helloWithName(
        _: object,
        args: { name: string },
        __: object,
        info: object
      ): string {
        console.log(info);
        return `Hola ${args.name}`;
      },
      peopleNumber(): number {
          return 1;
      },
      students(): {
        status: boolean;
        message: string;
        list: Array<IStudent>
      } {
        return {
          status: true,
          message: 'Lista correctamente cargada',
          list: data.students
        }
      },
      student(_: object, args: {id: string}): {
        status: boolean;
        message: string;
        item: IStudent | null
      } {
        const student = data.students.filter(
          (value) => value.id === args.id
        )[0]
        return {
          status: student === undefined ? false : true,
          message: student === undefined ? 
                  `Estudiante ${args.id} no se ha encontrado` :
                  `Estudiante ${args.id} se ha encontrado`,
          item: student === undefined ? null : student,
        };
      },
      courses(): {
        status: boolean;
        message: string;
        list: Array<ICourse>
      } {
        return {
          status: true,
          message: 'Lista correctamente cargada',
          list: data.courses
        }
      },
      course(_: object, args: {id: string}): {
        status: boolean;
        message: string;
        item: ICourse | null
      } {
        const course = data.courses.filter(
          (value) => value.id === args.id
        )[0]
        return {
          status: course === undefined ? false : true,
          message: course === undefined ? 
                  `Curso ${args.id} no se ha encontrado` :
                  `Curso ${args.id} se ha encontrado`,
          item: course === undefined ? null : course,
        };
      },
    },
  };

  export default queryResolvers;
