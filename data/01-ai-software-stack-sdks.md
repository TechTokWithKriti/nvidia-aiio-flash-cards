---
category: "AI Software Stack & SDKs"
icon: "🧩"
dotColor: "#38bdf8"
---

<!-- CARD: What is NVIDIA DALI? -->
<!-- TAGS: DALI, Data Loading -->
- NVIDIA Data Loading Library: a GPU-accelerated library for loading and preprocessing image, video, and audio data ahead of deep learning training or inference
- Offloads preprocessing (decode, crop, resize, augment) from the CPU to the GPU, removing the CPU-bound data pipeline bottleneck that otherwise limits training throughput
- Drop-in replacement for framework-native data loaders in PyTorch, TensorFlow, and PaddlePaddle

<!-- CARD: What is the NGC Catalog? -->
<!-- TAGS: NGC, Containers -->
- Pre-built, pre-tested, GPU-optimized containers for AI/ML/HPC frameworks (PyTorch, TensorFlow, and others), distributed through NVIDIA's NGC Catalog
- Ensures compatibility and performance on NVIDIA GPUs without users needing to hand-tune driver and library versions themselves

<!-- CARD: What is NVIDIA RAPIDS? -->
<!-- TAGS: RAPIDS, Data Science -->
- Open-source suite of GPU-accelerated data science libraries (cuDF for dataframes, cuML for machine learning, cuGraph for graph analytics, and more) with a pandas-like API
- Accelerates ETL and analytics workloads that would otherwise run on CPU-bound tools like pandas, in some cases with no code changes needed via cuDF's pandas accelerator mode

<!-- CARD: What is DGX OS? -->
<!-- TAGS: DGX OS, Operating System -->
- Customized Linux operating system purpose-built for NVIDIA DGX systems, built on Ubuntu 22.04 in the DGX OS 6 release
- Bundles the software stack needed to run AI/ML workloads out of the box, including GPU drivers, the CUDA Toolkit, cuDNN, NCCL, and Docker Engine, tuned specifically for DGX hardware

<!-- CARD: What do GPU drivers do? -->
<!-- TAGS: GPU Drivers, Fundamentals -->
- Software layer connecting the physical GPU to the operating system and applications, the same basic role any hardware driver plays for its device
- Manages GPU resources, memory allocation, and performance optimization so the OS and applications can actually put the GPU to work on compute or graphics tasks

<!-- CARD: GPU driver key features -->
<!-- TAGS: GPU Drivers, Features -->
- Support containerized workloads and multi-GPU configurations, letting several GPUs work together under one driver stack
- Can be installed manually or come pre-installed on systems built for a specific workload, such as AI/ML training

<!-- CARD: What is CUDA? -->
<!-- TAGS: CUDA, Fundamentals -->
- Compute Unified Device Architecture: NVIDIA's parallel computing platform and API letting developers run general-purpose code on the GPU, not just graphics tasks, unlocking use cases like ML/AI, financial modeling, and image/video processing that GPUs couldn't handle before it existed
- Lets code written in C, C++, Python, or Fortran run as kernels executing in parallel across thousands of GPU cores, with the CPU organizing work and the GPU executing it at scale
- Most developers never write CUDA directly; higher-level frameworks like PyTorch and TensorFlow run on top of it, translating familiar code into GPU-parallel execution behind the scenes

<!-- CARD: What is cuDNN? -->
<!-- TAGS: cuDNN, Deep Learning -->
- CUDA Deep Neural Network library: GPU-accelerated library of low-level deep learning primitives (convolution, pooling, normalization, attention, and more)
- Frameworks like PyTorch and TensorFlow call cuDNN internally to accelerate neural network training and inference; it doesn't manage GPU resources across a cluster, that's a separate concern from libraries like NCCL

<!-- CARD: What is cuBLAS? -->
<!-- TAGS: cuBLAS, Linear Algebra -->
- CUDA Basic Linear Algebra Subroutines: GPU-accelerated implementation of the standard BLAS library for matrix and vector operations
- Optimizes the matrix math underlying deep learning computations, using Tensor Cores for low- and mixed-precision matrix multiplication where available

<!-- CARD: What is TensorRT? -->
<!-- TAGS: TensorRT, Inference -->
- SDK for optimizing trained models specifically for inference, not training; takes models from frameworks like PyTorch and TensorFlow and prepares them for fast, efficient deployment
- Key techniques: precision calibration (running the model in FP16, INT8, FP8, or lower precision to cut memory and compute cost with minimal accuracy loss) and layer fusion (collapsing chains of operations into a single optimized kernel)
- Deploys across hyperscale data centers, workstations, and edge devices like NVIDIA Jetson
