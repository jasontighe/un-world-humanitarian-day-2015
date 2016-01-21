module.exports = function(sequelize, DataTypes) {
  var Email = sequelize.define("Email", {
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        //Story.hasMany(models.Messages);
      }
    }
  });

  return Email;
};
