---
category: "Data Center Physical Infrastructure"
icon: "🖥️"
dotColor: "#f97316"
---

<!-- CARD: What is NVIDIA RTX? -->
<!-- TAGS: RTX, Architecture -->
- Shared GPU architecture (RT cores + Tensor cores + CUDA cores) spanning gaming (GeForce RTX 40/50-series), professional workstations (current: RTX PRO Blackwell Generation, successor to RTX A6000 and RTX 6000 Ada), and data center GPUs (L4, L40)
- Includes hardware and software features for professional visualization, remote rendering, and virtualization

<!-- CARD: What is RTX used for? -->
<!-- TAGS: RTX, Use Cases -->
- Real-time 3D design and visualization workflows, and virtual workstations via NVIDIA virtual workstation software (share one GPU across many users)

<!-- CARD: What is RTX NOT good for? -->
<!-- TAGS: RTX, Limitations -->
- LLM training, HPC workloads, and power/edge-constrained embedded systems (NVIDIA Jetson covers that use case instead)

<!-- CARD: What is the DGX A100? -->
<!-- TAGS: DGX A100, AI Training -->
- NVIDIA's AI system built for training, inference, and analytics workloads; was NVIDIA's flagship system at its 2020 launch, since succeeded by DGX H100 and DGX B200/B300

<!-- CARD: What is the DGX A100 used for? -->
<!-- TAGS: DGX A100, Use Cases -->
- NLP (chatbots, translation), computer vision (image recognition, autonomous navigation), speech (voice recognition, speech-to-text), and HPC/scientific research

<!-- CARD: Who is the DGX A100 built for? -->
<!-- TAGS: DGX A100, Target Audience -->
- Research institutions and enterprise AI teams training large deep learning models; supports multiple concurrent users and workloads

<!-- CARD: DGX A100 design considerations -->
<!-- TAGS: DGX A100, Design -->
- Efficient cooling and reliable power supplies sustain high-throughput, cloud-native/containerized workloads

<!-- CARD: DGX-1 (2016) -->
<!-- TAGS: DGX History, DGX-1 -->
- Dual Intel Xeon E5-2698 v4 CPUs + 8x NVIDIA Tesla P100 GPUs (V100 in the later DGX-1V variant); first-generation DGX system, tailored for AI and deep learning

<!-- CARD: DGX-2 (2018) -->
<!-- TAGS: DGX History, DGX-2 -->
- Dual Intel Xeon Platinum 8168 CPUs + 16x NVIDIA Tesla V100 GPUs; enhanced capacity over DGX-1 for larger workloads

<!-- CARD: DGX A100 (2020) -->
<!-- TAGS: DGX History, Ampere -->
- Dual AMD EPYC 7742 CPUs + NVIDIA A100 GPU (Ampere architecture); optimized for training and inference

<!-- CARD: DGX H100 (2022) -->
<!-- TAGS: DGX History, Hopper -->
- Dual Intel Xeon Platinum 8480C CPUs + NVIDIA H100 GPU (Hopper architecture); built for next-gen AI workloads
- Not to be confused with the GH200 Grace Hopper Superchip, which pairs an NVIDIA Grace CPU directly with a Hopper GPU

<!-- CARD: DGX B200 / DGX B300 (2024-2025) -->
<!-- TAGS: DGX History, Blackwell -->
- Dual Intel Xeon Platinum 8570 CPUs (DGX B200) or dual Intel Xeon 6776P CPUs (DGX B300) + NVIDIA Blackwell/Blackwell Ultra GPUs; DGX B100 was the original 2024 announcement, later superseded by DGX B200
- NVIDIA Grace CPU pairs with Blackwell only in the separate rack-scale GB200/GB300 NVL72 systems, not in DGX B100/B200/B300 servers

<!-- CARD: DGX A100: GPUs & Interconnect -->
<!-- TAGS: DGX A100, Hardware -->
- 8x NVIDIA A100 Tensor Core GPUs, interconnected via NVLink and NVSwitch (hybrid cube-mesh topology) over a PCIe Gen4 host interface, giving full any-to-any GPU-to-GPU communication

<!-- CARD: DGX A100: Storage & Networking -->
<!-- TAGS: DGX A100, Hardware -->
- 15TB of internal NVMe SSD storage (4x 3.84TB U.2 drives) for fast local data access, plus separate M.2 NVMe drives for the OS
- 9 total Mellanox/NVIDIA ConnectX-6 cards: 8x single-port HDR InfiniBand (200Gb/s) for the compute fabric, plus 1 dual-port card (default Ethernet) for storage and management

<!-- CARD: DGX A100: Software Stack -->
<!-- TAGS: DGX A100, Software -->
- Runs DGX OS, a customized Ubuntu build optimized for AI/ML workloads, with NVIDIA GPU drivers, CUDA, cuDNN, and NCCL pre-installed

<!-- CARD: DGX A100: Management & Monitoring -->
<!-- TAGS: DGX A100, Monitoring -->
- Managed and monitored via NVIDIA System Management (nvidia-smi), DCGM, and Base Command Manager

<!-- CARD: DGX On-Premises Deployment -->
<!-- TAGS: DGX Cloud, Deployment -->
- Deployed using NVIDIA reference architecture to meet specific compliance and security needs

<!-- CARD: DGX Cloud -->
<!-- TAGS: DGX Cloud, Deployment -->
- Access to DGX systems through public cloud vendors (AWS, Microsoft Azure, Google Cloud, Oracle) on a pay-as-you-go basis
- Expanded in 2025 via DGX Cloud Lepton, a broader compute marketplace connecting developers to GPU capacity across many providers

<!-- CARD: DGX Cloud Partners -->
<!-- TAGS: DGX Cloud, Deployment -->
- CoreWeave, Crusoe, Firmus, Foxconn, GMI Cloud, Lambda, Nebius, Nscale, SoftBank, and Yotta Data Services; access DGX systems without owning the infrastructure

<!-- CARD: DGX Deployment Tiers -->
<!-- TAGS: DGX Cloud, Deployment -->
- Three tiers: Workstation (local prototyping), Server (rack-scale production), Cluster/SuperPod (supercomputing scale)

<!-- CARD: What is DGX SuperPod? -->
<!-- TAGS: SuperPod, Exascale -->
- A single DGX system is inadequate for extensive AI applications; SuperPod links multiple DGX nodes into a scalable, exascale AI supercomputing infrastructure

<!-- CARD: DGX SuperPod architecture -->
<!-- TAGS: SuperPod, Architecture -->
- Nodes are linked through InfiniBand, along with supporting systems for storage and management
- Compute fabric is a full, non-blocking fat-tree topology giving full bisection bandwidth between any two halves of the cluster; H100-generation reference architecture uses Quantum-2 NDR InfiniBand at 400Gb/s per port, Blackwell-generation (B200/B300) reference architectures move to Quantum-X800 XDR at 800Gb/s per port

<!-- CARD: What is DGX SuperPod used for? -->
<!-- TAGS: SuperPod, Use Cases -->
- Supports multi-tenancy and federated learning; used for large-scale AI/LLM training and HPC by enterprises, national labs, and large research organizations

<!-- CARD: What is DGX SuperPod NOT good for? -->
<!-- TAGS: SuperPod, Limitations -->
- Small-to-mid-sized businesses, cost-constrained scenarios, or edge/embedded AI applications

<!-- CARD: DGX Station -->
<!-- TAGS: DGX Station, Workstation -->
- Workstation-tier DGX systems for local AI development: 2017 DGX Station V100, 2021 DGX Station A100, 2025 DGX Station GB300

<!-- CARD: DGX Spark -->
<!-- TAGS: DGX Spark, Desktop AI -->
- Compact desktop AI system built on the GB10 (Grace Blackwell) Superchip

<!-- CARD: What is an NVIDIA AI Factory? -->
<!-- TAGS: AI Factory, Data Center -->
- Purpose-built data center architecture for producing AI at scale rather than general-purpose computing: data comes in, gets processed through GPUs and the AI software stack, and a trained model or inference result comes out
- Covers the entire AI lifecycle end-to-end (data ingestion, training, fine-tuning, and high-volume inference) using NVIDIA's integrated hardware and software stack, as opposed to a traditional data center built for varied general-purpose workloads

<!-- CARD: What is NVIDIA HGX? -->
<!-- TAGS: HGX, Server Platform -->
- NVIDIA's standardized 8-GPU baseboard bundling SXM-form-factor GPUs, NVLink, and NVSwitch into a fixed reference design that OEMs (Dell, Supermicro, HPE, and others) build servers around
- Distinct from DGX: DGX is NVIDIA's own complete branded system (GPUs, CPU, storage, software), while HGX is the GPU baseboard component OEMs use to build their own AI servers

<!-- CARD: What is NVIDIA Jetson? -->
<!-- TAGS: Jetson, Edge AI -->
- System-on-Module (SoM) family combining an Arm CPU, NVIDIA GPU, and high-speed I/O in a compact, power-efficient package for edge AI and robotics
- Jetson Orin is the current mainstream module; Jetson Thor (Blackwell-based) targets more demanding real-time robotics workloads like humanoid robots, delivering server-class AI performance at 40-130W

<!-- CARD: What is PUE (Power Usage Effectiveness)? -->
<!-- TAGS: PUE, Data Center Efficiency -->
- Ratio of a data center's total facility power draw to the power actually delivered to its IT equipment; a PUE closer to 1.0 means less power is lost to overhead like cooling and power distribution
- Used to measure and compare data center energy efficiency, distinct from compute performance metrics like TFLOPS

<!-- CARD: What is GPU throttling? -->
<!-- TAGS: Thermal Management, Cooling -->
- A GPU automatically reduces its clock speed when it gets too hot, trading performance for protection against thermal damage
- Slows down training/inference jobs when it occurs, making adequate cooling a direct performance factor, not just a reliability one

<!-- CARD: What is liquid cooling used for in AI data centers? -->
<!-- TAGS: Liquid Cooling, Data Center -->
- Removes heat from high-TDP (thermal design power) GPUs like the H100/B200 more efficiently than traditional air cooling, which struggles with the heat density of dense, GPU-packed server racks
