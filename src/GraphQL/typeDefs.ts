export default `#graphql
  type Resume {
    id: ID!
    profilePic: String!
    fullName: String!
    position: String!
    address: String!
    contact: String!
    education: [Education]
    experiences: [Experience]
    createdAt: String!
    updatedAt: String!
  }

  type Education {
    id: ID!
    resumeId: String!
    schoolName: String!
    course: String!
    yearStart: String!
    yearEnd: String!
    createdAt: String!
    updatedAt: String!
  }

  type Experience {
    id: ID!
    resumeId: String!
    companyName: String!
    position: String!
    yearStart: String!
    yearEnd: String!
    createdAt: String!
    updatedAt: String!
  }

  input CreateResumeInput {
    profilePic: String!
    fullName: String!
    position: String!
    address: String!
    contact: String!
    experience: [CreateExperienceInput]
    education: [CreateEducationInput]
  }

  input CreateEducationInput {
    schoolName: String!
    course: String!
    yearStart: String!
    yearEnd: String!
  }

  input CreateExperienceInput {
    companyName: String!
    position: String!
    yearStart: String!
    yearEnd: String!
  }

  input UpdateResumeInput {
    fullName: String
    position: String
    address: String
    contact: String
    experience: [CreateExperienceInput]
    education: [UpdateEducationInput]
  }

  input UpdateExperienceInput {
    companyName: String
    position: String
    yearStart: String
    yearEnd: String
  }

  input UpdateEducationInput {
    schoolName: String
    course: String
    yearStart: String
    yearEnd: String
  }


  type Query {
    resumes: [Resume]
    resume(id: ID!): Resume
  }

  type Mutation {
    createResume(payload: CreateResumeInput!): Resume!
    updateResume(id: ID!, payload: UpdateResumeInput!): Resume!
    deleteResume(id: ID!): Resume!
  }
`;