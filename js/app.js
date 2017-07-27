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
    props:  {
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
        updateValue: function(value){
            this.$emit('input',value)
        },
        results: function(){
             this.total =  Financial.Mortgage(this.principal, this.interestRate, this.numberOfMonths);
        },
        // formatValue: function(){
        //     this.$refs.input.value = new Intl.NumberFormat('usd-USD', {style:'currency', currency:'USD'}).format(currencyValidator.format(this.value))
        //     },
        selectAll: function(event){
            setTimeout(function (){
                event.target.select()
            }, 0);
            }
        }
})


Vue.component('value-dollar', {
    template: `
    <div>
        <label v-if="label"> {{ label }}</label>
        <input
            ref="input"
            v-bind:value="value"
            v-on:input="updateValue($event.target.value)"
            v-on:focus="selectAll"
            v-on:blur="formatValue"
        >

    </div>
    `,
    props:  {
        value: {
            type: Number,
            default: 0
        },
        label: {
            type: String,
            default: ' '
        }
    },
    mounted: function(){
            //this.formatValue();

    },
    methods: {
        updateValue: function(value){
            // var result = currencyValidator.parse(value, this.value);
            // if(result.warning){
            //     this.$refs.input.value = result.value
            // };
            this.$emit('input',value)

        },
        results: function(){
             this.total =  Financial.Mortgage(this.principal, this.interestRate, this.numberOfMonths);
        },
        formatValue: function(){
            this.$refs.input.value = new Intl.NumberFormat('usd-USD', {style:'currency', currency:'USD'}).format(currencyValidator.format(this.value))
            },
        selectAll: function(event){
            setTimeout(function (){
                event.target.select()
            }, 0);
            }
        }
})


var vm = new Vue({

  el: '#calculator',

  data: {
    houseValue: 0,
    downpayment: {
        percent: 20,
        dollar: 0
    },
    interestRate: 20,
    numberOfYears: 30,



  },
  watch: {
    downpayment:{
        percent: 'newPercent',
        dollar: 'newDollar'
        }
    },
  computed: {
    numberOfMonths: function(){
      return this.numberOfYears * 12;
    },
    newDollar: function(){
        var percent = this.downpayment.percent;
        return (percent / 100) * this.houseValue;
    },
    newPercent: function(){
        var dollar = this.downpayment.dollar;
        return (dollar / this.houseValue) * 100;
    },

    principal: function(){
        var dollar = this.downpayment.dollar;

            return this.houseValue - dollar;

    },

    total: function(){
        var calculate =  Financial.Mortgage(this.principal, this.interestRate, this.numberOfMonths);
        return this.total = new Intl.NumberFormat('usd-USD', {style: 'currency', currency:'USD'}).format(Math.round(calculate * 100)/ 100);

    }

 },

})