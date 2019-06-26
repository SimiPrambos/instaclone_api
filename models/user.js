'use strict';
module.exports = (sequelize, DataTypes) => {
	const user = sequelize.define('user', {
		username: DataTypes.STRING,
		email: DataTypes.STRING,
		password: DataTypes.STRING,
		is_active: DataTypes.BOOLEAN,
		first_name: DataTypes.STRING,
		last_name: DataTypes.STRING,
		profile_pic_url: DataTypes.STRING,
		privacy_level: DataTypes.BOOLEAN,
		last_ip: DataTypes.STRING
	}, {
			modelName: 'users',
			underscored: true,
			sequelize
		});
	user.associate = function (models) {
		user.hasMany(models.posts, {
			as: 'posts'
		})
	};
	return user;
};
