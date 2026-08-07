---
category: "Data, Storage & RAG Pipelines"
icon: "🗄️"
dotColor: "#818cf8"
---

<!-- CARD: What is NVMe storage used for in AI data centers? -->
<!-- TAGS: NVMe, Storage -->
- Local, server-attached SSDs providing very high-speed, low-latency I/O, best suited to actively-used training data
- Limited capacity, since it's confined to what fits physically inside each server

<!-- CARD: What are parallel file systems used for? -->
<!-- TAGS: Parallel File Systems, Storage -->
- Clustered storage where multiple servers access multiple storage nodes simultaneously, giving many GPUs shared high-speed access to the same data at once (e.g. Lustre, IBM Spectrum Scale/GPFS)
- Best fit for large datasets and parallel processing workloads needing high aggregate throughput across many GPU nodes, more scalable and performant for this than NAS or DAS

<!-- CARD: What is NFS used for in AI infrastructure? -->
<!-- TAGS: NFS, Storage -->
- Network File System: shares smaller, distributed datasets like configs and scripts across nodes
- Lightweight and collaborative, but not built for the high-speed access active training data needs

<!-- CARD: What is Object Storage used for in AI infrastructure? -->
<!-- TAGS: Object Storage, Storage -->
- Systems like Amazon S3, designed for long-term storage of massive amounts of raw data such as logs and model checkpoints
- Higher latency than NVMe or parallel file systems, so it suits cold storage and data-retention policies, not active training I/O

<!-- CARD: What is Ceph? -->
<!-- TAGS: Ceph, Storage -->
- Distributed storage system offering scalable object, block, or file storage with built-in redundancy and fault tolerance, used as one storage option within NVIDIA AI infrastructure reference designs

<!-- CARD: Why do AI data centers use tiered storage? -->
<!-- TAGS: Storage, Tiering -->
- Active training data typically sits on NVMe or parallel file systems, while less-frequently-accessed data moves to object storage over its lifecycle, rather than one storage type serving every need

<!-- CARD: What matters most for storage in multi-GPU training? -->
<!-- TAGS: Storage, IOPS -->
- High IOPS capability matters most, since it determines whether data can be fed to GPUs fast enough to keep them fully utilized, ahead of minimizing raw latency alone
- Local SSDs on each compute node minimize data-transfer bottlenecks better than RAID0, cloud-based storage, or centralized HDD storage

<!-- CARD: What is ETL in AI data pipelines? -->
<!-- TAGS: ETL, Data Pipeline -->
- Extract, Transform, Load: pulling raw data, cleaning and reshaping it, then loading it into a usable form
- Its key advantage is ensuring data consistency and quality before analysis, not real-time streaming, which is a separate concern
