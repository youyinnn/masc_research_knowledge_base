#### Concepts

1. [Shapley Value](https://en.wikipedia.org/wiki/Shapley_value)
2. Attribution Methods:

   1. Intergrated Gradients
   2. Sampled Shapley

3. Differentiable Model(可微分的模型)
   from: [What are differentiable modules used in deep learning](https://datascience.stackexchange.com/questions/23750/what-are-differentiable-modules-used-in-deep-learning)

   > "Differentiable" means that you can compute the derivative of the operations in the module, and therefore you can compute the gradients of the loss function with respect to the module parameters (i.e. use backpropagation).
   >
   > This is normally a requirement for operations involved in neural network computations.
   >
   > Note: you can use non-differentiable operations as part of a computational graph, but you won't be able to backpropagate gradients through them, and therefore any learnable parameters involved in operations prior to the non-differentiable one would not be able to learn.

4. Instance
   [DIFFUSE - Machine Learning](<http://caia.swin.edu.au/urp/diffuse/ml.html#:~:text=Instance%3A%20An%20instance%20is%20an,by%20a%20number%20of%20attributes.&text=Attributes%20are%20often%20called%20features,(required%20for%20supervised%20learning).>)
   Instance: An instance is an example in the training data. An instance is described by a number of attributes. One attribute can be a class label.
