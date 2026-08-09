---
category: "GPU & Accelerated Computing Architecture"
icon: "⚡"
dotColor: "#c084fc"
---

<!-- CARD: What are CUDA Cores? -->
<!-- TAGS: CUDA Cores, Core Types -->
- General-purpose and versatile; handles graphics rendering, simulations, and general parallel compute tasks

<!-- CARD: What are RT (Ray Tracing) Cores? -->
<!-- TAGS: RT Cores, Core Types -->
- Graphics specialist; real-time ray tracing, light and shadow rendering

<!-- CARD: Do more cores mean better performance? -->
<!-- TAGS: Core Counts, Common Myth -->
- No, more cores in a GPU family doesn't automatically mean better performance. Architecture generation and core size matter too

<!-- CARD: What are Tensor Cores? -->
<!-- TAGS: Tensor Cores, AI Acceleration -->
- Purpose-built for matrix multiplications, the core math operation behind deep learning training and inference

<!-- CARD: How much faster are Tensor Cores? -->
<!-- TAGS: Tensor Cores, Performance -->
- NVIDIA's cited speedup varies by generation and workload, not one fixed number: up to 12x (Volta training vs. Pascal), up to 20x (Ampere A100 vs. Volta, TF32), up to 30x (Hopper H100 inference vs. Ampere)

<!-- CARD: Where are Tensor Cores present? -->
<!-- TAGS: Tensor Cores, GPU Families -->
- Present in GeForce RTX, professional/data center GPUs (A100, H100), and Jetson; NOT present in GeForce GTX

<!-- CARD: Tensor Cores: Real-World Example -->
<!-- TAGS: Tensor Cores, DLSS -->
- Powers DLSS (Deep Learning Super Sampling) in games like Cyberpunk 2077, upscaling resolution and generating extra frames in real time

<!-- CARD: GeForce GTX: Core Profile -->
<!-- TAGS: GPU Families, Core Counts -->
- CUDA cores only; no Tensor cores, no RT cores

<!-- CARD: GeForce RTX: Core Profile -->
<!-- TAGS: GPU Families, Core Counts -->
- e.g. RTX 4090: 16,384 CUDA cores, 512 Tensor cores, 128 RT cores

<!-- CARD: Data Center GPU: Core Profile -->
<!-- TAGS: GPU Families, Core Counts -->
- Core counts vary widely by generation; all lack RT cores (0): V100 = 5,120 CUDA / 640 Tensor cores, A100 = 6,912 CUDA / 432 Tensor cores, H100 SXM5 = 16,896 CUDA / 528 Tensor cores

<!-- CARD: Jetson (Edge AI): Core Profile -->
<!-- TAGS: GPU Families, Core Counts -->
- Jetson Orin (current flagship, Ampere-based) has CUDA cores, Tensor cores, AND RT cores, e.g. Jetson AGX Orin 64GB: 2,048 CUDA cores, 64 Tensor cores, plus dedicated RT cores for ray tracing

<!-- CARD: Volta architecture -->
<!-- TAGS: Volta, Architecture Gens -->
- V100, the first NVIDIA architecture to introduce Tensor Cores for deep learning acceleration

<!-- CARD: Ampere architecture -->
<!-- TAGS: Ampere, Architecture Gens -->
- A100, powers DGX A100; key features: 3rd-gen Tensor Cores with TF32 (up to 20x over Volta, no code changes needed), structural sparsity (up to 2x), and Multi-Instance GPU (MIG) for partitioning one A100 into up to 7 isolated instances

<!-- CARD: Hopper architecture -->
<!-- TAGS: Hopper, Architecture Gens -->
- H100, introduces the Transformer Engine, which automatically manages FP8/FP16 precision math for transformer models

<!-- CARD: Blackwell architecture -->
<!-- TAGS: Blackwell, Architecture Gens -->
- B100/B200/B300, introduces FP4 (NVFP4) quantization plus a 2nd-generation Transformer Engine
- NVIDIA cites up to 30x faster real-time LLM inference vs. the previous generation, measured at the GB200 NVL72 rack-scale system level (72 GPUs, one NVLink domain) for trillion-parameter MoE models, not a single-chip comparison

<!-- CARD: What is High Bandwidth Memory (HBM)? -->
<!-- TAGS: HBM, GPU Memory -->
- Type of GPU memory built from vertically stacked memory dies, giving much higher bandwidth than traditional GDDR memory in a smaller physical footprint
- Data center GPUs (A100, H100, B200) use HBM because AI models and their activations live in GPU memory during training, and HBM's bandwidth is what feeds thousands of cores fast enough to keep them busy

<!-- CARD: What is TFLOPS? -->
<!-- TAGS: TFLOPS, Performance Metrics -->
- Tera Floating-point Operations Per Second: a measure of raw compute throughput equal to one trillion floating-point calculations per second
- Used to compare GPU performance across generations and precisions (e.g. FP16 vs FP8 TFLOPS), though real-world application speed also depends on memory bandwidth and interconnects, not TFLOPS alone

<!-- CARD: Why GPUs excel at parallel AI workloads (vs CPUs) -->
<!-- TAGS: GPU vs CPU, Fundamentals -->
- CPUs have a small number of powerful cores optimized for fast sequential execution and branching logic; GPUs have thousands of smaller, simpler cores optimized for doing the same operation across massive amounts of data simultaneously
- AI training and inference are dominated by matrix and vector math applied uniformly across huge tensors, a workload pattern that maps directly onto a GPU's massively parallel architecture
