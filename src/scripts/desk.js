import { createApp } from 'vue';
import { apiLogCheck, apiGetProductList } from '/src/scripts/apis.js';
/** end of import */

/**
 * #TODO:
 * 1_OK
 * mask -> loginChecker() -> !isShow
 *
 * 2_FAIL
 * click -> window.location
 *
 * 3_SAVE-clean-Demo -> no-Axios
 *
 * 4_add-axios -> submit
 *
 * 5_axios-interceptors
 *
 */

/**
 * Do NOT share appData to another Vue-APP
 */
const appData = {
	isLogin: false,
	isMask: true,
	isShowStatus: false,

	hintMsg: 'Hi',
	itemInfo: {},
	products: []
};

const deskApp = createApp({
	data() {
		return appData;
	},
	/** end of data() */

	methods: {
		printMsg(message) {
			this.hintMsg = message;
		},
		/** end of printMsg() */

		showStatus() {
			this.isMask = false;
			this.isShowStatus = true;
		},
		/** end of showStatus() */

		showInfo(item) {
			this.itemInfo = item;
		},
		/** end of showInfo() */

		getProducts() {
			// this.products = []
			// console.log(apiGetProductList);
			apiGetProductList()
				.then((res) => {
					// console.dir(res);
					const { products } = res.data;
					// response.data.products
					if (!this.products) {
						this.isMask = true;
					}
					// statusText
					// this.printMsg(success)
					this.printMsg('Hi');
					this.products = products;
					this.showStatus();
				})
				.catch((err) => {
					const { data } = err.response;
					this.printMsg(data.message);
				});
		},
		/** end of getProducts() */

		loginChecker() {
			// this.getProducts()
			// return this.isLogin
			apiLogCheck()
				.then((res) => {
					this.printMsg(res.data.success);
					this.isLogin = true;
					this.getProducts();
				})
				.catch((err) => {
					// console.dir(err);
					const { data } = err.response;
					this.printMsg(data.message);
				});
		},
		/** end of loginChecker() */

		goHome() {
			// cos page changing fast if api response too slow
			window.location = 'index.html';
		}
		/** end of goHome() */
	},
	/** end of methods: {} */
	computed: {
		modalStyle() {
			return {
				display: this.isMask ? '' : 'none'
			};
		}
		/** end of modalStyle()  */
	},
	/** end of computed: {} */

	mounted() {
		console.warn('mounted-Desk');
		this.printMsg('驗證中');
		this.loginChecker();
	}
	/** end of mounted() */
});

deskApp.mount('#deskApp');

/** end of runVue(Vue) */
