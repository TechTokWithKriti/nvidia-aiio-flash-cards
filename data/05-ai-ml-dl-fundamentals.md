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
