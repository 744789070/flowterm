# FlowTerm 二次开发指南

> FlowTerm 是 [Wave Terminal](https://github.com/wavetermdev/waveterm)（Apache-2.0）的二次开发 fork。本文面向在本仓库上进行二开的开发者，覆盖架构、环境、运行、构建与扩展方式。上游通用构建说明见 [BUILD.md](BUILD.md)，编码规范全文见 [.kilocode/rules/rules.md](.kilocode/rules/rules.md)。

## 1. Fork 定位与上游关系

- fork 点：上游 `9f1c9670`，`flowterm` 分支相对 `main`（跟踪上游）目前只有 2 个提交：
  1. `8d7eb409` 最小化 rebrand —— 仅改用户可见身份：
     - `package.json`：name/productName → FlowTerm，appId → `dev.flowterm.app`
     - `emain/emain-platform.ts`：数据目录前缀 `waveterm` → `flowterm`，`app.setName`
     - 窗口标题（`index.html`、`frontend/wave.ts`）与 About 弹窗
  2. `45ca95ae` 把 docusaurus docs 移出 npm workspace（修复 Windows 依赖安装）
- **刻意保留上游标识**（保证与上游可合并）：Go module 路径、`wsh` / `wavesrv` 二进制名、`WAVETERM_*` 环境变量、LICENSE/NOTICE。
- 数据目录（Windows）：dev 模式为 `%LOCALAPPDATA%\flowterm-dev\Data` 与 `%USERPROFILE%\.config\flowterm-dev`；正式打包版为 `flowterm` 前缀（无 `-dev`）。

## 2. 整体架构

```
┌─ Electron 主进程 emain/ (TS) ──spawn──→ Go 后端 wavesrv (cmd/server + pkg/)
│      │                                       │
│      │ WebSocket(wshrpc RPC) + WPS 事件       │ Unix domain socket（wsh CLI）
│      ▼                                       ▼
└─ React 前端 frontend/（每个 tab 一个渲染进程）
```

- **Go 后端（wavesrv）**：SQLite 对象存储（`pkg/wstore`，迁移内嵌于 `db/`）、RPC 路由（`pkg/wshutil/wshrouter.go`）、终端块生命周期（`pkg/blockcontroller`）、SSH/WSL 连接（`pkg/remote` + `pkg/genconn`）、持久 job（`pkg/jobmanager`）、AI 集成（`pkg/aiusechat`，支持 OpenAI/Anthropic/Gemini/Ollama 等）、Wave App 运行时（`pkg/waveapp`）、事件总线（`pkg/wps`）。
- **Electron 主进程**：`emain/emain.ts` 启动 → spawn wavesrv（`emain-wavesrv.ts`，从 stderr 的 `WAVESRV-ESTART ws:...` 行拿端点；wavesrv 死则整体退出）→ 窗口/Tab 管理（`emain-window.ts`、`emain-tabview.ts`）→ IPC（`emain-ipc.ts` + `preload.ts`）。反向 RPC：Go 可调用 Electron 能力（通知、safeStorage 等，见 `emain-wsh.ts`）。
- **React 前端**：状态管理 Jotai（模型单例模式）；块视图注册表 `frontend/app/block/blockregistry.ts`（term / preview / web / waveai / sysinfo / vdom / tsunami 等 14 种）；平铺布局引擎 `frontend/layout/`；RPC 客户端 `frontend/app/store/wshclientapi.ts`（178 个命令，**自动生成**）；文件预览 `frontend/app/view/preview/`。
- **tsunami/**：独立 Go module，基于 VDOM 的 Go UI 框架，用于构建可嵌入 block 的 Wave App（builder 窗口构建/发布）。
- **RPC 通信**：自定义 `wshrpc` 协议，前端走 WebSocket，本机 `wsh` CLI 走 domain socket，SSH 远端走 stdio 管道；按 routeId 路由（`electron`、`tab:<id>`、`conn:<name>` 等）。

## 3. 目录速查

| 目录 | 内容 |
|---|---|
| `cmd/server` | wavesrv 入口 |
| `cmd/wsh` | wsh CLI（cobra，约 50 个子命令；远端还充当 connserver） |
| `cmd/generatets` / `generatego` / `generateschema` | 代码生成器（Go 类型 → TS / Go 客户端 / JSON Schema） |
| `pkg/wshrpc` | RPC 命令定义（`wshrpctypes.go`）与服务端实现 |
| `pkg/wcore` `pkg/waveobj` `pkg/wstore` | 对象模型与 SQLite 持久层 |
| `emain/` | Electron 主进程 + preload |
| `frontend/app` | React 应用（store / view / aipanel / modals…） |
| `frontend/types/gotypes.d.ts` | 生成的 Go 类型 TS 定义（勿手改） |
| `frontend/preview/` | 组件预览服务器（脱离 Electron 用 mock 开发单个组件） |
| `tsunami/` | VDOM Go UI 框架（独立 go.mod） |
| `aiprompts/` | 上游留存的约 29 篇架构设计笔记，值得按需查阅 |
| `.kilocode/skills/` | 8 个扩展任务 how-to 指南（见 §7） |
| `db/` | 内嵌 SQLite 迁移 |

## 4. 环境准备（Windows）

依赖：**Node 22 LTS**、**Go**、**Task (go-task)**、**Zig**（CGO 静态链接 sqlite 用）。

```bat
winget install OpenJS.NodeJS.LTS GoLang.Go Task.Task max-team.zig
```

首次克隆后执行：

```sh
task init        # npm install + go mod tidy
```

> 若只改前端 / 只需跑起来（不动 Go 代码），仅有 Node 也能运行，见 §5 的"快速启动"。

## 5. 启动与运行

### 标准开发流程（装齐工具链后）

```sh
task electron:winquickdev   # Windows 日常开发：只编当前平台 wavesrv，跳过 generate/wsh 全量
task dev                    # 完整 dev：全平台 wsh + generate
task start                  # 无 HMR 独立运行
task preview                # 组件预览服务器（浏览器打开，无需 Electron）
```

### 快速启动（本机无 task/go 时的替代方案）

dev 模式下 wavesrv 强制要求云端点环境变量（`cmd/server/main-server.go` 的 `grabAndRemoveEnvVars`），缺失则退出并连带 Electron 退出。仓库根已放置（gitignore 的）`.env` 与 `dev.bat`：

```bat
dev.bat    :: 内容 = set WAVETERM_ENVFILE=<repo>/.env && npm run dev
```

`.env` 需包含（与 Taskfile dev 任务一致）：

```
WCLOUD_ENDPOINT=https://api-dev.waveterm.dev/central
WCLOUD_PING_ENDPOINT=https://ping-dev.waveterm.dev/central
WCLOUD_WS_ENDPOINT=wss://wsapi-dev.waveterm.dev
```

注意：此方式复用已构建的 `dist/bin/wavesrv.x64.exe`，**改 Go 代码后必须重新编译后端**（`task build:server` 或 `task electron:winquickdev`）。

## 6. 构建与打包

```sh
task build:backend     # wavesrv（CGO+zig cc）+ wsh（8 平台交叉编译）→ dist/bin/
task build:server      # 仅 wavesrv
npm run build:prod && npx electron-builder -c electron-builder.config.cjs -p never   # 即 task package，产物在 make/
```

Go 二进制不进 JS bundle，由 electron-builder 以 `extraResources`/`asarUnpack: dist/bin/**` 携带，运行时从 `resources/bin/wavesrv.<arch>` spawn。

## 7. 常见二开任务速查（必读对应 SKILL.md）

| 任务 | 指南 | 关键文件 |
|---|---|---|
| 新增 RPC 命令 | `.kilocode/skills/add-rpc/SKILL.md` | `pkg/wshrpc/wshrpctypes.go` → `task generate`；服务端实现 `pkg/wshrpc/wshserver/` |
| 新增 wsh CLI 子命令 | `.kilocode/skills/add-wshcmd/SKILL.md` | `cmd/wsh/cmd/wshcmd-*.go` |
| 新增块视图类型 | `.kilocode/skills/create-view/SKILL.md` | ViewModel + ViewComponent → `frontend/app/block/blockregistry.ts` |
| 新增配置项 | `.kilocode/skills/add-config/SKILL.md` | `pkg/wconfig/settingsconfig.go` → schema |
| 前端 ↔ Electron IPC | `.kilocode/skills/electron-api/SKILL.md` | `frontend/types/custom.d.ts` + `emain/preload.ts` + `emain/emain-ipc.ts` |
| 新增事件 | `.kilocode/skills/wps-events/SKILL.md` | `pkg/wps/wps.go` |
| 右键菜单 | `.kilocode/skills/context-menu/SKILL.md` | `ContextMenuItem` |
| WaveEnv narrowing | `.kilocode/skills/waveenv/SKILL.md` | mock 环境支持 |

**代码生成铁律**：改了 `pkg/wshrpc/wshrpctypes.go` 等 Go 类型后必须跑 `task generate`；`frontend/types/gotypes.d.ts`、`frontend/app/store/wshclientapi.ts`、`pkg/wshrpc/wshclient/wshclient.go` 均为生成物，**禁止手改**。

## 8. 编码规范摘要（详见 `.kilocode/rules/rules.md`）

- **Go**：不用自定义 enum 类型，用字符串常量；`Make*` 而非 `New*`；锁用 `lock.Lock(); defer lock.Unlock()`；不要靠 `go build` 验证编译（用 IDE 报错）。
- **TS**：`@/...` 导入跨目录模块；仅命名导出；4 空格缩进；strict null checks 关闭，用 `== null` 判断；禁 `atob/btoa`（用 `@/util/util` 的 base64 函数）；类名合并用 `cn()`。
- **Jotai 模型模式**：atom 挂在 Model 类上（简单 atom 用字段初始化，派生 atom 在构造器创建），Model 用单例 `getInstance()`，更新走 `globalStore.set/get`，Model 内不用 React hooks。
- **注释**：只写"为什么"和非显然边界，不写"做什么"；不删既有注释。
- 版权年份用 2026。

## 9. 测试与调试

```sh
npm run test        # vitest 前端单测（16 个文件，配置见 vitest.config.ts）
go test ./...       # Go 单测（约 20 个，分布 pkg/**）
bash tests/copytests/runner.sh   # shell 集成测试
```

- 前端调试：DevTools（`Ctrl+Shift+I`）。
- 后端日志：`%LOCALAPPDATA%\flowterm-dev\Data\waveapp.log`（dev 模式 Electron 与 Go 共用此文件）；启动终端里也有 `[wavesrv]` 前缀实时日志。
- Go 手动测试入口：`cmd/testai`、`cmd/test-conn`、`cmd/test-streammanager`。

## 10. 与上游同步

`main` 分支跟踪上游。同步策略建议：`git fetch upstream && git checkout main && git merge upstream/main`，再在 `flowterm` 分支 `rebase`/`merge`。因 fork 刻意保留了二进制名与环境变量，冲突面很小；rebrand 提交涉及的两个文件（`package.json`、`emain/emain-platform.ts`）是主要冲突点。

## 11. 国际化（i18n）

自研轻量框架（零第三方依赖），位于 `frontend/i18n/`，支持中文/英文，语言偏好存于配置项 `app:language`（`""`=跟随系统）。切换入口：About 弹窗的语言下拉，或 `wsh setconfig app:language=zh`。

**给新文案添加翻译**（必做三步）：
1. 在 `frontend/i18n/locales/en/<域>.ts` 加 key（camelCase，按域分组：tab/workspace/blockframe/conn/contextmenu/modals/views/term/preview/aipanel/onboarding/main 等）
2. 在 `frontend/i18n/locales/zh/<域>.ts` 镜像中文（类型 `DeepPartial<Dict["域"]>` 保证 key 拼写正确；缺失 key 自动回落英文，`i18n.test.tsx` 有 en/zh key 对齐测试把关）
3. 组件中使用（三种模式，见样板 `tabcontextmenu.ts` 与 `blockframe-header.tsx`）：
   - React 组件：hooks 区 `const t = useT();`，模板里 `t("域.key")`（语言切换自动重渲染）
   - 纯 .ts 工厂/事件处理器：`import { t } from "@/i18n/i18n"` 直接调用（菜单在打开时求值）
   - ViewModel 显示名 atom：派生 atom `jotai.atom((get) => tLang(get(resolvedLangAtom), "views.xxx"))`

**插值**：字典值写 `{var}` 占位符，调用 `t("key", { var: value })`。

**不翻译**：console 输出、程序性消费的错误消息、CSS 类名/图标名/meta key/事件名、品牌名（Wave Terminal、FlowTerm、Wave AI、wsh、SSH…）。

**新增语言**：加 `frontend/i18n/locales/<lang>/` 目录（镜像 en 结构）→ `zh`/`en` 相关 switch 处扩展 → `normalizeLang` 加映射 → `pkg/wconfig/settingsconfig.go` 的 `jsonschema` enum 加值 → `task generate`。

**主进程（emain/）**：直接 `import { t } from "@/i18n/i18n"`（electron.vite 已配 `@` 别名）；语言经 `setLangOverride` 在启动与 `config` 事件时注入（见 `emain.ts` / `emain-menu.ts`），配置变更会自动重建原生菜单。

## 12. 已知注意事项

- dev 模式 wavesrv 校验 `WCLOUD_ENDPOINT` 必须 `https://` 开头（仅 dev；打包版无此要求），缺失即退出。
- `docs/` 已移出 npm workspace（docusaurus 的 lqip-loader 钉死旧 sharp，Windows 装不上），需单独 `cd docs && npm install`。
- 发布相关 task（S3/winget/snap）仍指向上游 waveterm 的 bucket，二开发布前需自行调整 `electron-builder.config.cjs` 与 Taskfile。
