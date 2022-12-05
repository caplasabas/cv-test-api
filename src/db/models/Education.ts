import { BuildOptions, Optional, DataTypes, Model } from 'sequelize';

const { STRING, ENUM, INTEGER } = DataTypes;

import sequelizeConnection from '../config'

import { Education as EducationAttribute } from '../interfaces'

class Education extends Model implements EducationAttribute {
  public id!: number
  public resumeId!: number;
  public schoolName!: string
  public course!: string;
  public yearStart!: string
  public yearEnd!: string

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Education.init({
  id: {
    type: INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  resumeId: {
    type: INTEGER.UNSIGNED,
    allowNull: false
  },
  schoolName: {
    type: STRING,
    allowNull: false
  },
  course: {
    type: STRING,
    allowNull: false
  },
  yearStart: {
    type: STRING,
    allowNull: false
  },
  yearEnd: {
    type: STRING,
    allowNull: false
  },
}, {
  modelName: 'education',
  timestamps: true,
  sequelize: sequelizeConnection,
  paranoid: true
})

export default Education