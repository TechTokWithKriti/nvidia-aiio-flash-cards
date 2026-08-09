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

<!-- CARD: What is NVIDIA Riva? -->
<!-- TAGS: Riva, Conversational AI -->
- GPU-accelerated SDK for building and deploying customizable, real-time speech AI applications: automatic speech recognition (ASR), text-to-speech (TTS), and translation across multiple languages
- Deployable on-premises, in the cloud, or at the edge; complements NeMo, which handles the broader training and customization side of conversational AI and LLMs

<!-- CARD: What is NVIDIA DeepStream? -->
<!-- TAGS: DeepStream, Video Analytics -->
- Open-source, GStreamer-based SDK for building real-time streaming analytics applications across video, audio, and image data (multi-sensor processing), GPU-accelerated end-to-end
- Used for intelligent video analytics like detecting safety violations from multiple live camera streams in retail, manufacturing, and smart-city deployments

<!-- CARD: What is NVIDIA Omniverse? -->
<!-- TAGS: Omniverse, Digital Twins -->
- Platform of APIs, SDKs, and services, built on Pixar's OpenUSD, for real-time 3D design collaboration and physically accurate simulation
- Used to build industrial digital twins and to generate synthetic data and simulation environments for robotics and physical AI

<!-- CARD: What is NVIDIA Isaac? -->
<!-- TAGS: Isaac, Robotics -->
- End-to-end platform, built on Omniverse, for developing, simulating, and deploying AI-powered robots
- Isaac Sim provides a physically accurate virtual environment (GPU-accelerated physics, sensor simulation) for designing, testing, and training robots before deployment; Isaac Lab handles the reinforcement-learning side of robot training

<!-- CARD: What is NVIDIA PhysicsNeMo? -->
<!-- TAGS: PhysicsNeMo, Physics-Informed ML -->
- Open-source framework for physics-informed machine learning, blending physics and partial differential equations with deep learning for domains like fluid dynamics, structural mechanics, and electromagnetics
- Formerly named NVIDIA Modulus

<!-- CARD: What is NVIDIA cuOpt? -->
<!-- TAGS: cuOpt, Logistics -->
- GPU-accelerated optimization engine for combinatorial and linear optimization problems like vehicle routing, pickup-and-delivery, and linear/mixed-integer programming
- Delivers sub-second solver response times for large-scale logistics problems, such as finding efficient routes for a fleet of delivery trucks; included as part of NVIDIA AI Enterprise

<!-- CARD: What is NVIDIA BioNeMo? -->
<!-- TAGS: BioNeMo, Drug Discovery -->
- Platform for generative AI in early drug discovery focused on proteins and small molecules: 3D protein structure prediction, de novo molecule generation, and molecular docking
- Built on the NeMo framework; the dedicated drug-discovery and biomolecular-simulation component of NVIDIA's healthcare and life-sciences platform, alongside Clara's medical imaging and genomics tools

<!-- CARD: What is NVIDIA FLARE? -->
<!-- TAGS: FLARE, Federated Learning -->
- NVIDIA Federated Learning Application Runtime Environment: open-source SDK for federated learning, training a shared model across multiple decentralized sites without any site's raw data leaving its premises
- Used in domains like healthcare, where hospitals collaborate on a diagnostic model while keeping patient data private and local
