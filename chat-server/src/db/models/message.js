'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class message extends Model {
    static associate(models) {
      this.belongsTo(models.Room, {
        foreignKey: 'roomId',
        as: 'room',
        onDelete: 'CASCADE',
      });
    }
  }

  message.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      roomId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Message',
      tableName: 'messages',
      timestamps: true,
      indexes: [{unique: true, fields: ['uuid']}],
    }
  );

  return message;
};
