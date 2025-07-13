# Node.js CI/CD Project with Jenkins, Docker & Kubernetes

This project demonstrates how to set up a basic Node.js application and deploy it using a CI/CD pipeline with Jenkins and Docker, and then deploy the app on Kubernetes.

## 🚀 Project Goal

Build and run a Node.js app using Jenkins CI/CD pipeline inside a Docker container, and deploy it on Kubernetes cluster.

---

## 📁 Project Structure

```
.
├── app.js
├── Dockerfile
├── package.json
├── package-lock.json
├── deployment.yaml
└── service.yaml
```

## 🛠️ Prerequisites

* Git & GitHub account
* Docker Desktop with Kubernetes enabled
* Jenkins Docker image
* Node.js and npm installed

---

## 🔧 Setup Instructions & Command Explanations

### 1. Initialize Node.js App

```bash
npm init -y         # Initializes a new Node.js project with default settings
npm install express # Installs Express.js framework
```

### 2. Create `app.js`

```js
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello from Node.js App with CI/CD 🚨');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### 3. Create `Dockerfile`

```Dockerfile
FROM node:14            # Base Docker image with Node.js v14
WORKDIR /app            # Sets working directory inside the container
COPY . .                # Copies all files from host to container
RUN npm install         # Installs dependencies
CMD ["node", "app.js"]   # Command to run the app
```

### 4. Build Docker Image

```bash
docker build -t node-kube-app .    # Builds the image and tags it as 'node-kube-app'
```

### 5. Enable Kubernetes on Docker Desktop

* Open Docker Desktop
* Go to **Settings > Kubernetes**
* Enable **Kubernetes** and wait until it shows "Running"

---

## 🧪 Jenkins Pipeline Configuration

Create a pipeline job in Jenkins and use this script:

```groovy
pipeline {
    agent any
    stages {
        stage('Build Image') {
            steps {
                sh 'docker build -t node-kube-app .'   // Shell command to build Docker image
            }
        }
    }
}
```

---

## ☸️ Kubernetes Deployment

### 6. Create `deployment.yaml`

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: node-kube-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: node-kube-app
  template:
    metadata:
      labels:
        app: node-kube-app
    spec:
      containers:
        - name: node-kube-app
          image: node-kube-app
          ports:
            - containerPort: 3000
```

### 7. Create `service.yaml`

```yaml
apiVersion: v1
kind: Service
metadata:
  name: node-kube-service
spec:
  type: NodePort                       # Exposes the app on a port
  selector:
    app: node-kube-app
  ports:
    - port: 3000
      targetPort: 3000
      nodePort: 31000                 # Exposed NodePort
```

### 8. Apply Kubernetes Config Files

```bash
kubectl apply -f deployment.yaml   # Deploys the app using the deployment definition
kubectl apply -f service.yaml      # Exposes the app using the service definition
```

### 9. Check Kubernetes Status

```bash
kubectl get pods       # Shows running pods
kubectl get service    # Shows service and exposed port
kubectl get nodes      # Displays active Kubernetes nodes
```

### 10. View Logs (Optional Debugging)

```bash
kubectl logs <pod-name>   # Check logs of your running pod (replace <pod-name> with actual name)
```

### 11. Access the App

Open in your browser:

```
http://localhost:31000
```

You should see:

```
Hello from Node.js App with CI/CD 🚨
```

---

## 🔄 GitHub Upload (Push Project)

### Set up Git in your project folder:

```bash
git init                               # Initialize Git repo
git remote add origin <your-repo-url>  # Connect to your GitHub repo
git add .                              # Stage all files
git commit -m "first commit"           # Commit the code
git push -u origin main                # Push to GitHub
```

⚠️ If your branch is `master`, replace `main` with `master`.

---

## 👨‍💻 Author

Bharath M

---

## 📄 License

This project is for learning purposes. Free to use, share, and build upon.
