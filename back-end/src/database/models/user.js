module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, { tableName: 'users', timestamps: false }
);

User.associate = (models) => {
   User.hasMany(models.Sale,
    { foreignKey: 'user_id', as: 'sales' },
    { foreignKey: 'seller_id', as: 'sales' }
  );
};

  return User;
};
