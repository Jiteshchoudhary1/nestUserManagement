import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'user',
  freezeTableName: true, //for exact name as defined we use freezeTableName
  underscored: true, // to maintain better readability we used underscored
  timestamps: true, // this will add two filed automatically created_at and updated_at
  paranoid: true, // this will add deleted_at filed for soft delete
})
export class User extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  sur_name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  user_name: string;

  @Column({ type: DataType.DATEONLY, allowNull: true })
  birth_date: string;

  @Column({ type: DataType.BOOLEAN, allowNull: true, defaultValue: false })
  is_block: boolean;

  @Column({
    type: DataType.VIRTUAL,
    get() {
      const birthDate = this.getDataValue('birth_date');
      if (birthDate) {
        const birthDateObject = new Date(birthDate);
        const ageDifMs = Date.now() - birthDateObject.getTime();
        const ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
      }
      return null;
    },
  })
  age: number;
}
