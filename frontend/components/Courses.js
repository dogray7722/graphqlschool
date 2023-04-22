import { useQuery, gql } from "@apollo/client";
import { DateTime } from "luxon";

const QUERY = gql`
  query courses {
    courses {
      id
      name
      description
      startDate
      instructor {
        id
        firstName
        lastName
      }
    }
  }
`;

export default function Courses() {
  const { data, loading, error } = useQuery(QUERY);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  const courses = data.courses;

  const getDate = (date) => {
    return DateTime.fromMillis(Number(date), { zone: "utc" }).toFormat("DD");
  };

  return (
    <section className="flex flex-col space-y-7">
      {courses.map((course) => (
        <div className="ml-5 mr-5 p-4 bg-slate-200 rounded-xl" key={course.id}>
          <div>
            <h3 className="text-2xl mb-3 text-blue-700">{course.name}</h3>
            <p className="text-xs font-mono mb-3">{course.description}</p>
            <h4 className="text-md">Next Start Date:</h4>
            <p className="text-sm">{getDate(course.startDate)}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
