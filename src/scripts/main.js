import { createApp } from 'vue';
import { apiLogin } from '/src/scripts/apis.js';
// console.log(apiLogin);
/** end of import */

// Main
// console.dir(Vue)

const loginApp = createApp({
	data() {
		return {
			user: {
				username: '',
				password: ''
				/**
				 * #NOTE:
				 * must defined the value
				 */
			},
			/** end of user */
			hintMsg: 'Hi Vue!'
		};
		/** end of return */
	},
	/** end of data() */

	methods: {
		printMsg(message) {
			this.hintMsg = message;
		},
		/** end of printMsg() */
		/** end of checkLogin() */

		login() {
			this.printMsg('驗證中');
			// post -> token -> cookie -> window
			const user = this.user;

			apiLogin(user)
				.then((response) => {
					// console.dir(response);
					const { success, message } = response.data;
					if (!success) {
						throw new Error(message);
					}

					this.printMsg(message);
					const { token, expired } = response.data;
					const MAX_AGE = 30;

					document.cookie = `W2VUE3=${token}; 
						expires=${new Date(expired)}; 
						max-age=${MAX_AGE}; path=/; 
						SameSite=Lax; Secure; 
					`;

					window.location = 'desk.html';
				})
				.catch((error) => {
					// console.dir(error);
					const { data } = error.response;
					// hintMsg = data.message;
					this.printMsg(data.message);
				});
		}
		/** end of login() */
	},
	/** end of methods: {} */

	mounted() {
		console.warn('mounted-Main');
		// const user = this.user;
		// console.log(user, '!');
		// console.log(document.cookie);
	}
	/** end of mounted() */
});
// }).mount('#loginApp')
/** end of loginApp */
loginApp.mount('#app');

/** end of runVue(Vue) */
