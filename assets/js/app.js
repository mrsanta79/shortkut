const app = new Vue({
    el: '#app',
    data: {
        url: '',
        slug: '',
        isSubmittable: false,
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
        shortenUrl: function() {
            if(!this.validateUrl()) {
                notifier.show('Oops!', 'Please verify the URL', 'danger', '', 7000);
                return false;
            }
            if(this.slug !== '' && !this.validateSlug()) {
                notifier.show('Oops!', 'Please verify the slug', 'danger', '', 7000);
                return false;
            }

            const $form = document.getElementById('form-shorten-url');
            const formUrl = $form.getAttribute('action');
            const data = {
                url: this.url.trim(),
                slug: this.slug.trim()
            }

            this.isSubmitting = true;
            axios.post(formUrl, data)
            .then(response => {
                response = response.data;

                if(!response.success) {
                    notifier.show('Oops!', response.message, 'danger', '', 7000);
                    return false;
                }

                this.data = response.data;
                notifier.show('Success', response.message, 'success', '', 7000);
                this.isSubmitting = false;
            }).catch(err => {
                notifier.show('Oops!', err.response.data.message, 'danger', '', 7000);
                this.isSubmitting = false;
            });
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