import Vue from 'vue';
require('egalink-toasty.js');

class Toast {
    constructor () {
        this.toastDriver = new Toasty();
        this.toastDriver.configure({
            transition: 'pinItUp',
            classname: 'toasty',
            progressBar: true,
        });
    }

    info (title) {
        this.toastDriver.info(title);
    }

    success (title) {
        this.toastDriver.success(title);
    }

    warning (title) {
        this.toastDriver.warning(title);
    }

    error (title) {
        this.toastDriver.error(title);
    }

}

Vue.prototype.$toast = new Toast;
