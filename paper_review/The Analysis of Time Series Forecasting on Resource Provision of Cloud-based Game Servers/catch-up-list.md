#### Time Series Forecasting

Re: [Time Series Forecasting: Definition, Applications, and Examples](https://www.tableau.com/learn/articles/time-series-forecasting#:~:text=Time%20series%20forecasting%20is%20the,and%20inform%20strategic%20decision%2Dmaking.&text=Forecasting%20then%20takes%20the%20next,might%20happen%20in%20the%20future.)

Time series forecasting is the process of analyzing time series data using statistics and modeling to make predictions and inform strategic decision-making.

#### Resource Provision

##### Under-provisioning

Re: [What is provisioned concurrency?](https://www.virtana.com/glossary/what-is-under-provisioned/#:~:text=Under%2Dprovisioning%2C%20i.e.%2C%20allocating,the%20service%20provider%20loses%20customers.)

Under-provisioning, i.e., allocating fewer resources than required, must be avoided, otherwise the service cannot serve its users with a good service. Under-provisioning the website may make it seem slow or unreachable. Web users eventually give up on accessing it, thus, the service provider loses customers.

##### Over-provisioning

Re: [](https://www.virtana.com/glossary/what-is-over-provisioned/)

Can have many contexts. It could be a host or computing node that has allocated computing resources such as CPU, memory, I/O, disk, or network that are unused at peak times.

In the context of cloud computing, Infrastructure-as-a-Service providers bill every month, but your costs can vary wildly. If you can scale back number of processor cores, RAM, storage capacity or performance, how long the cloud server is actually turned on, availability of features (such as load balancing and auto-scaling), you can save a lot of money.

Cloud computing is one of the important ways to mitigate over-provisioning. In the context of migrations and cloud migrations, there are tools available that can help to right-size your infrastructure. They can offer guidance on which workloads to migrate or not, what are the optimal cloud configurations and vendors, an estimated cloud cost, and how your apps will perform as expected in the cloud.

In the context of storage, overprovisioning of storage derives can be mitigated through the ability to use thin provisioning for virtual disks. Thin provisioning means that when you add a virtual disk to a VM, you can designate it as “Allocate on demand.” If you setup a 100 GB disk for a VM, it might only use 10GB initially for applications and other files but as data grows the disk can grow dynamically to a maximum of 100GB. The downside is that if you’ve setup several VMs with thin provisioned disks and they all grow over time, and they will, then at some point, you’re going to run out of space. Expensive SAN is often wasted on “thick” provisioned disks. It is a tradeoff and you have to measure the risk in your environment and maintain a level of vigilance through disk space and performance monitoring.

#### Service Level Objectives(SLOs)

A service-level objective (SLO) is a key element of a service-level agreement (SLA) between a service provider and a customer. SLOs are agreed upon as a means of measuring the performance of the Service Provider and are outlined as a way of avoiding disputes between the two parties based on misunderstanding.

#### Null Hypothesis & Alternative Hypothesis

Re 1: [About the null and alternative hypotheses](https://support.minitab.com/en-us/minitab/18/help-and-how-to/statistics/basic-statistics/supporting-topics/basics/null-and-alternative-hypotheses/#:~:text=The%20null%20hypothesis%20states%20that,equal%20to%20a%20hypothesized%20value.&text=The%20alternative%20hypothesis%20is%20what,or%20hope%20to%20prove%20true.)

The null and alternative hypotheses are two mutually exclusive statements about a population. A hypothesis test uses sample data to determine whether to reject the null hypothesis.

Null hypothesis (H0)

- The null hypothesis states that a population parameter (such as the mean, the standard deviation, and so on) is equal to a hypothesized value. The null hypothesis is often an initial claim that is based on previous analyses or specialized knowledge.

Alternative Hypothesis (H1)

- The alternative hypothesis states that a population parameter is smaller, greater, or different than the hypothesized value in the null hypothesis. The alternative hypothesis is what you might believe to be true or hope to prove true.

Re 2: [Baidu.baike](https://baike.baidu.com/item/%E9%9B%B6%E5%81%87%E8%AE%BE/8078898?fromtitle=null%20hypothesis&fromid=11260176&fr=aladdin)

在统计学中，零假设（虚无假设）是做统计检验时的一类假设。零假设的内容一般是希望证明其错误的假设。比如说，在相关性检验中，一般会取“两者之间没有关联”作为零假设，而在独立性检验中，一般会取“两者之间有关联”作为零假设。与零假设相对的是备择假设（对立假设），即不希望看到的另一种可能。

从数学上来看，零假设和备择假设的地位是相等的，但是在统计学的实际运用中，常常需要强调一类假设为应当或期望实现的假设。如果一个统计检验的结果拒绝零假设（结论不支持零假设），而实际上真实的情况属于零假设，那么称这个检验犯了第一类错误。反之，如果检验结果支持零假设，而实际上真实的情况属于备择假设，那么称这个检验犯了第二类错误。通常的做法是，在保持第一类错误出现的机会在某个特定水平上的时候，尽量减少第二类错误出现的概率。

Re 3: [统计学之家](http://www.tjxzj.net/2189.html)

> 原假设是研究者想收集证据予以推翻的假设；备择假设是研究者想收集证据予以支持的假设。两种假设在内容上是相互对立的。
>
> 假设检验就是根据样本数据在原假设和备择假设中做出抉择的过程。
>
> 一般而言，我们都是假定原假设中关于总体特征值的表述是正确的，实际上是想通过样本数据推翻原假设，以便用掌握的充分证据支持和接受备择假设，所以我们这才将此过程形象地描述为“概率反证法”。

#### Stationarity of the time series

A stationary time series is one whose properties do not depend on the time at which the series is observed. More precisely, if $\{y_t\}$ is a stationary time series, then for all $s$, the distribution of $(y_t, \dots, y_t+s)$ does not depend on $t$.

Thus, time series with trends, or with seasonality, are not stationary — the trend and seasonality will affect the value of the time series at different times.

#### Long Short-Term Memory

Re: [Wikipedia](https://en.wikipedia.org/wiki/Long_short-term_memory)

**Long short-term memory** (**LSTM**) is an artificial [recurrent neural network](https://en.wikipedia.org/wiki/Recurrent_neural_network) (RNN) architecture[[1\]](https://en.wikipedia.org/wiki/Long_short-term_memory#cite_note-lstm1997-1) used in the field of [deep learning](https://en.wikipedia.org/wiki/Deep_learning).
