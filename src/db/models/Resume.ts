import { BuildOptions, DataTypes, Model, Optional } from 'sequelize';

import Education from './Education'
import Experience from './Experience'
import sequelizeConnection from '../config'

const { STRING, TEXT, INTEGER } = DataTypes;

import { Resume as ResumeAttributes } from '../interfaces'

class Resume extends Model implements ResumeAttributes {
  public id!: number
  public profilePic!: string
  public fullName!: string
  public position!: string
  public address!: string
  public contact!: string
  public education: [Education]
  public experience: [Experience]

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Resume.init({
  id: {
    type: INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  profilePic: {
    type: STRING,
    allowNull: false
  },
  position: {
    type: STRING,
    allowNull: false
  },
  fullName: {
    type: STRING,
    allowNull: false
  },
  address: {
    type: TEXT
  },
  contact: {
    type: STRING,
    allowNull: false
  },
}, {
  modelName: 'resume',
  timestamps: true,
  sequelize: sequelizeConnection,
  paranoid: true
})

Resume.hasMany(Education);
Education.belongsTo(Resume);
Resume.hasMany(Experience);
Experience.belongsTo(Resume);

export default Resume