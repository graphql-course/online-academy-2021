import data from "./../data";

const typesResolver = {
  Data: {
    __resolveType(obj: {name: string, title: string}){
        if(obj.name){
          return 'Student';
        }
        if(obj.title){
          return 'Course';
        }
        return null; // GraphQLError is thrown
      },
  },
  Student: {
    /** root, args, context, info*/
    courses: (root: { courses: Array<string> }) => {
      return data.courses.filter(
        (course) => root.courses.indexOf(course.id) > -1
      );
    },
  },
  Course: {
    path: (root: { path: string }) => `https://udemy.com/course${root.path}`,
    students: (root: { id: string }) => {
      return data.students.filter(
        (student) => student.courses.indexOf(root.id) > -1
      );
    },
  },
};

export default typesResolver;
