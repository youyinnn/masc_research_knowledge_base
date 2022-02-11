### Chapter 7

#### Marginal Effect

source: [Marginal Effects: Definition](https://www.statisticshowto.com/marginal-effects/)

Marginal effects tells us how a dependent variable (outcome) changes when a specific independent variable (explanatory variable) changes. Other covariates are assumed to be held constant. Marginal effects are often calculated when analyzing regression analysis results.

The marginal effects for binary variables measure discrete change. For continuous variables, they measure the instantaneous rate of change. Both are typically calculated using software packages such as STATA.

For an independent variable x, we can define the marginal effect to be the partial derivative, with respect to x, of the prediction function f. The derivative (from calculus) gives us the rate of change over an interval which is very, very small—approaching 0.

#### Quantile

The word “quantile” comes from the word **[quantity](https://en.wiktionary.org/wiki/quantile#Etymology)**. In simple terms, a quantile is where a [sample ](https://www.statisticshowto.com/sample/)is divided into equal-sized, adjacent, subgroups (that’s why it’s sometimes called a “[fractile](https://www.statisticshowto.com/fractile-simple-definition/)“). It can also refer to dividing a [probability distribution](https://www.statisticshowto.com/probability-and-statistics/statistics-definitions/probability-distribution/) into areas of equal [probability](https://www.statisticshowto.com/probability-and-statistics/probability-main-index/).

##### How to find it?

**Sample question:** Find the number in the following set of data where 20 percent of values fall below it, and 80 percent fall above:

> 1 3 5 6 9 11 12 13 19 21 22 32 35 36 45 44 55 68 79 80 81 88 90 91 92 100 112 113 114 120 121 132 145 146 149 150 155 180 189 190

Step 1: **Order** the data from smallest to largest. The data in the question is already in ascending order.

Step 2: Count how many observations you have in your data set. this particular data set has 40 items.

Step 3: Convert any percentage to a decimal for “q”. We are looking for the number where 20 percent of the values fall below it, so convert that to 0.2.

Step 4: Insert your values into the formula:

> ith observation = q (n + 1)
> ith observation = 0.2 (40 + 1) = 8.2

**Answer**: The ith observation is at 8.2, so we round down to 8 (remembering that this formula is an estimate). The 8th number in the set is 13, which is the number where 20 percent of the values fall below it.



#### Pearson Correlation Coefficient

....

