'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class room extends Model {
    static associate(models) {
      this.hasMany(models.Message, {
        foreignKey: 'room',
        as: 'messages',
      });
    }

    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      };
    }
  }

  room.init(
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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Room',
      tableName: 'rooms',
      timestamps: true,
      indexes: [{unique: true, fields: ['uuid']}],
    }
  );

  return room;
};
