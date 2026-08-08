---
category: "Applied AI Platforms & Industry Solutions"
icon: "🏭"
dotColor: "#a3e635"
---

<!-- CARD: What is NVIDIA Triton Inference Server? -->
<!-- TAGS: Triton, Inference -->
- Open-source model-serving software for deploying trained AI models in production, supporting models from multiple frameworks (TensorRT, TensorFlow, PyTorch, ONNX, and more) behind a single serving layer
- Model ensembles let a pipeline of multiple models, plus pre/post-processing steps, run as one client request, with Triton handling the routing between them, improving throughput for workflows that chain models together

<!-- CARD: What is NVIDIA Clara? -->
<!-- TAGS: Clara, Healthcare -->
- AI platform for healthcare and life sciences, providing domain-specific SDKs, pre-trained models, and accelerated frameworks for medical imaging, genomics, and drug discovery
- Pre-trained models handle common medical imaging tasks like segmentation and classification, and can be fine-tuned by developers for their specific application
- Supports frameworks like PyTorch and TensorFlow, and includes Clara Holoscan for building and deploying real-time AI applications on edge medical devices

<!-- CARD: What is NVIDIA Merlin? -->
<!-- TAGS: Merlin, Recommender Systems -->
- Open-source library for building GPU-accelerated recommender systems end-to-end: feature engineering and preprocessing, model training, and production inference
- Component libraries include NVTabular for preprocessing, Merlin Models for training, and integration with Triton Inference Server for deployment
- Used for personalized recommendations at scale, such as product or content suggestions on e-commerce and streaming platforms

<!-- CARD: What is NVIDIA NIM? -->
<!-- TAGS: NIM, Inference -->
- NVIDIA Inference Microservices: prepackaged, GPU-accelerated containers for deploying pretrained or customized AI models, exposing industry-standard APIs so applications can call them without managing the underlying inference engine
- Covers a range of model types including large language models, vision, and speech, and can run in the cloud, in a data center, or on RTX AI PCs and workstations
- Included as one of the core building blocks of the NVIDIA AI Enterprise software suite

<!-- CARD: What is NVIDIA AI Enterprise? -->
<!-- TAGS: AI Enterprise, Platform -->
- End-to-end, cloud-native software suite bundling the microservices, frameworks, and libraries (including NIM) needed to build, deploy, and manage production AI, plus GPU orchestration and infrastructure management
- Optimized and certified across industry-standard infrastructure, cloud, data center, and edge, so the same supported software stack runs portably across environments

<!-- CARD: What is NVIDIA Fleet Command? -->
<!-- TAGS: Fleet Command, Edge AI -->
- Cloud service for securely deploying, managing, and scaling AI applications across distributed edge locations from a single control plane
- Handles remote provisioning, layered security from cloud to edge, and health monitoring, automatically restarting applications or migrating workloads when problems occur
- Suited to edge use cases like retail stores or factories, where AI needs to run close to the data source but be managed centrally

<!-- CARD: What is NVIDIA DRIVE? -->
<!-- TAGS: DRIVE, Autonomous Vehicles -->
- End-to-end, full-stack platform for autonomous vehicle development, spanning training (DGX), simulation and validation (Omniverse), and in-vehicle compute (DRIVE AGX)
- DRIVE AGX is the in-vehicle compute platform running perception, planning, and control workloads in real time, supporting production autonomy from advanced driver-assist up to Level 4 robotaxi
