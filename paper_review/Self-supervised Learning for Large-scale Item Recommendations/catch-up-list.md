#### Academic

1. Item representation: [Disentangled Item Representation for Recommender Systems](https://dl.acm.org/doi/10.1145/3445811)

2. Multilayer perceptron:

   1. https://en.wikipedia.org/wiki/Multilayer_perceptron#Terminology
   2. https://www.youtube.com/watch?v=u5GAVdLQyIg

3. embedding：

   1. https://www.zhihu.com/question/38002635

   2. https://zhuanlan.zhihu.com/p/46016518

   3. Embeddings：[developers.google.com/machine-learning/crash-course](https://developers.google.com/machine-learning/crash-course/embeddings/video-lecture#:~:text=An%20embedding%20is%20a%20relatively,can%20translate%20high%2Ddimensional%20vectors.&text=Ideally%2C%20an%20embedding%20captures%20some,learned%20and%20reused%20across%20models).

      > An **embedding** is a relatively low-dimensional space into which you can translate high-dimensional vectors. Embeddings make it easier to do machine learning on large inputs like sparse vectors representing words.
      >
      > Ideally, an embedding captures some of the semantics of the input by placing semantically similar inputs close together in the embedding space. An embedding can be learned and reused across models.

   4. [Neural Network Embeddings Explained](https://towardsdatascience.com/neural-network-embeddings-explained-4d028e6f0526)

4. Dropout

   1. [A Gentle Introduction to Dropout for Regularizing Deep Neural Networks](https://machinelearningmastery.com/dropout-for-regularizing-deep-neural-networks/)
   2. [Dropout: A Simple Way to Prevent Neural Networks from Overfitting](https://jmlr.org/papers/volume15/srivastava14a/srivastava14a.pdf)

5. One-hot

6. Softmax:

   1. https://www.zhihu.com/question/23765351

7. hyper-parameter

8. loss function

   1. https://www.youtube.com/watch?v=QBbC3Cjsnjg

9. backbone network:

   1. [wikipedia](https://en.wikipedia.org/wiki/Backbone_network#:~:text=The%20pieces%20of%20the%20network,network%20is%20the%20Internet%20backbone.)

      > The pieces of the network connections (for example: ethernet, wireless) that bring these departments together is often mentioned as network backbone.
      >
      > [Network congestion](https://en.wikipedia.org/wiki/Network_congestion) is often taken into consideration while designing backbones.

   2.

10. precision & recall:

11. https://www.youtube.com/watch?v=qWfzIYCvBqo

12. [Recall and Precision at k for Recommender Systems](https://medium.com/@m_n_malaeb/recall-and-precision-at-k-for-recommender-systems-618483226c54#:~:text=Recall%20at%20k%20is%20the,in%20the%20top%2Dk%20results)

    - > _Precision at k is the proportion of recommended items in the top-k set that are relevant_

      Its interpretation is as follows. Suppose that my precision at 10 in a top-10 recommendation problem is 80%. This means that 80% of the recommendation I make are relevant to the user.

      Mathematically precision@k is defined as follows:

      ```
      Precision@k = (# of recommended items @k that are relevant) / (# of recommended items @k)
      ```

      - > _Recall at k is the proportion of relevant items found in the top-k recommendations_

        Suppose that we computed recall at 10 and found it is 40% in our top-10 recommendation system. This means that 40% of the total number of the relevant items appear in the top-k results.

        Mathematically recall@k is defined as follows:

        ```
        Recall@k = (# of recommended items @k that are relevant) / (total # of relevant items)
        ```

13. [How mean Average Precision at k (mAP@k) can be more useful than other evaluation metrics](https://medium.com/@misty.mok/how-mean-average-precision-at-k-map-k-can-be-more-useful-than-other-evaluation-metrics-6881e0ee21a9)

14. model-agnostic:

    1. [Model-Agnostic Methods for Interpreting any Machine Learning Model](https://towardsdatascience.com/model-agnostic-methods-for-interpreting-any-machine-learning-model-4f10787ef504#:~:text=Interpretable%20models%20are%20models%20who,vector%20machines%20to%20neural%20networks.)

       A lot of research has been done on the interpretability of machine learning models. There are different ways to interpret machine learning models. The easiest split is between interpretable models and model-agnostic methods.

       - Interpretable models are models who explain themselves, for instance from a decision tree you can easily extract decision rules.

       - Model-agnostic methods are methods you can use for any machine learning model, from support vector machines to neural networks.

15. down-sampled

    1. [Imbalanced Data](https://developers.google.com/machine-learning/data-prep/construct/sampling-splitting/imbalanced-data)
