module.exports = function(sequelize, DataTypes) {
  var Story = sequelize.define("Story", {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    locale: DataTypes.STRING,
    source: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Story.hasMany(models.Message);
      }
    }
  });

  return Story;
};
