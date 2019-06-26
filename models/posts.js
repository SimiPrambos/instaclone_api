'use strict'
module.exports = (sequelize, DataTypes) => {
	const posts = sequelize.define('posts', {
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'user',
				key: 'id'
			}
		},
		media_url: DataTypes.STRING,
		caption: DataTypes.STRING
	}, {
			modelName: 'posts',
			underscored: true,
			sequelize
		})
	posts.associate = function (models) {
		posts.belongsTo(models.user, {
			foreignKey: 'user_id',
			onDelete: 'CASCADE'
		})
	}
	return posts
}
