---
category: "Virtualization & Containers"
icon: "📦"
dotColor: "#fbbf24"
---

<!-- CARD: What is NVIDIA vGPU? -->
<!-- TAGS: vGPU, Virtualization -->
- Lets multiple virtual machines share direct, simultaneous access to a single physical GPU, using the same NVIDIA drivers as a non-virtualized OS
- Centralizes GPU management and security for enterprise IT while improving utilization versus dedicating a whole physical GPU per VM

<!-- CARD: MIG as a GPU-sharing mechanism -->
<!-- TAGS: MIG, Virtualization -->
- Partitions a physical GPU's compute, memory, cache, and memory bandwidth into fully isolated instances, each with predictable throughput and latency, so multiple users or workloads can share one GPU without interfering with each other
- When sizing MIG instances, the main consideration is how much GPU memory each individual workload actually needs
- vGPU and MIG can combine: depending on the GPU model and vGPU software version, multiple time-sliced vGPUs can be created per MIG slice, letting well over a dozen VMs share a single physical GPU on supported SKUs (the exact vGPU-per-slice and total-VM limits are set per GPU model, not a fixed MIG property)

<!-- CARD: What is a Kubernetes ResourceQuota for GPUs? -->
<!-- TAGS: Kubernetes, ResourceQuota -->
- A Kubernetes API object that caps how much of a resource, including GPUs exposed to the cluster as a schedulable resource, a namespace's pods can collectively request
- Ensures a specific number of GPU resources are guaranteed or limited for a given pod or team's namespace in a shared, multi-tenant cluster
