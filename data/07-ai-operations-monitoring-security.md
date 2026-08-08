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
- Scoped to a single node: it has no built-in way to monitor or manage GPUs on remote machines
- Limitations: no native alerting, no historical data storage, and point-in-time snapshots rather than continuous monitoring, so cluster-scale visibility requires a separate tool like DCGM

<!-- CARD: What is NVIDIA DCGM? -->
<!-- TAGS: DCGM, Monitoring -->
- Data Center GPU Manager: suite of tools for monitoring and managing NVIDIA GPUs at cluster scale, tracking GPU health, utilization, memory, and interconnect traffic across many nodes at once
- Built for fleet-wide, always-on telemetry (including Kubernetes environments via dcgm-exporter), distinct from Nsight Systems' deep single-application profiling and nvidia-smi's single-machine snapshot
- Installed separately from the GPU driver, either as a standalone package or via the NVIDIA GPU Operator, with an agent running on each node in the cluster
- Beyond monitoring, manages GPU grouping, power/clock policies, health diagnostics, and alerting thresholds; it's built for monitoring, not for scheduling jobs onto GPUs
- Exposes metrics over CLI and an HTTP endpoint (via dcgm-exporter) for integration with dashboards like Prometheus and Grafana

<!-- CARD: What is NVIDIA Base Command Manager? -->
<!-- TAGS: Base Command Manager, Cluster Management -->
- Licensed software for provisioning, managing, and monitoring HPC and AI clusters at scale, from a handful of nodes up to hundreds of thousands, spanning edge, data center, and cloud deployments
- Broader scope than DCGM: covers the entire AI infrastructure in a data center (compute, storage, network, and workloads), not just GPU health
- Manages GPU firmware, power policies, software updates, cluster provisioning, job scheduling, and workload deployment; for AI/HPC workloads it orchestrates submissions through integrations like Slurm, Kubernetes, and Run:AI
- Offers CLI, web UI, and REST API access, and integrates with monitoring platforms like Prometheus and Grafana
- Distinct from NVIDIA Base Command Platform, a separate cloud-hosted service focused on the AI training workflow rather than cluster provisioning and hardware management

<!-- CARD: What is Slurm? -->
<!-- TAGS: Slurm, Workload Management -->
- Open-source HPC and AI workload manager and job scheduler for Linux clusters, originally developed by SchedMD, which NVIDIA has since acquired
- Used to orchestrate and schedule jobs across NVIDIA DGX SuperPOD and other GPU clusters, with GPU-aware scheduling including topology-aware placement and MIG-based resource requests
- One of the workload orchestration integrations NVIDIA Base Command Manager can hand job submissions off to, alongside Kubernetes and Run:AI

<!-- CARD: What is data drift? -->
<!-- TAGS: MLOps, Model Monitoring -->
- Occurs when the statistical distribution of real-world input data shifts over time, causing a deployed model's predictions to degrade even though the model itself hasn't changed
- Mitigated with continuous production monitoring that tracks input/output distributions and triggers retraining or model updates when drift is detected, rather than assuming a trained model stays accurate indefinitely

<!-- CARD: Job scheduling vs container orchestration -->
<!-- TAGS: Slurm, Kubernetes -->
- Job scheduling (e.g. Slurm) allocates resources for long-running batch jobs like model training; jobs run to completion and aren't kept alive afterward
- Container orchestration (e.g. Kubernetes) manages the lifecycle of always-on, autoscaled services, suited to inference workloads that need consistent uptime and can scale with demand
- Job scheduling is the traditional fit for the training phase of the AI lifecycle and is typically driven by researchers, data scientists, and HPC admins; container orchestration fits the inference/serving phase and is typically driven by DevOps/MLOps/platform engineers

<!-- CARD: What is MLOps? -->
<!-- TAGS: MLOps, DevOps -->
- Applies DevOps principles like CI/CD to machine learning pipelines, aiming to keep ML systems in production continuous, predictable, and secure rather than relying on undocumented, ad hoc processes
- Addresses problems that surface after a model is built: getting it into production reliably, keeping it accurate as real-world data drifts, updating or replacing it without downtime, and ensuring consistent, trustworthy predictions

<!-- CARD: Core MLOps capabilities -->
<!-- TAGS: MLOps, CI/CD -->
- CI/CD pipelines automate the training, validation, and deployment stages of the ML lifecycle
- Event-driven scheduling automatically triggers retraining when new data arrives or on a set cadence
- A model registry version-tracks deployed models, similar to a container registry for Docker images, so teams always know which model version is live in production

<!-- CARD: NVIDIA's MLOps toolchain -->
<!-- TAGS: MLOps, NVIDIA Toolchain -->
- Data prep: RAPIDS and NeMo Curator; training: NVIDIA AI Enterprise, Base Command Platform, and DGX systems; optimization: TensorRT and TAO Toolkit
- Deployment: Triton Inference Server, NIM microservices, Fleet Command, and the NGC Catalog for versioned model artifacts; monitoring: Base Command Manager, Fleet Command, and DCGM; continuous learning: TAO Toolkit and the NeMo framework for automated retraining and fine-tuning
