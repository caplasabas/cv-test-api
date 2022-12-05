import { Resume, Experience, Education } from '../db/models'

export default {
  Query: {
    resumes: async(): Promise<Resume[]> => {
      //Getting all the resumes
      return await Resume.findAll(
        {
          include: [{
            all: true
          }],
        }
      ).then((resumes) => {
        return JSON.parse(JSON.stringify(resumes));
      });
    },
    resume: async (_:any, args: any): Promise<Resume> => {
      //Getting the resumes
      return await Resume.findByPk(
        args.id, 
        {
          include: [{
            all: true
          }],
        }
      ).then((resumes) => {
        return JSON.parse(JSON.stringify(resumes));
      });
    }
  },
  Mutation: {
    createResume: async (_: any,  args: any ): Promise<Resume> => {
      //Creating the base resume
      let resumeResponse = await (await Resume.create(args.payload));

      let resumeId = resumeResponse.id;

      if (args.payload.education) {
         //Assigning the ID of the newly created resume to the resumeId
        let educationPayload = args.payload.education.map((e: any) => {
          e.resumeId = resumeId;
          return e;
        });
  
        //Creating the education for the resume
        await (await Education.bulkCreate(educationPayload));
      }

      if (args.payload.experience) {
        //Assigning the ID of the newly created resume to the resumeId
        let experiencePayload = args.payload.experience.map((e: any) => {
          e.resumeId = resumeId;
          return e;
        });

        //Creating the experience for the resume
        await (await Experience.bulkCreate(experiencePayload));
      }

      //Returning the newly created resume with all the associations
      return await Resume.findByPk(
        resumeId, 
        {
          include: [{
            all: true
          }],
        }
      ).then((resumes) => {
        return JSON.parse(JSON.stringify(resumes));
      });
    },
    updateResume: async (_: any, args: any): Promise<Resume> => {
      //Checking if the resume exists and throwing and error if it does not
      const updatedResume: Resume | null = await Resume.findByPk(args.id)

      if (!updatedResume) throw new  Error('Resume not found')
  
      //Updating the base resume
      await (
        await Resume.update(
          args.payload,
          {
            where: {
              id: args.id
            },
          },
        )
      );

      //Clearing all the education of the resume
      await Education.destroy({where: { resumeId: args.id}})

      if (args.payload.education) {
        //Assigning the ID of the newly created resume to the resumeId
        let educationPayload = args.payload.education.map((e: any) => {
          e.resumeId = args.id;
          return e;
        });
  
        //Creating the education for the resume
        await (await Education.bulkCreate(educationPayload));
      }

      //Clearing all the experience of the resume
      await Experience.destroy({where: { resumeId: args.id}})
  
      if (args.payload.experience) {
        //Assigning the ID of the newly created resume to the resumeId
        let experiencePayload = args.payload.experience.map((e: any) => {
          e.resumeId = args.id;
          return e;
        });
  
        //Creating the experience for the resume
        await (await Experience.bulkCreate(experiencePayload));
      }

      //Returning the newly created resume with all the associations
      return await Resume.findByPk(
        args.id, 
        {
          include: [{
            all: true
          }],
        }
      ).then((resumes) => {
        return JSON.parse(JSON.stringify(resumes));
      });
    },
    deleteResume: async(_: any, args: any): Promise<Resume> => {
      //Checking if the resume exists and throwing and error if it does not
      const deletedResume: Resume | null = await Resume.findByPk(
        args.id, 
        {
          include: [{
            all: true
          }],
        }
      ).then((resumes) => {
        return JSON.parse(JSON.stringify(resumes));
      });

      if (!deletedResume) throw new  Error('Resume not found')

      //Deleting the resume
      await Resume.destroy({where: { id: args.id}})

      return deletedResume;
    }
  }
};