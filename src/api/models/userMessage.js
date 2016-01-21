module.exports = function(sequelize, DataTypes) {
  var UserMessage = sequelize.define("UserMessage", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    sent: DataTypes.BOOLEAN,
    message: DataTypes.STRING(1000),
    image: DataTypes.STRING(1000),
    sendDate: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        UserMessage.belongsTo(models.User);
      }
    }
  });

  return UserMessage;
};
