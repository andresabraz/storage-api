module.exports = (sequelize, DataTypes) => {
  const Storage = sequelize.define('Storage', {
    name: DataTypes.STRING,
    size: DataTypes.INTEGER,
    key: DataTypes.STRING,
    url: DataTypes.STRING,
  });

  return Storage;
};
