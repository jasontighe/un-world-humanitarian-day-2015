module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    givenName: DataTypes.STRING,
    displayName: DataTypes.STRING,
    token: DataTypes.STRING,
    tokenSecret: DataTypes.STRING,
    source: DataTypes.STRING,
    externalId: DataTypes.STRING,
    raw: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.UserMessage);
      }
    }
  });

  return User;
};
