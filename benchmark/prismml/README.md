# PrismML Benchmark Contribution Path

This folder defines how Bonsai Pack Builder should emit reports for upstream review.

Target upstream repository:

- [PrismML-Eng/Bonsai-demo](https://github.com/PrismML-Eng/Bonsai-demo)
- Community benchmark area: `community-benchmarks/bonsai`

The exporter should produce markdown compatible with the spirit of the upstream
templates:

- `TEMPLATE-llama-cpp.md`
- `TEMPLATE-mlx.md`

## Rule

Benchmark reports are evidence, not marketing. Every report must state:

- hardware;
- operating system;
- runtime;
- model artifact and hash when available;
- task;
- dataset or synthetic input source;
- latency;
- throughput if meaningful;
- memory if measured;
- verifier result;
- limitations;
- reproduction command.

