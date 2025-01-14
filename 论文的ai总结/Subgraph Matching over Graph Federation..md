# Abstract

这篇论文研究了在图联邦中进行子图匹配的问题。许多实际应用需要在异构源中处理图数据。在本文中，作者定义了图联邦，表示图数据源是临时联合的，并向用户提供其数据。接下来，作者提出了一种新的框架 FedGraph，以高效、有效地执行子图匹配，这是图联邦中的关键应用。FedGraph 包含三个阶段，包括查询分解、分布式匹配和分布式连接。我们还开发了新的高效近似算法，并将其应用于每个阶段以解决 NP 难问题。评估在真实测试环境中进行，使用真实的和合成的图数据集。FedGraph 优于最先进的方法，分别将执行时间和通信成本降低了 37.3 倍和 61.8 倍。

# AI 理解论文

## Key Points

1. 子图匹配问题：给定查询图 q 和数据图 G，寻找与 q 同构的所有嵌入。子图匹配问题是 NP-complete，已有多种算法。
2. 算法目标：生成有效的匹配顺序，设计强大的过滤策略，最小化数据图中的候选数量。
3. QuickSI：设计不常出现的边优先排序技术，按照查询图边在数据图中出现的频率进行排序。
4. GraphQL：采用左深度连接排序策略，将枚举过程建模为连接问题。
5. SPath、TurboIso 和 CFL：提出基于路径的排序方法，通过将查询图分解为若干路径并根据每条路径的估计嵌入数量对路径进行排序，生成匹配顺序。
6. TurboIso 和 CFL：采用树结构框架，构建轻量级树结构索引以减小候选数量，并根据索引而不是原始数据图进行所有匹配的枚举。
7. 存在的问题：现有的排序策略仅考虑了每个顶点（或路径）的候选数量，忽略了查询顶点之间的边。
8. 例子 1.1：现有排序策略得到的匹配顺序。
9. 例子 1.2：现有树结构框架的局限性。

1. Vertex Connectivity（VC）子图匹配算法：包含四个步骤：提取每个查询顶点的候选集、根据候选集的统计信息生成匹配顺序、构建双图索引（BI）和根据 BI 枚举所有结果。
2. VC 采用基于顶点的排序策略生成匹配顺序，考虑了查询顶点的候选次数以及查询顶点之间的边。
3. 双图索引的构建和匹配顺序的生成。
4. VC 与现有算法的比较及性能评估。
5. 本文组织结构：背景介绍、VC 算法概述、索引构建与匹配顺序生成、VC 算法评估、总结。

1. 定义 8（完整候选集）：给定查询图 q 和图 G，u:C 中的顶点 u 满足：在从 q 到 G 的任何匹配中存在映射 (u; v)，则 v 属于 u:C。
2. 定义 9（枢轴和枢轴字典）：给定查询图 q 和连接的匹配顺序 p，查询顶点 u 的枢轴是 p 中 u 在 BN p q (u) 中的一个查询顶点 u0。枢轴字典 P 记录每个查询顶点的枢轴。
3. k-核的定义：给定图 g，g 的 k-核是 g 的最大连通子图 g0，满足 8u 属于 g0 的顶点集；d(u)≤k，其中 d(u) 是 u 在 g0 中的度。
4. 定义 11（核心值）：给定图 g 和顶点 u∈V(g)，如果 u 属于 c-核但不属于任何 (c+1)-核，则 u 的核心值 u:core 为 c。
5. 巴塔杰尔等人提出了一种 O(jE(g)j) 算法，用于计算图 g 中所有顶点的核心值，并证明了一个连通图只有一个 2-核。
20. CFL 定义了核心结构如下。给定查询图 q，q 的核心结构是 q 的 2-核。在生成索引顺序和匹配顺序时，优先考虑根据它们的核值和核心度对顶点进行排序，以排除不在核心结构中的顶点的影响。

   ## Related Work
1. 子图匹配问题：给定一个查询图 q 和数据图 G，子图匹配在 G 中寻找与 q 同构的所有嵌入。例如，对于图 1 中的 q 和 G，f(u0; v0)、f(u1; v1)、f(u2; v3) 和 f(u3; v6) 是匹配。子图匹配问题是 NP-complete，已经提出了各种算法。
2. 算法目标：生成有效的匹配顺序和设计强大的过滤策略，以最小化数据图中的候选数量。
3. QuickSI：设计不常出现的边优先排序技术，按照在数据图中出现的频率对查询图的边进行升序排序。
4. GraphQL：采用左深度连接排序策略，将枚举过程建模为连接问题。
5. SPath、TurboIso 和 CFL：提出基于路径的排序方法，通过将查询图分解为若干路径并根据每条路径的估计嵌入数量对路径进行排序，生成匹配顺序。
6. TurboIso 和 CFL：采用树结构框架，构建轻量级树结构索引以减小候选数量，并根据索引而不是原始数据图进行所有匹配的枚举。
7. 存在的问题：现有的排序策略只考虑了每个顶点（或路径）的候选数量，但忽略了查询顶点之间的边。
8. 例子 1.1：在图 1 中，现有的排序策略（包括不常出现的边优先排序、左深度连接排序和基于路径的排序）根据数据图中的候选数量获得匹配顺序 p：u0; u1; u2; u3。在枚举过程中，u1、u2 和 u3 根据 u0 获得其候选数据顶点。
9. 例子 1.2：给定图 3a 中的 q 和图 5 中的 G，现有的树结构框架只能维持沿着路径的边。因此，即使存在更有效的顺序，索引也无法支持枚举。换句话说，树结构框架从本质上限制了匹配顺序的生成。
10. 基于顶点连通性的子图匹配算法（Vertex Connectivity，VC）：本文研究了一种新的子图匹配算法，该算法包含四个步骤：提取每个查询顶点的候选集、根据候选集的统计信息生成匹配顺序、构建双图索引（BI）和根据 BI 枚举所有结果。
11. 伪星形同构约束和平板过滤策略：VC 采用伪星形同构约束和平板过滤策略逆序优化候选集。
12. 双图索引：为枚举设计了一个双图索引，其空间复杂度为 O(jE(G)j * jV(q)j)，构建时间复杂度为 O(jE(G)j * jE(q)j)。
33. 比较与评估：将 VC 与各种具有不同排序策略的现有算法在真实和合成数据集上进行了比较，并使用了最新的性能研究 [13] 中的新实验指标。结果表明，VC 显著优于以前的算法。

    ## Method

    以下是作者通过的方法取得结果的逐条罗列：

1. 定义子图匹配问题：给定一个查询图 q 和数据图 G，子图匹配在 G 中寻找与 q 同构的所有嵌入。

2. 设计 QuickSI 算法：对查询图的边进行升序排序，根据不常出现的边优先排序技术。

3. 设计 GraphQL 算法：采用左深度连接排序策略，将枚举过程建模为连接问题。

4. 提出 SPath、TurboIso 和 CFL 算法：基于路径的排序方法，通过将查询图分解为若干路径并根据每条路径的估计嵌入数量对路径进行排序，生成匹配顺序。

5. 设计 TurboIso 和 CFL 算法：采用树结构框架，构建轻量级树结构索引以减小候选数量，并根据索引而不是原始数据图进行所有匹配的枚举。

6. 分析存在的问题：现有的排序策略只考虑了每个顶点（或路径）的候选数量，但忽略了查询顶点之间的边。

7. 提出 Vertex Connectivity（VC）算法：包含四个步骤：提取每个查询顶点的候选集、根据候选集的统计信息生成匹配顺序、构建双图索引（BI）和根据 BI 枚举所有结果。

8. VC 算法采用基于顶点的排序策略生成匹配顺序，考虑了查询顶点的候选次数以及查询顶点之间的边。

9. 为枚举设计了一个双图索引，其空间复杂度为 O(jE(G)j * jV(q)j)，构建时间复杂度为 O(jE(G)j * jE(q)j)。

43. 将 VC 与各种具有不同排序策略的现有算法在真实和合成数据集上进行了比较，并使用了最新的性能研究 [13] 中的新实验指标。结果表明，VC 显著优于以前的算法。

    ## Result

    以下是这篇论文中实验取得的结果：

1. 子图匹配问题是 NP-complete 问题，已提出了各种算法。
2. 现有算法目标为生成有效的匹配顺序和设计强大的过滤策略，以最小化数据图中的候选数量。
3. QuickSI 是一种不常出现的边优先排序技术，按照查询图的边在数据图中出现的频率进行排序。
4. GraphQL 采用左深度连接排序策略，将枚举过程建模为连接问题。
5. SPath、TurboIso 和 CFL 提出基于路径的排序方法，通过将查询图分解为若干路径并根据每条路径的估计嵌入数量对路径进行排序，生成匹配顺序。
6. TurboIso 和 CFL 采用树结构框架，构建轻量级树结构索引以减小候选数量，并根据索引而不是原始数据图进行所有匹配的枚举。
7. 现有排序策略存在问题：只考虑了每个顶点（或路径）的候选数量，但忽略了查询顶点之间的边。
8. 举例说明了现有排序策略在图 1 中的问题，即忽略了查询顶点之间的边。
9. 提出了 Vertex Connectivity（VC）算法，包含四个步骤：提取每个查询顶点的候选集、根据候选集的统计信息生成匹配顺序、构建双图索引（BI）和根据 BI 枚举所有结果。
10. VC 采用基于顶点的排序策略生成匹配顺序，考虑了查询顶点的候选次数以及查询顶点之间的边。
11. VC 为枚举设计了一个双图索引，其空间复杂度为 O(jE(G)j * jV(q)j)，构建时间复杂度为 O(jE(G)j * jE(q)j)。
12. VC 算法在真实和合成数据集上与各种具有不同排序策略的现有算法进行了比较，并使用了最新的性能研究中的新实验指标。结果显示，VC 显著优于以前的算法。
13. VC 算法打破了基于树框架中匹配顺序生成的约束，因为双图索引中的边依赖于 pivot dictionary，该字典是在生成匹配顺序时获得的，而基于树框架生成的匹配顺序依赖于树结构索引。
14. VC 算法通过考虑候选集的大小和查询顶点之间的边来生成匹配顺序，解决了现有排序策略仅考虑候选人数的问题。
58. VC 算法采用了伪星同构约束和平衡过滤策略对候选集进行细化，进一步减小了候选集的大小。

    ## Conclusion

    以下是这篇论文中得出的结论：

1. 子图匹配问题是 NP-complete，已提出了各种算法。
2. 算法目标为生成有效的匹配顺序和设计强大的过滤策略，以最小化数据图中的候选数量。
3. QuickSI 是一种不常出现的边优先排序技术，按照在数据图中出现的频率对查询图的边进行升序排序。
4. GraphQL 采用左深度连接排序策略，将枚举过程建模为连接问题。
5. SPath、TurboIso 和 CFL 提出基于路径的排序方法，通过将查询图分解为若干路径并根据每条路径的估计嵌入数量对路径进行排序，生成匹配顺序。
6. TurboIso 和 CFL 采用树结构框架，构建轻量级树结构索引以减小候选数量，并根据索引而不是原始数据图进行所有匹配的枚举。
7. 现有的排序策略只考虑了每个顶点（或路径）的候选数量，但忽略了查询顶点之间的边。
8. 子图同构问题的求解可以采用基于顶点连通性的算法，该算法包含四个步骤：提取每个查询顶点的候选集、根据候选集的统计信息生成匹配顺序、构建双图索引（BI）和根据 BI 枚举所有结果。
9. 通过采用基于顶点的排序策略生成匹配顺序，考虑了查询顶点的候选次数以及查询顶点之间的边。
10. 为枚举设计了一个双图索引，其空间复杂度为 O(jE(G)j * jV(q)j)，构建时间复杂度为 O(jE(G)j * jE(q)j)。
11. 将 VC 与各种具有不同排序策略的现有算法在真实和合成数据集上进行了比较，并使用了最新的性能研究 [13] 中的新实验指标。结果表明，VC 显著优于以前的算法。