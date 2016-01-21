module.exports = function(sequelize, DataTypes) {
  var Message = sequelize.define("Message", {
    text: DataTypes.STRING(1000),
    image: DataTypes.STRING(1000),
    siteImage: DataTypes.STRING(1000)
  }, {
    classMethods: {
      associate: function(models) {
        Message.belongsTo(models.Story);
      }
    }
  });

  return Message;
};
