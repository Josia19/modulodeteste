const request = require('request').defaults({ jar: true });
const data = require("./config.json")


const account = {
	username: process.env.USERNAME,
	pass: process.env.PASSWORD,
	apiUrl: data.url
}

class MyBotClass {

	constructor(loginTokenRequestParams, csrfToken){

		//template de uma querystring para conseguir um logintoken
		this.loginTokenRequestParams = {
			action: 'query',
			meta: 'tokens',
			type: 'login',
			format: 'json'
		};

		//token csrf
		this.csrfToken = {
			action: 'query',
			meta: 'tokens',
			type: 'csrf',
			format: 'json'
		}

	}

	//test
	aaa(){
		console.log('aaa');
	}

	/**
	 * LER UMA PAGINA
	 * -----------------------------------------------------------------------
	 */

	//ler uma página
	async readPage(title){
		var params = {
			action: 'parse',
			page: title,
			prop: 'wikitext',
			formatversion: 2,
			format: 'json'
		};

		//console.log(params);

		request.get({ url: account.apiUrl, qs: params }, (err, res, body) =>{

			if(err){
				console.log('Erro:', err);

				return;
			}

			body = JSON.parse(body);

			//console.log(body.parse['wikitext']);
			
		});
	}

	/**
	 * EDIÇÃO
	 * -------------------------------------------------------------
	 */

	async editar(titulo, conteudo, sumario){
		const options = this.loginTokenRequestParams;
		const csrfToken = this.csrfToken;

		//conseguir um token de login
		request.get({ url: account.apiUrl, qs: options }, (err, res, body) =>{
			if(err){
				console.log('Erro ao requisitar logintoken:', err);

				return;
			}

			var data = JSON.parse(body);
			console.log('Resposta do login:', data);
			//console.log(data.query.tokens.logintoken);

			//logar o client
			var optionsLogin = {
				action: 'clientlogin',
				username: account.username,
				password: account.pass,
				loginreturnurl: 'https://google.com',
				logintoken: data.query.tokens.logintoken,
				format: 'json'
			}

			request.post({ url: account.apiUrl, form: optionsLogin }, (err, res, body) =>{
				if(err){
					console.log('Erro no Login:', err);

					return;
				}

				//console.log(JSON.parse(body));

				//conseguir um token csrf
				request.get({ url: account.apiUrl, qs: csrfToken }, (err, res, body) =>{
					if(err){
						console.log('Erro ao requisitar token csrf:', err);

						return;
					}

					var data1 = JSON.parse(body);

					//console.log(data1);

					var editOptions = {
						action: 'edit',
						title: titulo,
						appendtext: conteudo,
						summary: sumario,
						minor: false,
						bot: false,
						format: 'json',
						token: data1.query.tokens.csrftoken
					}

					//enviar a edição
					request.post({ url: account.apiUrl, form: editOptions }, (err, res, body) =>{
						if(err){
							console.log('Erro na edição:', err);

							return;
						}

						console.log('Resposta da requisição de edição:', JSON.parse(body));
					});


				});


			});


		});
	}

}

module.exports = MyBotClass;