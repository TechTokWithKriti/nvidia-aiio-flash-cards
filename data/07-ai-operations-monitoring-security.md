---
category: "AI Operations, Monitoring & Security"
icon: "🛡️"
dotColor: "#f87171"
---

<!-- CARD: What is NVIDIA Base Command Platform? -->
<!-- TAGS: Base Command, MLOps -->
- Cloud-hosted software service giving data scientists a unified interface to configure, schedule, and monitor AI training workloads across multiple clouds and on-prem infrastructure, plus integrated dataset management
- Distinct from NVIDIA Base Command Manager, which provisions and monitors the underlying HPC/DGX cluster hardware itself rather than managing the AI training workflow

<!-- CARD: What is NVIDIA Nsight Systems? -->
<!-- TAGS: Nsight, Profiling -->
- System-wide performance analysis tool that visualizes CPU and GPU activity (SM utilization, CUDA library traces, OS and network interactions) on a single timeline to surface bottlenecks
- Used to tune how an application scales across however many CPUs and GPUs it runs on, from a single workstation up to a full data center

<!-- CARD: What is nvidia-smi? -->
<!-- TAGS: nvidia-smi, Monitoring -->
- Command-line utility bundled with the NVIDIA driver that reports GPU configuration, utilization, memory usage, and running processes on a system
- The quick way to check what GPU(s) are present and how busy they are, without needing a full profiling tool like Nsight Systems
- Also used to enable MIG mode and create/manage MIG GPU instances on supported data center GPUs
