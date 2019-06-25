'use strict'
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('users', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			username: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true
			},
			email: {
				type: Sequelize.STRING
			},
			password: {
				type: Sequelize.STRING
			},
			is_active: {
				type: Sequelize.BOOLEAN
			},
			first_name: {
				type: Sequelize.STRING
			},
			last_name: {
				type: Sequelize.STRING
			},
			profile_pic_url: {
				type: Sequelize.STRING
			},
			privacy_level: {
				type: Sequelize.BOOLEAN
			},
			last_ip: {
				type: Sequelize.STRING
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE
			}
		})
	},
	// eslint-disable-next-line no-unused-vars
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('users')
	}
}
