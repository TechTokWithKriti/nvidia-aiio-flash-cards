---
category: "Networking & Data Center Fabric"
icon: "🌐"
dotColor: "#34d399"
---

<!-- CARD: What is an HCA / ConnectX? -->
<!-- TAGS: ConnectX, Mellanox -->
- HCA = Host Channel Adapter; NVIDIA acquired this technology through the Mellanox Technologies acquisition

<!-- CARD: What does ConnectX support? -->
<!-- TAGS: ConnectX, RDMA -->
- Advanced networking features for GPU-accelerated systems, especially RDMA (Remote Direct Memory Access)

<!-- CARD: How many ConnectX cards are in a DGX A100? -->
<!-- TAGS: ConnectX, DGX A100 -->
- 9 total: 8x single-port ConnectX-6 cards for the GPU compute fabric (default InfiniBand, 200Gb/s HDR), plus 1 dual-port card (default Ethernet) for storage and management

<!-- CARD: What does ConnectX connect? -->
<!-- TAGS: ConnectX, InfiniBand -->
- Connects servers to InfiniBand or Ethernet networks; ConnectX cards are VPI (Virtual Protocol Interconnect) adapters, switchable between the two fabrics, for high-throughput, low-latency data transfer

<!-- CARD: What is InfiniBand? -->
<!-- TAGS: InfiniBand, Networking -->
- Open-standard, high-performance networking protocol for low-latency, high-bandwidth communication between servers and storage

<!-- CARD: How is InfiniBand implemented? -->
<!-- TAGS: InfiniBand, Components -->
- Via HCAs, switches, cables, and silicon

<!-- CARD: What is InfiniBand used for? -->
<!-- TAGS: InfiniBand, Use Cases -->
- Large-scale HPC clusters, distributed GPU training, and enterprise data centers needing fast, lossless internode communication

<!-- CARD: InfiniBand vs Ethernet: Key Differentiator -->
<!-- TAGS: InfiniBand, RDMA -->
- InfiniBand's native, credit-based lossless flow control, adaptive routing, and in-network computing (SHARP, which offloads collective operations like gradient all-reduce into the switch fabric) are the real edge over Ethernet, not RDMA alone
- RDMA is also available over Ethernet via RoCE (RDMA over Converged Ethernet), an open IBTA standard that NVIDIA's ConnectX Ethernet adapters implement in hardware, not an NVIDIA-proprietary protocol

<!-- CARD: What is InfiniBand NOT good for? -->
<!-- TAGS: InfiniBand, Limitations -->
- Smaller deployments, where complexity and cost outweigh the benefit versus simpler network solutions

<!-- CARD: What are BlueField DPUs? -->
<!-- TAGS: BlueField, DOCA -->
- Specialized processors combining networking, compute, and data acceleration; offload networking, storage, and security tasks from the CPU/GPU
- Programmed and managed via NVIDIA DOCA (originally introduced as a "Data Center-on-a-Chip Architecture"; current NVIDIA materials treat DOCA as a product name without spelling out the acronym)
- Accelerate storage protocols like NVMe-oF (NVMe over Fabrics), letting remote storage be accessed over the network at near-local latency

<!-- CARD: Where are BlueField DPUs used? -->
<!-- TAGS: BlueField, Use Cases -->
- Cloud-native applications, AI/HPC workloads, zero-trust security models, and multi-tenant systems needing workload isolation

<!-- CARD: What are BlueField DPUs NOT good for? -->
<!-- TAGS: BlueField, Limitations -->
- Simple computing tasks or low-complexity systems, where standard NICs/CPUs are sufficient

<!-- CARD: What is NVLink? -->
<!-- TAGS: NVLink, GPU Interconnect -->
- Direct GPU-to-GPU interconnect; the default path between GPUs is PCIe, a general-purpose expansion-slot interface shared with other cards, which becomes a bottleneck for tight multi-GPU workloads
- Delivers much higher bandwidth and lower latency between GPUs than PCIe, and supports pooled/shared GPU memory across a system

<!-- CARD: What is NVLink useful for? -->
<!-- TAGS: NVLink, Use Cases -->
- Multi-GPU training and inference, large model workloads, and HPC simulations that need frequent, high-volume GPU-to-GPU data movement

<!-- CARD: What is NVLink NOT good for? -->
<!-- TAGS: NVLink, Limitations -->
- Single-GPU systems, where there is no second GPU to interconnect with
- Low-bandwidth workloads, where standard PCIe is sufficient and more cost-effective

<!-- CARD: NVLink Bridge -->
<!-- TAGS: NVLink, Bridge -->
- A physical connector that links two discrete GPUs installed on separate expansion cards, letting them communicate directly instead of routing through PCIe

<!-- CARD: NVSwitch -->
<!-- TAGS: NVLink, NVSwitch -->
- A switch chip that interconnects many GPUs in a full-mesh topology so any GPU can reach any other GPU at full NVLink bandwidth simultaneously
- Switches GPU-to-GPU memory traffic only; it does not carry direct CPU communication

<!-- CARD: Integrated NVLink -->
<!-- TAGS: NVLink, SXM -->
- NVLink built directly into the GPU module and motherboard/baseboard design (e.g. SXM-form-factor GPUs) instead of requiring an external bridge, used when GPUs are mounted directly on the system board

<!-- CARD: NVLink bandwidth by generation -->
<!-- TAGS: NVLink, History -->
- Per-GPU NVLink bandwidth has scaled with each architecture generation: Pascal P100 160GB/s, Volta V100 300GB/s, Ampere A100 600GB/s, Hopper H100/H200 900GB/s, Blackwell B100/B200/GB200 1.8TB/s
- The upcoming Rubin platform's 6th-generation NVLink is rated for 3.6TB/s per GPU

<!-- CARD: NVSwitch generations -->
<!-- TAGS: NVLink, NVSwitch, History -->
- 2nd-gen NVSwitch shipped with DGX A100 (2020), carrying NVLink 3.0 at 600GB/s per GPU
- 3rd-gen (Hopper) reached 25.6Tb/s total bidirectional bandwidth per chip; 4th-gen (Blackwell) has 72 NVLink 5.0 ports per chip with 14.4TB/s non-blocking switching capacity

<!-- CARD: How is the InfiniBand fabric managed? -->
<!-- TAGS: InfiniBand, OpenSM -->
- OpenSM (Open Subnet Manager) is the software that configures and manages an InfiniBand fabric, adding operational complexity a standard Ethernet/TCP-IP network's existing management tooling doesn't require

<!-- CARD: InfiniBand adapter generations -->
<!-- TAGS: InfiniBand, ConnectX, History -->
- NVIDIA's ConnectX smart Host Channel Adapters (HCAs) have scaled per-port InfiniBand speed each generation: ConnectX-6 up to 200Gb/s (HDR), ConnectX-7 400Gb/s (NDR), ConnectX-8 SuperNIC 800Gb/s (XDR)

<!-- CARD: InfiniBand switch generations -->
<!-- TAGS: InfiniBand, Quantum, History -->
- NVIDIA Quantum-2 switches deliver 400Gb/s per port (NDR), 64 ports per switch, 51.2Tb/s aggregate switching capacity
- NVIDIA Quantum-X800 (XDR generation) doubles that to 800Gb/s per port, purpose-built for trillion-parameter-scale AI models, and adds SHARP v4 in-network computing

<!-- CARD: What is DMA? -->
<!-- TAGS: DMA, Fundamentals -->
- Direct Memory Access: a hardware feature letting devices (NIC, storage, GPU) transfer data to/from system memory without the CPU copying every byte itself; a DMA controller assigns a channel per device
- Without DMA, the CPU can sit near 100% utilized just moving data while other devices idle waiting; with DMA, CPU involvement drops to just issuing setup/notification, freeing CPU and GPU for actual computation

<!-- CARD: What is RDMA? -->
<!-- TAGS: RDMA, Fundamentals -->
- Remote Direct Memory Access extends DMA across multiple hosts: a device can read/write another host's memory directly, bypassing that remote host's CPU entirely, not just its own

<!-- CARD: What is GPUDirect RDMA? -->
<!-- TAGS: RDMA, GPUDirect -->
- Low-latency GPU-to-GPU or GPU-to-NIC data transfer across hosts in HPC/AI clusters; bypasses the OS, system memory, and CPU so data moves directly between GPU memory and an RDMA-capable NIC
- Requires an NVIDIA GPU plus an RDMA-capable NIC (e.g. ConnectX)

<!-- CARD: What is GPUDirect Storage? -->
<!-- TAGS: RDMA, GPUDirect, Storage -->
- Direct GPU-to-storage data transfer, bypassing the CPU and system memory, for both local and networked storage
- Reduces I/O bottlenecks feeding large training datasets into GPU memory from NVMe or parallel file systems
- Requires an NVIDIA GPU plus supported storage; officially supported partners include IBM Spectrum Scale, WekaFS, DDN EXAScaler, and VAST Data

<!-- CARD: What is SHARP? -->
<!-- TAGS: SHARP, In-Network Computing -->
- Scalable Hierarchical Aggregation and Reduction Protocol: offloads collective operations (like the gradient all-reduce used in distributed training) from CPUs/GPUs into the InfiniBand network fabric itself, so data is aggregated as it crosses switches instead of being sent multiple times
- Reduces network congestion and frees CPU/GPU resources that would otherwise process communication instead of computation; SHARP v4 ships with the Quantum-X800 platform

<!-- CARD: What is Converged Ethernet? -->
<!-- TAGS: Converged Ethernet, Data Center Fabric -->
- Runs multiple traffic types (general LAN data, HPC/compute traffic, storage/SAN traffic) over a single Ethernet infrastructure instead of separate dedicated cabling for each, cutting hardware, power, and management overhead

<!-- CARD: Ethernet switch generations for AI (Spectrum-X) -->
<!-- TAGS: Ethernet, Spectrum, History -->
- NVIDIA Spectrum-4 Ethernet switches top out at 400Gb/s per port; Spectrum-X800 (SN5600 ASIC) doubles that to 800Gb/s per port with 51.2Tb/s switching capacity, an AI-optimized Ethernet platform paired with BlueField SuperNICs for adaptive routing and congestion control
- Matches the same generational jump InfiniBand made from Quantum-2 to Quantum-X800

<!-- CARD: Network fabric types in a data center -->
<!-- TAGS: Network Fabric, Data Center -->
- Compute fabric: GPU-to-GPU traffic for training/inference, built on InfiniBand, RoCE, or NVLink; prioritizes bandwidth and ultra-low latency
- Storage fabric: connects compute nodes to storage appliances (InfiniBand or Ethernet RoCE), isolated from compute traffic to avoid bottlenecks
- In-band management fabric: control-plane traffic like cluster management, SSH, DNS; prioritizes reliability over throughput
- Data fabric: general server-to-server transport, typically standard Ethernet, prioritizing flexibility over raw performance

<!-- CARD: Fat-tree network topology -->
<!-- TAGS: Topology, Fat-Tree -->
- Multi-tier switch topology offering high redundancy and fault tolerance; NVIDIA's DGX SuperPod reference architecture uses a full, non-blocking fat-tree InfiniBand fabric to give full bisection bandwidth between any two halves of the cluster
- Costs more switches and is more complex to manage than simpler topologies, but that redundancy is what large-scale AI deployments need for uptime

<!-- CARD: Mesh network topology -->
<!-- TAGS: Topology, Mesh -->
- Nodes connect directly to multiple other nodes, giving multiple paths for data and strong fault tolerance/scalability
- A full mesh has significantly higher connection count and management overhead than fat-tree or ring as node count grows

<!-- CARD: Star network topology -->
<!-- TAGS: Topology, Star -->
- All nodes connect to one central hub; simple to manage, but the hub becomes a bandwidth bottleneck as the cluster grows
- Matches the classic parameter-server model for distributed training, where a central node aggregates gradients from all workers

<!-- CARD: Ring topology and Ring All-Reduce -->
<!-- TAGS: Topology, Ring, NCCL -->
- Nodes form a logical ring, each connected to just two neighbors; NVIDIA's NCCL library uses Ring All-Reduce as its default algorithm for synchronizing gradients across GPUs in distributed training
- Runs in two phases (scatter-reduce, then all-gather) and is bandwidth-optimal for small to medium clusters (roughly 2 to 32 nodes), since per-node data volume stays independent of node count, unlike a star topology's central-hub bottleneck

<!-- CARD: What is NCCL? -->
<!-- TAGS: NCCL, GPU Communication -->
- NVIDIA Collective Communications Library: software library for GPU-to-GPU communication, sitting above whatever hardware path is actually available (NVLink, NVSwitch, PCIe, InfiniBand, RoCE) instead of requiring every application to hand-code each transfer path itself
- Topology-aware: auto-discovers the system's interconnects and picks the fastest communication pattern per collective operation and message size, rather than using one fixed strategy everywhere
- Ships built into PyTorch and TensorFlow, providing collective operations like all-reduce, all-gather, broadcast, and reduce-scatter for distributed training
- Complements the hardware layer rather than replacing it: NVLink/RDMA move individual transfers fast, NCCL organizes many transfers efficiently, e.g. coordinating gradient synchronization across 100 GPUs

<!-- CARD: What is NVIDIA Magnum IO? -->
<!-- TAGS: Magnum IO, Data Movement -->
- Software development kit that eliminates I/O bottlenecks in AI, HPC, and data science workflows by accelerating storage IO, network IO, and in-network compute across multi-GPU, multi-node systems
- An umbrella suite rather than a single library: it brings together GPUDirect Storage, NVLink, InfiniBand/RoCE networking, and NCCL under one framework for moving data between CPUs, GPUs, DPUs, and storage

<!-- CARD: What is NVIDIA Air? -->
<!-- TAGS: NVIDIA Air, Network Simulation -->
- Cloud-hosted platform for creating a full-scale digital twin of a data center network, letting engineers validate topology, configuration, and automation before any physical hardware is deployed
- Now offered as DSX Air within the NVIDIA DSX Platform, NVIDIA's blueprint for simulating entire AI factories (compute, networking, storage, and orchestration) ahead of a physical build-out
