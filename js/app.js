Vue.component('value-input', {
    template: `
    <div>
        <label v-if="label"> {{ label }}</label>
        <input
            ref="input"
            v-bind:value="value"
            v-on:input="updateValue($event.target.value)"
            v-on:focus="selectAll"
        >

    </div>
    `,
    props: {
        value: {
            type: Number,
            default: 0
        },
        label: {
            type: String,
            default: ' '
        }
    },
    methods: {

        updateValue: function(value) {
            this.$emit('input', value)
        },

        selectAll: function(event) {
            setTimeout(function() {
                event.target.select()
            }, 0);
        }
    }
})


Vue.component('value-dollar', {
    template: `
    <div>
        <label v-if="label" > {{ label }}</label>
        <input
            ref="input"
            v-bind:value="value"
            v-on:input="updateValue($event.target.value)"
            v-on:focus="selectAll"
            v-on:blur="formatValue"
            :class="{'notValid' : !value}"
        >

    </div>
    `,
    props: {
        value: {
            type: Number,
            default: 0,

        },
        label: {
            type: String,
            default: ' '
        }
    },
    mounted: function() {
        this.formatValue();

    },
    methods: {
        updateValue: function(value) {
            this.$emit('input', value)
        },

        formatValue: function() {
            this.$refs.input.value = new Intl.NumberFormat('usd-USD', {
                style: 'currency',
                currency: 'USD'
            }).format(this.value);

        },

        selectAll: function(event) {
            setTimeout(function() {
                event.target.select()
            }, 0);
        }
    }
})


new Vue({

    el: '#calculator',

    data: {
        houseValue: 1000000,
        downpaymentPercent: 20,
        downpaymentDollar: 0,
        interestRate: 20,
        numberOfYears: 30,


    },

    computed: {
        numberOfMonths: function() {
            return this.numberOfYears * 12;
        },

        newDollar: function() {
            var percent = this.downpaymentPercent;
            var newdollar = (percent / 100) * this.houseValue;
            return newdollar;
        },
        newPercent: function() {
            var dollar = this.downpaymentDollar;
            var newpercent = (dollar / this.houseValue) * 100;
            return newpercent;
        },

        principal: function() {
            var dollar = this.downpaymentDollar;
            return this.houseValue - dollar;

        },

        total: {
            get: function() {
                var calculate = Financial.Mortgage(this.principal, this.interestRate, this.numberOfMonths);
                return this.total = new Intl.NumberFormat('usd-USD', {
                    style: 'currency',
                    currency: 'USD'
                }).format(Math.round(calculate * 100) / 100);
            },
            set: function() {

            }

        }

    },

})
