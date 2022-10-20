import crypto from 'crypto';
import { Sequelize, Model, DataTypes } from 'sequelize';

export enum IUserRole {
  ADMIN = 'admin',
  USER = 'user',
}
class User extends Model {
  declare id: number;
  declare username: string;
  declare role: IUserRole;
  declare full_name_eng: string;
  declare full_name_heb: string;
  declare hash: string;
  declare salt: string;

  static validatePassword(
    password: string,
    hash: string,
    salt: string
  ): boolean {
    const hashResults = crypto
      .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
      .toString('hex');

    return hash == hashResults;
  }

  static hashPassword(password: string): any {
    const salt: string = crypto.randomBytes(16).toString('hex');

    const hash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
      .toString('hex');

    return { salt, hash };
  }

  static boot(_sequelize: Sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        role: {
          type: DataTypes.STRING,
          allowNull: true,
          defaultValue: IUserRole.USER,
        },
        hash: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        salt: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        full_name_eng: {
          type: DataTypes.STRING,
          allowNull: true,
          defaultValue: '',
        },
        full_name_heb: {
          type: DataTypes.STRING,
          allowNull: true,
          defaultValue: '',
        },
      },
      {
        sequelize: _sequelize,
        modelName: 'User',
        timestamps: false,
        defaultScope: {
          attributes: { exclude: ['hash', 'salt'] },
        },
        scopes: {
          withPassword: {
            attributes: {
              include: ['hash', 'salt'],
            },
          },
        },
      }
    );

    User.beforeCreate(async (user: User, options) => {
      const hashedPassword = User.hashPassword(user.hash);

      user.salt = hashedPassword.salt;
      user.hash = hashedPassword.hash;
    });
  }
}

export default User;
