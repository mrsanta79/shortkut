const app = new Vue({
    el: '#app',
    data: {
        url: '',
        slug: '',
        isSubmittable: !false,
        isSubmitting: false,
        data: null,
        isUrlCopied: false,
        isShortenedUrlCopied: false,
    },
    created() {

    },
    methods: {
        preventSpaceInput: function(event) {
            const keyCode = event.keyCode;

            if(keyCode == 32) {
                event.preventDefault();
                return false;
            }
            return true;
        },
        validateUrl: function() {
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
        validateSlug: function() {
            if(this.slug.includes(' ')) {
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
        },
        copyUrl: function(url, type) {
            if(type === 'url') {
                this.isUrlCopied = true;
            } else {
                this.isShortenedUrlCopied = true;
            }
            copyToClipboard(url);
            setTimeout(() => {
                if(type === 'url') {
                    this.isUrlCopied = false;
                } else {
                    this.isShortenedUrlCopied = false;
                }
            }, 2000);
        }
    }
});

const copyToClipboard = function(str) {
    let el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style = { position: 'absolute', left: '-9999px' };
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}