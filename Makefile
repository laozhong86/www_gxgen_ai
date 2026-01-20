.PHONY: server build start lint clean

# 启动开发服务器 (Turbopack)
server:
	npm run dev

# 构建生产版本
build:
	npm run build

# 启动生产服务器
start:
	npm run start

# 代码检查
lint:
	npm run lint

# 清理缓存
clean:
	rm -rf .next node_modules/.cache
