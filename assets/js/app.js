const app = new Vue({
    el: '#app',
    data: {
        url: "",
        isSubmittable: false
    },
    created() {

    },
    methods: {
        validateUrl: function(event) {
            if(this.url === "") {
                this.isSubmittable = false;
                return false;
            }

            if(this.url.includes(' ')) {
                this.isSubmittable = false;
                return false;
            }

            this.isSubmittable = true;
            return true;
        },
        shortenUrl: async function() {
            if(this.validateUrl()) {
                alert('All Okay');
            } else {
                alert('Something is wrong');
            }
        }
    }
});