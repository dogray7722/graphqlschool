import { gql } from "apollo-server";

export const typeDefs = gql`
  type Query {
    addresses: [Address]
    address(id: ID!): Address

    courses: [Course]
    course(id: ID!): Course

    instructor(id: ID!): Instructor
    instructors: [Instructor]

    semesters(futureOnly: Boolean): [Semester]
    semester(id: ID!): Semester

    subjects: [Subject]
    subject(id: ID!): Subject

    students(status: STATUS): [Student]
    student(id: ID!): Student
  }

  type Mutation {
    addressCreate(address: AddressInput!): AddressPayload!
    addressUpdate(addressId: ID!, address: AddressInput!): AddressPayload!

    courseCreate(course: CourseInput!): CoursePayload!
    courseUpdate(courseId: ID!, course: CourseInput!): CoursePayload!

    instructorCreate(instructor: InstructorInput!): InstructorPayload!
    instructorAssignSubjects(
      instructorSubject: AssignSubjectInput!
    ): AssignSubjectPayload!
    instructorUpdate(
      instructorId: ID!
      instructor: InstructorInput!
    ): InstructorPayload!

    semesterCreate(semester: SemesterInput!): SemesterPayload!

    studentCreate(student: StudentInput!): StudentPayload!

    subjectCreate(subject: SubjectInput!): SubjectPayload!
    subjectUpdate(subId: ID!, subject: SubjectInput!): SubjectPayload!
    subjectDelete(subId: ID!): SubjectPayload!
  }

  enum STATUS {
    enrolled
    unenrolled
  }

  enum SEASON {
    Spring
    Summer
    Fall
    Winter
  }

  input AssignSubjectInput {
    instructorId: Int!
    subjectIds: [Int!]!
  }

  type Address {
    id: ID!
    streetNumber: Int!
    street: String!
    unit: Int
    city: String!
    state: String!
    zipCode: Int!
  }

  input AddressInput {
    streetNumber: Int
    street: String
    unit: Int
    city: String
    state: String
    zipCode: Int
  }

  type AddressPayload {
    userErrors: [UserError!]!
    address: Address
  }

  type Course {
    id: ID!
    name: String!
    description: String!
    startDate: String
    endDate: String
    courseDays: String
    startTime: String
    duration: String
    semester: Semester
    instructor: Instructor
    subject: Subject
    seats: Int!
  }

  input CourseInput {
    name: String
    description: String
    startDate: String
    endDate: String
    courseDays: String
    startTime: String
    duration: String
    semesterId: ID
    instructorId: ID
    subjectId: ID
    seats: Int
  }

  type CoursePayload {
    userErrors: [UserError!]!
    course: Course
  }

  type Instructor {
    id: ID!
    firstName: String!
    lastName: String!
    address: Address
    subjects: [Subject]
    courses: [Course]
  }

  input InstructorInput {
    firstName: String
    lastName: String
    addressId: Int
  }

  type InstructorPayload {
    userErrors: [UserError!]!
    instructor: Instructor
  }

  type Semester {
    id: ID!
    season: SEASON!
    year: Int!
    courses: [Course]
  }

  input SemesterInput {
    season: SEASON!
    year: Int!
  }

  type SemesterPayload {
    userErrors: [UserError!]!
    semester: Semester
  }

  type Student {
    id: ID!
    firstName: String!
    lastName: String!
    status: STATUS!
    address: Address!
    courses: [Course]
  }

  input StudentInput {
    firstName: String
    lastName: String
    status: STATUS
    addressId: String
  }

  type StudentPayload {
    userErrors: [UserError!]!
    student: Student
  }

  type Subject {
    id: ID
    name: String
    courses: [Course]
  }

  input SubjectInput {
    name: String
  }

  type SubjectPayload {
    userErrors: [UserError!]!
    subject: Subject
  }

  type AssignSubjectPayload {
    userErrors: [UserError]
    assigned: Boolean
  }

  type User {
    id: ID!
    email: String!
    password: String!
    student: Student
    instructor: Instructor
  }
  type UserError {
    message: String!
  }

  input UserInput {
    email: String!
    password: String!
  }
`;
