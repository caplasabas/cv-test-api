import { BuildOptions, Optional, DataTypes, Model } from 'sequelize';

const { STRING, INTEGER } = DataTypes;

import sequelizeConnection from '../config'
import { Experience as ExperienceAttribute } from '../interfaces'

class Experience extends Model implements ExperienceAttribute {
  public id!: number
  public resumeId!: number;
  public companyName!: string
  public position!: string
  public yearStart!: string
  public yearEnd!: string

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Experience.init({
  id: {
    type: INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  resumeId: {
    type: INTEGER.UNSIGNED,
    allowNull: false
  },
  companyName: {
    type: STRING,
    allowNull: false
  },
  position: {
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
  modelName: 'experience',
  timestamps: true,
  sequelize: sequelizeConnection,
  paranoid: true
})


export default Experience