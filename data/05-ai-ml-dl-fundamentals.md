---
category: "AI/ML/DL Fundamentals"
icon: "🧠"
dotColor: "#f472b6"
---

<!-- CARD: What is mixed precision training? -->
<!-- TAGS: Mixed Precision, Training -->
- Uses lower-precision data types (e.g. FP16/BF16) alongside FP32 during training, cutting GPU memory usage and improving performance compared to training in full FP32 precision throughout
- Helps avoid the memory overflow that can occur when training a model at full FP32 precision, without giving up the accuracy that naive low-precision-only training would sacrifice
