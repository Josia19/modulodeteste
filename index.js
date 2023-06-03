/*

const data = require("./config.json")

const MyBotClass = require('./module.js');  //chama o módulo
newbot = new MyBotClass;   

//newbot.readPage(data.page);

//newbot.editar(data.myPage, 'Lorem ipsum sit Dolor', 'Teste de edição remota usando Javascript');

newbot.readPage(data.myPage);

const MWBot = require("mwbot");

const bot = new MWBot({
	apiUrl: data.url
});

bot.readPage(myPage).then((response) =>{
	console.log(response.query.pages);
});

*/

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	dialect: 'sqlite',
	logging: console.log
});

const Act = sequelize.create('Act', {
	currentAct: DataTypes.STRING,
	allowNull: true
}, {

});

Act.drop();

/*(async () =>{
	await Act.sync({ force: true });
	await console.log('Conexão', Act === sequelize.models.Act);

	const status = await Act.create({ currentAct: "Lorem ipsum dolor sit amet" });

	console.log(status instanceof Act);
	console.log(status.currentAct);
})();*/