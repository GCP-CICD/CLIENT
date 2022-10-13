# 估狗dockerfile multi stage


# 在node環境
FROM node:16.15.0 as build-env
# 工作目錄若無自動創建
WORKDIR /app
# .(當前(本機的)資料夾) .(目標資料夾)
COPY . .

WORKDIR vue
# run 指令
RUN node -v
RUN npm install
RUN npm run build

# 在nginx環境
FROM nginx:stable
# run 指令
RUN apt-get update
# build-env為node環境裡面的/app/.  複製到nginx 裡的html資料夾  (可在docker->container->cli 查看該資料夾)
COPY --from=build-env /app/vue/dist/. /usr/share/nginx/html
# 改nginx配置
COPY /nginx/default.conf /etc/nginx/conf.d

# cmd 輸指令 
# 產生 image
# docker build -t asia.gcr.io/dogwood-dryad-364606 (gcp project ID) /myvue3-docker .(記得加.)
# docker run -d -p 80(本地):80(容器) "imagesName"


# 推送和拉取映像 https://cloud.google.com/container-registry/docs/pushing-and-pulling?hl=zh-CN
# 1.登入gcp
# gcloud auth login

# 2.啟用 computed engine api
# ＄ gcloud services enable containerregistry.googleapis.com


# push 更新
# docker push asia.gcr.io/turing-position-365307/client

# 更新實例
# gcloud compute instances update-container instance-1 --container-image asia.gcr.io/dogwood-dryad-364606/myvue3-docker --zone asia-east1-b