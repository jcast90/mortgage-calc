//Financial.js
//https://github.com/Ju66ernaut/financial.js
//Financial.js is inspired by Essam Al Joubori's finance.js - http://financejs.org/
//Copyright 2016 Christopher Diaz, MIT license

/**
* @namespace Financial
*/
var Financial = {
    
    // /**
    //  * @namespace Util
    //  * @memberOf Financial
    //  * @type {object}
    //  */
	Util: {
        // /**
        //  * CheckDecimalPercent(number)
        //  * Checks if the input value is a whole percent or decimal
        //  * @alias Util.CheckDecimalPercent
        //  * @memberOf! Util#
        //  * @param {number}
        //  * @returns {number}
        //  */
		CheckDecimalPercent: function(v){
			if(v > 0.99){
				v /= 100;
			}
			return v;
		},
		AnnualRateToMonthlyRate: function(v){
			return v /= 12;
		},
		MonthlyRateToAnnualRate: function(v){
			return v *= 12;
		}
	}
};

/**
* AnnualPercentageYield(number,number)
* Annual Percentage Yield
* Rate of interest earned when taking into consideration the effect of compounding
* if an account is compounded monthly, numberOfTimesCompounded would equal 12
* @memberOf Financial
* @param {number} annualInterestRate
* @param {number} numberOfTimesCompounded (months)
* @returns {number}
*/
Financial.AnnualPercentageYield = function (annualInterestRate, numberOfTimesCompounded){
	var rate = this.Util.CheckDecimalPercent(annualInterestRate);
	return Math.pow((1 + (rate / numberOfTimesCompounded)), numberOfTimesCompounded) - 1;
}

/**
* CompoundInterest(number,number,number)
* Compound Interest
* Calculates the interest earned on an account where the amount earned is reinvested
*
* @param {number} principal
* @param {number} ratePerPeriod
* @param {number} numberOfPeriods
* @returns {number}
*/
Financial.CompoundInterest = function(principal, ratePerPeriod, numberOfPeriods){
	var rate = this.Util.CheckDecimalPercent(ratePerPeriod);
	return principal * (Math.pow((1 + rate), numberOfPeriods) - 1);
}

/**
* LoanPayment(number,number,number)
* Loan Payment
* Calculates monthly payment on a Loan
* @example The monthly payment of a loan with a presentValue (balance) of $15000 at a 4% annual interest rate over 60 months (5 years)

Financial.LoanPayment(15000, 4, 60)
// => 276.24783082898847
* @param {number} presentValue
* @param {number} annualInterestRate
* @param {number} numberOfMonths
* @returns {number}
*/
Financial.LoanPayment = function(presentValue, annualInterestRate, numberOfMonths){
	var rate = this.Util.CheckDecimalPercent(annualInterestRate);
	var monthlyInterestRate = rate / 12;
	return presentValue * monthlyInterestRate / (1 - (Math.pow(1 + monthlyInterestRate, -numberOfMonths)));
}

/**
* SimpleInterest(number,number,number)
* Simple Interest
* Calculates the interest accrued on a loan or savings account that has simple interest
* time is in years
*
* @param {number} principal
* @param {number} annualInterestRaterate
* @param {number} time
* @returns {number}
*/
 Financial.SimpleInterest = function(principal, annualInterestRaterate, time){
	var rate = this.Util.CheckDecimalPercent(annualInterestRaterate);
	return principal * rate * time;
}

/**
* DebtToIncomeRatio(number,number)
* Debt To Income Ratio
* Calculates the debt to income ratio
* @example A monthly income of $8000 and a monthly debt of 2500

Financial.DebtToIncomeRatio(2500, 8000);
// => 0.3125 (~31%)
* @param {number} monthlyDebtPayments
* @param {number} monthlyIncome
* @returns {number}
*/
 Financial.DebtToIncomeRatio = function(monthlyDebtPayments, monthlyIncome){
	return monthlyDebtPayments / monthlyIncome;
}

/**
* Mortgage(number,number,number)
* Mortgage Payment
* Calculates mortgage payment (number of periods is in months)
* @example A mortgage with a principal balance of 350000 paid over 360 months (30 years) at an interest rate of 4%    
 
Financial.Mortgage(350000, 4, 360); 
// => 1670.953534129085
* @param {number} principal
* @param {number} annualInterestRate
* @param {number} numberOfPeriods
* @returns {number}
*/
 Financial.Mortgage = function(principal, annualInterestRate, numberOfPeriods){
	var rate = this.Util.CheckDecimalPercent(annualInterestRate);
	var monthlyInterestRate = rate / 12;
	var t = monthlyInterestRate * Math.pow((1 + monthlyInterestRate), numberOfPeriods);
	var b = Math.pow((1 + monthlyInterestRate), numberOfPeriods) - 1;
	return principal * (t/b);
}


/**
* FutureValue(number,number,number)
* Future Value
* Calculates Future Value of an amount
*
* @param {number} presentValue
* @param {number} monthlyInterestRate
* @param {number} numberOfMonths
* @returns {number}
*/
Financial.FutureValue = function(presentValue, monthlyInterestRate, numberOfMonths){
	return presentValue * Math.pow((1 + monthlyInterestRate), numberOfMonths);
}



/**
* PresentValue(number,number,number)
* Present Value
* Calculates Present Value of an amount
*
* @param {number} presentValue
* @param {number} monthlyInterestRate
* @param {number} numberOfMonths
* @returns {number}
*/
Financial.PresentValue = function(futureValue, ratePerPeriod, numberOfPeriods){
    var rate = this.Util.CheckDecimalPercent(ratePerPeriod);
    
    return futureValue / Math.pow((1 + rate), numberOfPeriods);
}


/**
* ReturnOnInvestment(number,number)
* Return on Investment
* Calculates Return on Investment
*
* @param {number} earnings
* @param {number} initialInvestment
* @returns {number}
*/
Financial.ReturnOnInvestment = function(earnings, initialInvestment){
    return (earnings - initialInvestment) / initialInvestment;
}

/**
* RuleOf72(number)
* Rule of 72
* Calculates the rule of 72 (years to double money)
* Use whole number percent for this calculation
*
* @param {number} annualInterestRate
* @returns {number}
*/
Financial.RuleOf72 = function(annualInterestRate){
    return 72 / annualInterestRate;
}

/**
* CashFlow(number, number)
* Cash Flow
* Calculates cash flow based on income and expenses
*
* @param {number} income
* @param {number} expenses
* @returns {number}
*/
Financial.CashFlow = function(income, expenses){
    return income - expenses
}

/**
* InflationAdjustedReturn(number, number)
* Inflation Adjusted Return
* Calculates the return of an investment after adjusted for inflation
*
* @param {number} investmentReturn
* @param {number} inflationRate
* @returns {number}
*/
Financial.InflationAdjustedReturn = function(investmentReturn, inflationRate){
    var infRate = this.Util.CheckDecimalPercent(inflationRate);
    var invRate = this.Util.CheckDecimalPercent(investmentReturn);
    return 100 * (((1 + invRate) / (1 + infRate)) - 1);
}

/**
 * Gains
 * Calculates Gains or losses in whole percent
 * 
 * @param {number} marketPrice
 * @param {number} purchasePrice
 * @returns {number}
 */
Financial.Gains = function(marketPrice, purchasePrice){
	return ((marketPrice - purchasePrice) / purchasePrice) * 100;
}


if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Financial;
  }
}
