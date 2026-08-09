---
category: "Virtualization & Containers"
icon: "📦"
dotColor: "#fbbf24"
---

<!-- CARD: What is NVIDIA vGPU? -->
<!-- TAGS: vGPU, Virtualization -->
- Lets multiple virtual machines share direct, simultaneous access to a single physical GPU, using the same NVIDIA drivers as a non-virtualized OS
- Centralizes GPU management and security for enterprise IT while improving utilization versus dedicating a whole physical GPU per VM
- Isolation is software-based: it runs under a hypervisor (VMware, Citrix, etc.) and requires licensed GPU management software plus guest OS drivers
- Best suited to VDI and VM-based AI/ML workloads where many users share GPU-accelerated virtual desktops or applications
- Performance is variable, since GPU resources are software-shared across VMs rather than dedicated to one

<!-- CARD: MIG as a GPU-sharing mechanism -->
<!-- TAGS: MIG, Virtualization -->
- Partitions a physical GPU's compute, memory, cache, and memory bandwidth into fully isolated instances, each with predictable throughput and latency, so multiple users or workloads can share one GPU without interfering with each other
- When sizing MIG instances, the main consideration is how much GPU memory each individual workload actually needs
- vGPU and MIG can combine: depending on the GPU model and vGPU software version, multiple time-sliced vGPUs can be created per MIG slice, letting well over a dozen VMs share a single physical GPU on supported SKUs (the exact vGPU-per-slice and total-VM limits are set per GPU model, not a fixed MIG property)
- Isolation is hardware-based rather than software-based: MIG runs on bare-metal Linux with standard NVIDIA drivers and nvidia-smi, with no hypervisor required, though it can also underpin GPU passthrough or vGPU on top of a supported hypervisor
- Primarily available on NVIDIA data center GPUs (A100, H100, and newer), with support since extended to select Blackwell workstation/server GPUs; vGPU still spans a much broader range of NVIDIA GPUs overall

<!-- CARD: GPU passthrough -->
<!-- TAGS: Passthrough, Virtualization -->
- Dedicates an entire physical GPU exclusively to one virtual machine, delivering near-native performance since there's no sharing
- Trades away scalability for that performance: one VM per GPU, unlike vGPU or MIG which split a GPU across several
- Requires an IOMMU-capable CPU and a passthrough-supporting hypervisor such as KVM or VMware ESXi

<!-- CARD: CPU virtualization vs GPU virtualization -->
<!-- TAGS: Virtualization, Fundamentals -->
- CPU virtualization is mature and standardized, with well-established hypervisors (VMware ESXi, KVM, Hyper-V) that cleanly split cores/threads into vCPUs at near-native performance
- GPU virtualization is newer and largely vendor-specific; GPUs don't partition as cleanly as CPUs, so it relies on purpose-built techniques like vGPU or MIG, and isolation/performance both depend heavily on which approach is used

<!-- CARD: What is the NVIDIA GPU Operator? -->
<!-- TAGS: GPU Operator, Kubernetes -->
- Kubernetes operator that automates provisioning and managing the software components a node needs to expose its GPUs to the cluster: the NVIDIA driver, the Kubernetes device plugin, the NVIDIA Container Runtime, automatic node labeling, and DCGM-based monitoring
- Removes the need to manually install and version-match these components on every node, giving Kubernetes clusters a consistent, repeatable way to provision GPU resources
- MIG-aware: detects MIG instances per GPU so Kubernetes can schedule and allocate against them, and automatically re-labels nodes as they join or leave the cluster

<!-- CARD: What is the NVIDIA Container Toolkit? -->
<!-- TAGS: Container Toolkit, Containers -->
- Library and set of tools (formerly known as nvidia-docker) that lets containers running under Docker, containerd, Podman, or Kubernetes access the host's NVIDIA GPUs with full acceleration
- One of the components the NVIDIA GPU Operator installs and manages automatically across a Kubernetes cluster
- The NVIDIA Container Runtime is the specific piece that mounts GPU device nodes (e.g. /dev/nvidia0) and injects the driver into a starting container; the Container Toolkit is the broader package that includes it

<!-- CARD: What is a Kubernetes ResourceQuota for GPUs? -->
<!-- TAGS: Kubernetes, ResourceQuota -->
- A Kubernetes API object that caps how much of a resource, including GPUs exposed to the cluster as a schedulable resource, a namespace's pods can collectively request
- Ensures a specific number of GPU resources are guaranteed or limited for a given pod or team's namespace in a shared, multi-tenant cluster

<!-- CARD: vGPU profile types -->
<!-- TAGS: vGPU, Profiles -->
- Q-series: virtual workstations for creative/technical professionals needing RTX Enterprise driver features; C-series: compute-focused profiles for AI/ML and CUDA workloads in VMs; B-series: virtual desktops for business users; A-series: entry-level virtual application streaming
- Different profile series can run as time-sliced vGPUs on the same physical GPU simultaneously, as long as the total frame buffer allocated across them doesn't exceed the GPU's physical memory

<!-- CARD: vGPU time-slicing -->
<!-- TAGS: vGPU, Time-Slicing -->
- When multiple VMs share one physical GPU via vGPU, time-slicing has them take turns accessing the GPU's compute resources in rapid succession, rather than each VM getting a dedicated, always-available slice
- Managed by the vGPU Manager, a software component that runs in the hypervisor to handle GPU slicing and assignment to VMs
