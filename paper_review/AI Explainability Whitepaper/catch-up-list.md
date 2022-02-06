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
