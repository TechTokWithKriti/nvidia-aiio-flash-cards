---
category: "AI/ML/DL Fundamentals"
icon: "🧠"
dotColor: "#f472b6"
---

<!-- CARD: What is mixed precision training? -->
<!-- TAGS: Mixed Precision, Training -->
- Uses lower-precision data types (e.g. FP16/BF16) alongside FP32 during training, cutting GPU memory usage and improving performance compared to training in full FP32 precision throughout
- Helps avoid the memory overflow that can occur when training a model at full FP32 precision, without giving up the accuracy that naive low-precision-only training would sacrifice

<!-- CARD: What are the stages of the AI/ML workflow? -->
<!-- TAGS: AI Workflow, MLOps -->
- Data processing: cleaning, transforming, and preparing raw data into a format models can consume; NVIDIA RAPIDS and NVIDIA AI Enterprise accelerate this stage
- Model training: selecting a model architecture and adjusting its parameters against the prepared data, using frameworks like NeMo, PyTorch, or TensorFlow
- Model optimization: refining a trained model's performance and efficiency with techniques like quantization and pruning; NVIDIA TensorRT is purpose-built for this stage
- Deployment: serving the optimized model's predictions to applications or via APIs, commonly through NVIDIA Triton Inference Server

<!-- CARD: What is TensorFlow? -->
<!-- TAGS: TensorFlow, ML Frameworks -->
- Open-source machine learning framework developed by Google, known for its flexibility and strong support for production deployment

<!-- CARD: What is PyTorch? -->
<!-- TAGS: PyTorch, ML Frameworks -->
- Open-source machine learning framework originally developed by Meta (Facebook), known for its dynamic computation graph and ease of use, and popular in academic research
- Governance transferred from Meta to the Linux Foundation's PyTorch Foundation in 2022

<!-- CARD: What is Keras? -->
<!-- TAGS: Keras, ML Frameworks -->
- High-level neural network API that can run on top of TensorFlow, designed for fast experimentation

<!-- CARD: Model training vs model inference -->
<!-- TAGS: Training, Inference -->
- Training builds a model by learning parameters from large datasets over many iterations (forward pass, backward pass, weight updates), needing high compute and memory for weights, optimizer states, and gradients, often distributed across multiple GPUs
- Inference uses a trained model to make predictions on new, unseen data; only the forward pass runs, so compute is lighter and models are often quantized or compressed to reduce memory footprint
- Training optimizes for convergence speed and scalability, scaling horizontally across more GPUs; inference optimizes for response time and throughput, scaling elastically with demand via serverless or auto-scaling infrastructure

<!-- CARD: What are the three types of machine learning? -->
<!-- TAGS: ML Types, Fundamentals -->
- Supervised learning trains on labeled data to predict known outcomes; unsupervised learning finds hidden patterns or groupings in unlabeled data (e.g. clustering customers by purchasing habits); reinforcement learning learns through trial and error, receiving rewards or penalties for actions taken in an environment

<!-- CARD: What is a neural network? -->
<!-- TAGS: Neural Networks, Fundamentals -->
- Computing model loosely inspired by the structure of the human brain: layers of interconnected nodes ("neurons") that transform input data into predictions through weighted connections

<!-- CARD: What makes deep learning different from traditional machine learning? -->
<!-- TAGS: Deep Learning, Fundamentals -->
- Deep learning uses neural networks with many layers ("deep") to automatically learn features directly from raw data, rather than requiring a human to hand-engineer those features as many traditional ML techniques do

<!-- CARD: What are Convolutional Neural Networks (CNNs)? -->
<!-- TAGS: CNN, Neural Network Architectures -->
- Neural network architecture inspired by the visual cortex, using filters that scan across an image to detect spatial patterns; the standard architecture for image recognition and object detection

<!-- CARD: What are Recurrent Neural Networks (RNNs)? -->
<!-- TAGS: RNN, Neural Network Architectures -->
- Neural network architecture built for sequential data like text or time series, where each step's output feeds back in as input to the next step

<!-- CARD: What are Generative Adversarial Networks (GANs)? -->
<!-- TAGS: GAN, Neural Network Architectures -->
- Two neural networks, a generator and a discriminator, trained in competition: the generator creates synthetic data while the discriminator tries to tell it apart from real data, pushing the generator toward increasingly realistic output
- Used for generative tasks like producing synthetic images, such as creating synthetic medical images for training data

<!-- CARD: What is the Transformer architecture? -->
<!-- TAGS: Transformer, LLM Fundamentals -->
- Neural network architecture built around an attention mechanism that weighs the relevance of every other element in a sequence to each element, letting it process sequences in parallel and capture long-range dependencies
- The foundational architecture behind modern large language models, having replaced RNNs as the standard for text and sequence modeling

<!-- CARD: What is generalization in machine learning? -->
<!-- TAGS: Generalization, Fundamentals -->
- A model's ability to perform accurately on new, unseen data, not just the data it was trained on; the goal of training a model rather than having it merely memorize its training set

<!-- CARD: What is data bias in AI models? -->
<!-- TAGS: Bias, Fundamentals -->
- Occurs when the data used to train a model doesn't accurately represent the real-world population it will be applied to, causing the model to produce skewed or unfair predictions

<!-- CARD: What is backpropagation? -->
<!-- TAGS: Backpropagation, Training -->
- Algorithm that calculates the gradient of a model's error with respect to each weight, then updates the weights to reduce that error; the core mechanism by which neural networks learn during training

<!-- CARD: What is hyperparameter tuning? -->
<!-- TAGS: Hyperparameter Tuning, Training -->
- Process of adjusting a model's configuration settings, like learning rate or batch size, that aren't learned from data, to find the combination that produces the best-performing model

<!-- CARD: What is AutoML? -->
<!-- TAGS: AutoML, Automation -->
- Uses AI to automatically search for and optimize a model's architecture and hyperparameters, reducing the manual trial-and-error normally required to design a well-performing model

<!-- CARD: What is transfer learning? -->
<!-- TAGS: Transfer Learning, Fundamentals -->
- Takes a model already trained on one task and fine-tunes it on a new, typically smaller dataset for a different but related task, reusing learned features instead of training from scratch

<!-- CARD: What is Parameter-Efficient Fine-Tuning (PEFT)? -->
<!-- TAGS: PEFT, Fine-Tuning -->
- Fine-tunes a pretrained model by updating only a small subset of its parameters, or a small set of newly added parameters, instead of the full model, cutting the compute and memory cost of adapting large models to new tasks

<!-- CARD: What is zero-shot learning? -->
<!-- TAGS: Zero-Shot Learning, Fundamentals -->
- A model's ability to correctly perform a task it was never explicitly trained on, generalizing from related knowledge learned during training instead of task-specific examples

<!-- CARD: What is model distillation? -->
<!-- TAGS: Model Distillation, Optimization -->
- Trains a smaller, faster "student" model to mimic the behavior and outputs of a larger, more complex "teacher" model, retaining much of the teacher's accuracy at a fraction of its size and inference cost

<!-- CARD: Data parallelism vs model parallelism -->
<!-- TAGS: Distributed Training, Parallelism -->
- Data parallelism copies the full model onto each GPU and splits the training data across them, with each GPU computing gradients on its own shard before they're synchronized
- Model parallelism splits a single large model across multiple GPUs, used when a model is too large to fit in one GPU's memory even with a batch size of one

<!-- CARD: What is feature engineering? -->
<!-- TAGS: Feature Engineering, Data Processing -->
- Process of selecting and transforming raw data into inputs (features) that better represent the underlying problem to a model, improving its ability to learn

<!-- CARD: What is active learning? -->
<!-- TAGS: Active Learning, Data Labeling -->
- Training approach where the model identifies the data points it's most uncertain about and requests human labeling only for those, instead of labeling an entire dataset upfront

<!-- CARD: What is a digital twin? -->
<!-- TAGS: Digital Twin, Simulation -->
- Virtual representation of a physical object, process, or system that mirrors its real-world counterpart's behavior, often used to simulate and test scenarios before applying changes in the real world

<!-- CARD: What is a model zoo? -->
<!-- TAGS: Model Zoo, Fundamentals -->
- Collection of pretrained AI models, often with accompanying code, that developers can use as a starting point for new projects instead of training from scratch
